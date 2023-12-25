import "../../index.css";
import React, { useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function isValidPhoneNumber(value) {
  const regex = /^(086|096|097|098|039|038|037|036|035|034|033|032|091|094|088|083|084|085|081|082|070|079|077|076|078|089|090|093|092|052|056|058|099|059|087)\d{7}$/;
  return regex.test(value);
}

const schema = yup.object().shape({
  phone: yup.string().matches(isValidPhoneNumber, 'Số Điện Thoại Không Hợp Lệ!').required('Số Điện Thoại không được trống!'),
});

export default function Booking() {

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const data = useState({
    time: '',
    date: '',
    service: '',
    phone: ''
  });

  return (
    <>
      <Header />
      {/* Page Header Start */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: "url(../img/carousel-bg-1.jpg)" }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center">
            <h1 className="display-3 text-white mb-3 animated slideInDown">
              Booking
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pages</a>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Booking
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* Page Header End */}
      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="d-flex py-5 px-4">
                <i className="fa fa-certificate fa-3x text-primary flex-shrink-0" />
                <div className="ps-4">
                  <h5 className="mb-3">Quality Servicing</h5>
                  <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                  <a className="text-secondary border-bottom" href="">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="d-flex bg-light py-5 px-4">
                <i className="fa fa-users-cog fa-3x text-primary flex-shrink-0" />
                <div className="ps-4">
                  <h5 className="mb-3">Expert Workers</h5>
                  <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                  <a className="text-secondary border-bottom" href="">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="d-flex py-5 px-4">
                <i className="fa fa-tools fa-3x text-primary flex-shrink-0" />
                <div className="ps-4">
                  <h5 className="mb-3">Modern Equipment</h5>
                  <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                  <a className="text-secondary border-bottom" href="">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}
      {/* Booking Start */}
      <div
        className="container-fluid bg-secondary booking my-5 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-6 py-5">
              <div className="py-5">
                <h1 className="text-white mb-4">
                  Certified and Award Winning Car Repair Service Provider
                </h1>
                <p className="text-white mb-0">
                  Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing
                  kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo
                  ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et
                  dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut
                  dolores magna sit. Sea dolore sanctus sed et. Takimata
                  takimata sanctus sed.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn"
                data-wow-delay="0.6s"
              >
                <h1 className="text-white mb-4">Book For A Service</h1>
                <form>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Your Phone Number"
                        style={{ height: 55 }}
                        value={data.phone}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input type="date" style={{ height: 55 }}
                        className='form-control border-0' />
                    </div>
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select border-0"
                        style={{ height: 55 }}
                      >
                        <option selected="">Select A Service</option>
                        <option value={1}>Service 1</option>
                        <option value={2}>Service 2</option>
                        <option value={3}>Service 3</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <select class="form-select border-0" aria-label="Default select example" style={{ height: 55 }}>
                        <option selected>Select Set Time</option>
                        <option value="07:30">7:30</option>
                        <option value="08:30">8:30</option>
                        <option value="09:30">9:30</option>
                        <option value="10:30">10:30</option>
                        <option value="11:30">11:30</option>
                        <option value="13:30">13:30</option>
                        <option value="14:30">14:30</option>
                        <option value="15:30">15:30</option>
                        <option value="16:30">16:30</option>
                        <option value="17:30">17:30</option>
                        <option value="18:30">18:30</option>
                        <option value="19:30">19:30</option>
                        <option value="20:30">20:30</option>
                      </select>
                      {/* </div> */}
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control border-0"
                        placeholder="Special Request"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-secondary w-100 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking End */}
      {/* Call To Action Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8 col-md-6">
              <h6 className="text-primary text-uppercase">
                // Call To Action //
              </h6>
              <h1 className="mb-4">Have Any Pre Booking Question?</h1>
              <p className="mb-0">
                Lorem diam ea sit dolor labore. Clita et dolor erat sed est
                lorem sed et sit. Diam sed duo magna erat et stet clita ea magna
                ea sed, sit labore magna lorem tempor justo rebum dolores. Eos
                dolor sea erat amet et, lorem labore lorem at dolores. Stet ea
                ut justo et, clita et et ipsum diam.
              </p>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="bg-primary d-flex flex-column justify-content-center text-center h-100 p-4">
                <h3 className="text-white mb-4">
                  <i className="fa fa-phone-alt me-3" />
                  +012 345 6789
                </h3>
                <a href="" className="btn btn-secondary py-3 px-5">
                  Contact Us
                  <i className="fa fa-arrow-right ms-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Call To Action End */}
      <Footer />
    </>
  );
}
