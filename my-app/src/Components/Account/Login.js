import React, { useState } from "react";
import Login_Service from "../../Api/Author/Login_Service";
import { getUserInfoFromToken, hasRole } from "./util";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2';
import "@fortawesome/react-fontawesome"

function isValidEmail(value) {
  const regex = /^[a-zA-Z0-9._%+-]{1,50}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(value);
}

const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email không được trống').test('validEmail', 'Email không hợp lệ', isValidEmail),
  password: yup.string().required('Mật khẩu không được trống')
});

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const login_google = useGoogleLogin({
    onSuccess: async response => {
      try {
        const object_data = await Login_Service.login_by_google(response.access_token);
        Login_Service.check_account_by_email(object_data.data.email).then((response) => {
          const data = response.data;
          if (data === undefined) {
            console.log("New User");
          } else {
            const object_user = {
              email: data.email,
              password: data.matKhau,
            }
            Login_Service.login_auth(object_user).then((response) => {
              const data = response.data;
              console.log(data);
              localStorage.setItem("token", data.token);
              localStorage.setItem("refreshToken", data.refreshToken);
              const token = localStorage.getItem('token');
              const refresh_token = localStorage.getItem('refreshToken');
              const userInfo = getUserInfoFromToken(token);
              const userInfo2 = getUserInfoFromToken(refresh_token);
              localStorage.setItem("expirationTime_Token", new Date(userInfo.exp * 1000));
              localStorage.setItem("expirationTime_Refresh_Token", new Date(userInfo2.exp * 1000));
              localStorage.setItem("userId", data.idUser);
              if (userInfo) {
                const isAdmin = hasRole(userInfo, 'ADMIN');
                const isCustomer = hasRole(userInfo, 'CUSTOMER');
                if (isAdmin) {
                  window.location.href = "/admin/customer/index";
                  toast.success('Đăng nhập thành công!');
                } else if (isCustomer) {
                  window.location.href = "/home";
                  toast.success('Đăng nhập thành công!');
                } else {
                  Swal.fire(
                    'Error!',
                    'Tài khoản hoặc mật khẩu không chính xác!',
                    'error'
                  )
                }
              } else {
                console.log("Invalid Token");
              }
            }).catch((error) => { console.error(error); })
          }
        });
        googleLogout();
      } catch (err) {
        console.log(err);
      }
    },
    onError: (error) => console.log(error)
  });

  const handleLoginClick = () => {
    login_google();
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const dataForm = form.getValues();
    let user = { email: dataForm.email, password: dataForm.password };
    Login_Service.login_auth(user).then((response) => {
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      const token = localStorage.getItem('token');
      const refresh_token = localStorage.getItem('refreshToken');
      const userInfo = getUserInfoFromToken(token);
      const userInfo2 = getUserInfoFromToken(refresh_token);
      localStorage.setItem("expirationTime_Token", new Date(userInfo.exp * 1000));
      localStorage.setItem("expirationTime_Refresh_Token", new Date(userInfo2.exp * 1000));
      localStorage.setItem("idUser", data.idUser);
      console.log(localStorage.getItem("expirationTime"));
      if (userInfo) {
        const isAdmin = hasRole(userInfo, 'ADMIN');
        const isCustomer = hasRole(userInfo, 'CUSTOMER');
        if (isAdmin) {
          window.location.href = "/admin/customer/index";
          toast.success('Đăng nhập thành công!');
        } else if (isCustomer) {
          window.location.href = "/home";
          toast.success('Đăng nhập thành công!');
        } else {
          toast.error('Thông tin tài khoản hoặc mật khẩu không chính xác!');
        }
      } else {
        console.log("Invalid Token");
      }
    }).catch((error) => {
      console.error(error);
      Swal.fire(
        'Error!',
        'Tài khoản hoặc mật khẩu không chính xác!',
        'error'
      )
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} method="post">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Đăng Nhập</h2>
                      <p className="text-white-50 mb-5">
                        Hãy nhập email và mật khẩu!
                      </p>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Nhập email của bạn"
                          {...register("email")}
                        />
                        <p className="error">{errors.email?.message}</p>
                      </div>
                      <div className="form-outline form-white mb-4 password">
                        <label className="form-label">Mật Khẩu</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control form-control-lg"
                          placeholder="Nhập mật khẩu của bạn"
                          {...register("password")}
                        />
                        <button onClick={togglePassword}>
                          {!showPassword ?
                            (<i className="fa-solid fa-eye eye eye-open"></i>) : (<i className="fa-solid fa-eye-slash eye eye-close"></i>)}
                        </button>
                        <p className="error">{errors.password?.message}</p>
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Quên Mật Khẩu?
                        </a>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Đăng Nhập
                      </button>
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <div className="text-white">
                          Hoặc
                        </div>
                      </div>
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fa-brands fa-facebook fa-lg mx-2 px-2"></i>
                          Facebook
                        </a>
                        <div className="text-white">
                          <i className="fa-brands fa-google fa-lg mx-2 px-2" onClick={handleLoginClick}></i>
                          Google
                        </div>
                        <Link to={`/login_with_number_phone`} className="text-white icon-container">
                          <i className="fa-solid fa-phone fa-lg mx-2 px-2"></i>
                          Phone
                        </Link>
                        {/* <div className="text-white icon-container">
                          <i className="bx bx-log-out bx-sm mx-2 px-2" onClick={logout} />
                        </div> */}
                      </div>
                    </div>
                    <div>
                      <p className="mb-0">
                        Chưa có tài khoản?{" "}
                        <Link to={`/register`} className="text-white-50 fw-bold">
                          Đăng Ký
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
