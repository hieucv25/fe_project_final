import "../../../css/admin.css";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate("/home");
  }

  return (
    <>
      <section id="sidebar">
        <Link to="#" className="brand">
          <i className="bx bx-list-ul" />
          <span className="text">Admin Pages</span>
        </Link>
        <ul className="side-menu top">
          <li >
            <Link to="/admin/customer/index" >
              <i class="bi bi-person-lines-fill"></i>
              <span className="text">Khách Hàng</span>
            </Link>
          </li>
          <li >
            <Link
              to="/admin/appointment/index"
            >
              <i class="bi bi-calendar"></i>
              <span className="text">Lịch Hẹn</span>
            </Link>
          </li>
          {/* <li>
            <Link to="#">
              <i className="bx bxs-doughnut-chart" />
              <span className="text">Analytics</span>
            </Link>
          </li> */}
          <li>
            <Link to="#">
              <i class="bi bi-chat-dots-fill"></i>
              <span className="text">Message</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i class="bi bi-people-fill"></i>
              <span className="text">Team</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link to="/home" className="logout" onClick={logout}>
              <i class="bi bi-box-arrow-left"></i>
              <span className="text">Logout</span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
