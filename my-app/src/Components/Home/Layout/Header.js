import "../../../index.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import User_Service from "../../../Api/User/User_Service";
import { toast } from 'react-toastify';
import moment from 'moment';

export default function Header() {
  const [status, setStatus] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("idUser");

  useEffect(() => {
    if (token !== null) {
      setStatus(true);
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    if (token !== null) {
      const response = await User_Service.getHistoryByUser(userId);
      setData(response.data);
      console.log(response.data);
    }
  };

  const refresh = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idUser");
    toast.success('Bạn Đã Đăng Xuất!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setStatus(0);
    navigate('/login');
  }
  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-map-marker-alt text-primary me-2" />
              <small>123 Street, New York, USA</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center py-3">
              <small className="far fa-clock text-primary me-2" />
              <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
              <small className="fa fa-phone-alt text-primary me-2" />
              <small>+012 345 6789</small>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-sm-square bg-white text-primary me-1"
                href=""
              >
                <i className="fab fa-linkedin-in" />
              </a>
              {status === 0 ? (<Link
                className="btn btn-sm-square bg-white text-primary me-0"
                to="/login"
              >
                <i className='bx bx-log-in'></i>
              </Link>) : (<Link
                className="btn btn-sm-square bg-white text-primary me-0"
                to="/logout" onClick={refresh}
              >
                <i className='bx bx-log-out'></i>
              </Link>)}
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-car me-3" />
            Booking Car
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/home" className="nav-item nav-link active">
              <i className="fa-solid fa-house"></i>
            </Link>
            <Link to="/about" className="nav-item nav-link">
              <i className="fa-solid fa-plus"></i>
            </Link>
            <Link to="/service" className="nav-item nav-link">
              <i className="fa-solid fa-gears"></i>
            </Link>
            <Link to="/booking" className="nav-item nav-link">
              <i className="bi bi-bookmark-plus-fill"></i>
            </Link>
            <Link to="/contact" className="nav-item nav-link">
              <i className="bi bi-telephone-forward-fill"></i>
            </Link>
            <div className="nav-item nav-link" style={{ position: 'relative' }}>
              <div className="me-3 dropdown-toggle hidden-arrow" id="navbarDropdownMenuLink"
                data-mdb-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">{data.length}</span>
              </div>
              <ul className="dropdown-menu scrollable-menu" aria-labelledby="navbarDropdownMenuLink" style={{
                position: 'absolute',
                top: '100%',
                left: '-500%',
              }}>
                {data.map((appoint) => (
                  <li key={appoint.idHistoricAppointment}>
                    <div className="dropdown-item" style={{ fontSize: 10 }}>
                      {appoint.status === 0 && (
                        <span>Bạn Đặt Lịch Hẹn Thành Công Với Mã Lịch Hẹn Là
                          <span className="text-notifi">
                            {appoint.codeAppointment}.</span> Vui Lòng Chờ Xác Nhận!
                          <br />
                          <span className="notifi-time">{moment(appoint.createAt).format('YYYY-MM-DD HH:mm')}</span>
                        </span>
                      )}
                      {appoint.status === 1 && (
                        <span>Lịch Hẹn Có Mã :
                          <span className="text-notifi">
                            {appoint.codeAppointment}.</span> Đã Được Xác Nhận!
                          <br />
                          <span className="notifi-time">{moment(appoint.createAt).format('YYYY-MM-DD HH:mm')}</span>
                        </span>
                      )}
                      {appoint.status === 2 && (
                        <span>Lịch Hẹn Có Mã :
                          <span className="text-notifi">
                            {appoint.codeAppointment}.</span> Đã Hoàn Thành!
                          <br />
                          <span className="notifi-time">{moment(appoint.createAt).format('YYYY-MM-DD HH:mm')}</span>
                        </span>
                      )}
                      {appoint.status === 3 && (
                        <span>Lịch Hẹn Có Mã :
                          <span className="text-notifi">
                            {appoint.codeAppointment}.</span> Đã Quá Hạn!
                          <br />
                          <span className="notifi-time">{moment(appoint.createAt).format('YYYY-MM-DD HH:mm')}</span>
                        </span>
                      )}
                      {appoint.status === 4 && (
                        <span>Bạn Đã Huỷ Lịch Hẹn Có Mã :
                          <span className="text-notifi">
                            {appoint.codeAppointment}.</span>
                          <br />
                          <span className="notifi-time">{moment(appoint.createAt).format('YYYY-MM-DD HH:mm')}</span>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to={"/contact"} className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
            Get A Quote
            <i className="fa fa-arrow-right ms-3" />
          </Link>
        </div>
      </nav >
      {/* Navbar End */}
    </>
  );
}
