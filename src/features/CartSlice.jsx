import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import '../App.scss';
import { baseUrl } from '../components/Base';
import axios from 'axios';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].totalQuantity +=
          action.payload.totalQuantity;
        toast.info(
          `Đã tăng số lượng sản phẩm lên ${action.payload.totalQuantity}`,
          {
            position: 'top-right',
            autoClose: 2000,
          }
        );
      } else {
        const tempProduct = {
          ...action.payload,
          totalQuantity: action.payload.totalQuantity,
        };
        state.cartItems.push(tempProduct);
        toast.success(`Sản phẩm đã được thêm vào giỏ hàng`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const nextCartItem = (state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      ));
      state.cartItems = nextCartItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.error('Đã xóa khỏi giỏ hàng', {
        autoClose: 2000,
        position: 'top-right',
      });
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].totalQuantity > 1) {
        state.cartItems[itemIndex].totalQuantity -= 1;
        toast.info('Đã giảm số lượng 1', {
          autoClose: 2000,
          position: 'top-right',
        });
      } else if (state.cartItems[itemIndex].totalQuantity === 1) {
        const nextCartItem = (state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        ));
        state.cartItems = nextCartItem;
        toast.error('Đã xóa khỏi giỏ hàng', {
          autoClose: 2000,
          position: 'top-right',
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    increaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].totalQuantity >= 1) {
        state.cartItems[itemIndex].totalQuantity += 1;
        toast.info('Đã tặng số lượng 1', {
          autoClose: 2000,
          position: 'top-right',
          className: 'toast-index',
        });
      }
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      toast.error('Đã xóa giỏ hàng', {
        autoClose: 2000,
        position: 'top-right',
      });
      localStorage.removeItem('cartItems');
    },
    syncCart: (state, action) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      localStorage.removeItem('cartItems');
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, totalQuantity } = cartItem;
          const itemTotal = price * totalQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += totalQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.totalQuantity = state.cartItems.length;
      state.totalPrice = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
  increaseCart,
  syncCart,
} = cartSlice.actions;

export const syncCartWithAPI = () => {
  return async (dispatch, getState) => {
    const { auth, cart } = getState();
    if (auth.isLogin) {
      try {
        const email = auth.email;
        const token = auth.userToken;
        const carts = cart.cartItems.map((item) => ({
          email_user: email,
          product_id: item._id,
          quantity: item.totalQuantity,
        }));
        await axios
          .post(`${baseUrl}/cart/add-to-cart`, carts, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            dispatch(syncCart());
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export default cartSlice.reducer;
