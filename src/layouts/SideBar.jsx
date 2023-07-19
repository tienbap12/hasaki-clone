import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../style/SideBar.css';
export default function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="sidebar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="sidebar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          <li className="nav-text">
            <Link to="/products">
              <span>Sản phẩm</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/cart">
              <span>Giỏ hàng</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/order">
              <span>Đơn hàng</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
