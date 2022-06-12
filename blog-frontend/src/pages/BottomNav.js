
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./BottomNav.css";
import { AiOutlineSearch, AiOutlineBell, AiOutlineTrophy,AiOutlinePlusCircle, AiOutlineUser } from "react-icons/ai"; //홈버튼, 알림버튼, 순위, 업로드, 마이페이지


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
          <Link to="/write" className="nav-link" onClick={()=> {setActiveNav(3)}}>
            <AiOutlinePlusCircle className={activeNav === 3 ? "nav-item active" : "nav-item"}/>
          </Link>
        </div>
        <div>
          <Link to="/Bottom/Alarm" className="nav-link" onClick={()=> {setActiveNav(4)}}>
            <AiOutlineBell className={activeNav === 4 ? "nav-item active" : "nav-item"}/>
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