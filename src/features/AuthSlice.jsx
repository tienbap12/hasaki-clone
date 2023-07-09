import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {},
  userToken: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
  error: null,
  success: false,
  isLogin: localStorage.getItem('stateLogin')
    ? JSON.parse(localStorage.getItem('stateLogin'))
    : false,
  email: localStorage.getItem('email')
    ? JSON.parse(localStorage.getItem('email'))
    : '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { ...dataInfo } = action.payload.data;
      state.userInfo = dataInfo;
      state.userToken = dataInfo.token;
      state.email = dataInfo.email;
      state.isLogin = true;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      localStorage.setItem('token', JSON.stringify(state.userToken));
      localStorage.setItem('email', JSON.stringify(state.email));
      localStorage.setItem('stateLogin', JSON.stringify(state.isLogin));
    },
    logOut: (state, action) => {
      state.userInfo = {};
      state.userToken = null;
      state.isLogin = false;
      localStorage.removeItem('userInfo', JSON.stringify(state.userInfo));
      localStorage.removeItem('token', JSON.stringify(state.userToken));
      localStorage.removeItem('email', JSON.stringify(state.email));
      localStorage.removeItem('stateLogin', state.isLogin);
    },
  },
  extraReducers: {},
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectEmail = (state) => state.auth.email;
export const selectStateLogin = (state) => state.auth.isLogin;
