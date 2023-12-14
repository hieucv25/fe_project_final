import React, { useEffect, useState } from "react";
import Appointment_Service from "../../../../Api/Admin/Appointment_Service";
import { Modal } from "react-bootstrap";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import Customer_Service from "../../../../Api/Admin/Customer_Service";

export default function Modal_Detail_Appointment(props) {

    const data = props.data;

    const [lichHen, SetLichHen] = useState({
        gioDat: '',
        ngayDat: '',
        thoiGianDuKien: '',
        trangThai: 1,
        loaiLichHen: true,
        sdt: '',
        khachHang: {},
    })
    const [customer, setCustomer] = useState([]);
    const [customerValue, setCustomerValue] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const animatedComponents = makeAnimated();

    const myStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const ListCustomer = () => {
        Customer_Service.getAllCustomer().then((response) => {
            setCustomer(response.data);
        }).catch((error) => console.log(error));
    }

    const getCustomer = () => {
        if (data.kh.id !== null) {
            Customer_Service.getById(data.kh.id).then((response) => {
                const customer = response.data;
                setCustomerValue({ value: customer.id, label: customer.hoTen + " " + customer.sdt });
            })
        }
    }

    useEffect(() => {
        ListCustomer();
        getCustomer();
        setSelectedCustomer(data.kh.id);
        SetLichHen({
            gioDat: moment(data.thoiGianDat).format('HH:mm'),
            ngayDat: moment(data.thoiGianDat).format('YYYY-MM-DD'),
            thoiGianDuKien: data.thoiGianDuKien,
            trangThai: data.trangThai,
            loaiLichHen: data.loaiLichHen,
            sdt: data.sdt,
            khachHang: data.kh.id
        })
    }, [])

    const customerOptions = customer.map((customer) => ({
        value: customer.id,
        label: customer.hoTen + " " + customer.sdt
    }))

    const changeHour = (e) => {
        SetLichHen((preAppoimnet) => ({ ...preAppoimnet, gioDat: e.target.value }));
    }
    const changeDay = (e) => {
        SetLichHen((preAppoimnet) => ({ ...preAppoimnet, ngayDat: e.target.value }));
    }
    const changeTT = (e) => {
        SetLichHen((preAppoimnet) => ({ ...preAppoimnet, trangThai: e.target.value }));
    }
    const changeSdt = (e) => {
        SetLichHen((preAppoimnet) => ({ ...preAppoimnet, sdt: e.target.value }));
    }
    const changeTime = (e) => {
        SetLichHen((preAppoimnet) => ({ ...preAppoimnet, thoiGianDuKien: e.target.value }));
    }
    const changeCustomer = (selectedOptions) => {
        setSelectedCustomer(selectedOptions.value);
    }

    const updateAppointment = (e) => {
        e.preventDefault();
        let trangThai = lichHen.trangThai;
        let loaiLichHen = lichHen.loaiLichHen;
        var thoiGianDat = lichHen.ngayDat + "T" + lichHen.gioDat;
        let sdt = lichHen.sdt;
        let thoiGianDuKien = lichHen.thoiGianDuKien;

        let appointment = {
            thoiGianDat,
            sdt,
            trangThai,
            loaiLichHen,
            thoiGianDuKien,
            kh: { id: selectedCustomer }
        }
        console.log('appointment =>' + JSON.stringify(appointment));
        if (lichHen.ngayDat === '' || lichHen.gioDat === '') {
            toast.warning("Hãy Chọn Thời Gian Đặt Lịch Hẹn!", {});
        } else if (selectedCustomer === null) {
            toast.warning("Hãy Chọn Khách Hàng Đặt Lịch Hẹn!", {});
        }
        else if (lichHen.thoiGianDuKien === "0") {
            toast.warning("Hãy Chọn Thời Gian Dự Kiến!", {});
        } else {
            Appointment_Service.validateFU(appointment, data.id).then((respose) => {
                if (respose.data === "ok") {
                    Appointment_Service.update(data.id, appointment).then((res) => {
                        if (res.status === 200) {
                            toast.success('Cập Nhật thành công!', {
                            });
                            props.setShowModal(false);
                        } else {
                            console.log(res.error);
                        }
                    })
                } else {
                    toast.success(respose.data, {
                    });
                }
            })
        }
    }

    return (
        <>
            <Modal show={props.showModal} onHide={() => props.setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết lịch hẹn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="col-md-12" id="myForm" onSubmit={updateAppointment}>
                        <div className="row">
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Thời Gian Đặt
                                    </label>
                                    <select class="form-select" aria-label="Default select example" value={lichHen.gioDat}
                                        onChange={changeHour}>
                                        <option selected>Open this select menu</option>
                                        <option value="07:30">7:30</option>
                                        <option value="08:30">8:30</option>
                                        <option value="09:30">9:30</option>
                                        <option value="10:30">10:30</option>
                                        <option value="11:30">11:30</option>
                                        <option value="13:30">13:30</option>
                                        <option value="14:30">14:30</option>
                                        <option value="15:30">15:30</option>
                                        <option value="16:30">16:30</option>
                                    </select>
                                </div>
                                <span style={{ paddingtop: 20 }}></span>
                                <div className="row">
                                    <label className="form-label">
                                        Ngày Đặt
                                    </label>
                                    <input type="date" value={lichHen.ngayDat}
                                        onChange={changeDay} className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Trạng Thái
                                    </label>
                                    <select class="form-select" aria-label="Default select example" value={lichHen.trangThai} onChange={changeTT}>
                                        <option value="0" selected>Chờ Xác Nhận</option>
                                        <option value="1">Đã Xác Nhận</option>
                                        <option value="2">Đã Hoàn Thành</option>
                                        <option value="3">Quá Hẹn</option>
                                        <option value="4">Đã Huỷ</option>
                                    </select>
                                </div>
                                <span style={{ paddingtop: 20 }}></span>
                                <div className="row">
                                    <label className="form-label">
                                        Thời Gian Dự Kiến
                                    </label>
                                    <select class="form-select" aria-label="Default select example" value={lichHen.thoiGianDuKien} onChange={changeTime}>
                                        <option value="0" selected>Open this select menu</option>
                                        <option value="15 Phút">15 Phút</option>
                                        <option value="30 Phút">30 Phút</option>
                                        <option value="1 Giờ">1 Giờ</option>
                                        <option value="2 Giờ">2 Giờ</option>
                                        <option value="4 Giờ">4 Giờ</option>
                                        <option value="null">Chưa Xác Định</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <span style={{ paddingtop: 20 }}></span>
                        <div className="row">
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Loại Lịch Hẹn
                                    </label>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" value="true"
                                            checked={lichHen.loaiLichHen} onChange={() => SetLichHen({ loaiLichHen: true })} /> Online
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" value="false"
                                            checked={!lichHen.loaiLichHen} onChange={() => SetLichHen({ loaiLichHen: false })} /> Offline
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Số Điện Thoại
                                    </label>
                                    <input className="form-control" type="text" value={lichHen.sdt}
                                        onChange={changeSdt} />
                                </div>
                            </div>
                        </div>
                        <span style={{ paddingtop: 20 }}></span>
                        <div className="row" style={myStyle}>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label text-center">
                                        Khách Hàng
                                    </label>
                                    <Select
                                        value={customerValue}
                                        onChange={changeCustomer}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={customerOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center mt-3">
                                <button type="submit" className="btn btn-success">Cập Nhật</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}
