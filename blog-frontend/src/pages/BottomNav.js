
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./BottomNav.css";
import { AiOutlineSearch, AiOutlineTrophy, AiOutlineUser } from "react-icons/ai"; //


const BottomNav = () => {
    const [activeNav, setActiveNav] = useState(1);
    return (
        <div className="wrapper">
        <nav>
          <div>
            <Link to="/" className="nav-link" onClick={()=> {setActiveNav(1)}}>
              <AiOutlineSearch className={activeNav === 1 ? "nav-item active" : "nav-item"}/>
            </Link>
          </div>
          <div>
            <Link to="/Bottom/Rank" className="nav-link" onClick={()=> {setActiveNav(2)}}>
              <AiOutlineTrophy className={activeNav === 2 ? "nav-item active" : "nav-item"}/>
            </Link>
          </div>
          <div>
            <Link to="/Bottom/MyPage" className="nav-link" onClick={()=> {setActiveNav(5)}}>
                <AiOutlineUser className={activeNav === 5  ? "nav-item active" : "nav-item"}/>
            </Link>
          </div>
        </nav>
        </div>
    );
  }

export default BottomNav;