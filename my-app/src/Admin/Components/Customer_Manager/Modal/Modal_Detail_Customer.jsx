import React, { useEffect, useState } from "react";
import Customer_Service from "../../../../Admin/Api/Customer_Service";
import { Modal } from "react-bootstrap";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Province_Service from "../../../../Admin/Api/Province_Service";
import Swal from 'sweetalert2';

export default function Modal_Detail_Customer(props) {

    const data = props.data;

    const animatedComponents = makeAnimated();

    const [khachHang, setKhachHang] = useState({
        maKhachHang: '',
        hoTen: '',
        ttp: '',
        qh: '',
        sdt: '',
        xp: '',
        sn: '',
        gioiTinh: true,
        email: '',
        matKhau: ''
    });

    const [province, setProvince] = useState([]);

    const [districts, setDistricts] = useState([]);

    const [ward, setWard] = useState([]);

    const [selectedDistricts, setSelectedDistricts] = useState(null);

    const [selectedProvince, setSelectedProvince] = useState(null);

    let Districts = null;

    let Ward = null;

    useEffect(() => {
        ListProvince();
        getDistrictss();
        getProvince();
        setKhachHang({
            maKhachHang: data.maKhachHang,
            hoTen: data.hoTen,
            ttp: data.tinhThanh,
            qh: data.quanHuyen,
            sdt: data.sdt,
            xp: data.xaPhuong,
            sn: data.soNha,
            gioiTinh: data.gioiTinh,
            email: data.email,
            matKhau: ''
        })
    }, [])

    useEffect(() => {
        getDistricts();
        getDistrictss();
        getProvince();
    }, [selectedProvince])

    useEffect(() => {
        ListWard();
    }, [selectedDistricts])

    const ListProvince = () => new Promise(async (resolve) => {
        try {
            const response = await Province_Service.getProvince();
            setProvince(response);
            resolve(response);
        } catch (error) {
            console.error(error);
        }
    });

    const ListWard = async () => {
        console.log(selectedDistricts)
        if (Array.isArray(selectedDistricts) && selectedDistricts.length === 0) {
            console.log("Array Null");
        }
        else if (selectedDistricts !== null) {
            const response = await Province_Service.getWardByCodeDistricts(selectedDistricts);
            setWard(response.wards);
        } else {
            console.log("selectedDistricts must be different null");
        }
    };

    const Provinces = province.map((pro) => ({
        value: pro.code,
        label: pro.name,

    }));

    const getDistricts = async () => {
        if (selectedProvince === null) {
            setSelectedDistricts(districts);
        } else {
            const response = await Province_Service.getDistrictsByCode(selectedProvince);
            const data = response.districts;
            setDistricts(data);
        }
    };

    const getProvince = () => {
        for (let i = 0; i < province.length; i++) {
            if (province[i].name === data.tinhThanh) {
                return { value: province[i].code, label: province[i].name };
            }
        }
        return null;
    }

    const getDistrictss = () => {
        for (let i = 0; i < districts.length; i++) {
            if (districts[i].name === data.quanHuyen) {
                return { value: districts[i].name, label: districts[i].name };
            }
        }
        return null;
    }

    if (selectedProvince !== null) {
        Districts = districts.map((dis) => ({
            value: dis.code,
            label: dis.name,

        }));
    }

    if (selectedDistricts !== null) {
        Ward = ward.map((dis) => ({
            value: dis.code,
            label: dis.name,

        }));
    }

    const changeId = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, maKhachHang: e.target.value }));
    }
    const changeName = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, hoTen: e.target.value }));
    }
    const changeEmail = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, email: e.target.value }));
    }
    const changePhoneNumber = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, sdt: e.target.value }));
    }
    const changePassword = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, matKhau: e.target.value }));
    }

    const changeProvince = (selectedOptions) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, ttp: selectedOptions.label }));
        if (selectedOptions) {
            setSelectedProvince(selectedOptions.value);
        }
    }

    const changeDistrict = (selectedOptions) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, qh: selectedOptions.label }));
        if (selectedOptions) {
            setSelectedDistricts(selectedOptions.value);
        }
    }

    const changeWard = (selectedOptions) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, xp: selectedOptions.label }));
    }

    const changeHomeNumber = (e) => {
        setKhachHang((preCustomer) => ({ ...preCustomer, sn: e.target.value }));
    }

    const defaultValueDistricts = getDistrictss();

    const defaultValueProvince = getProvince();

    const updateCustomer = (e) => {
        e.preventDefault();
        let maKhachHang = khachHang.maKhachHang;
        let hoTen = khachHang.hoTen;
        let email = khachHang.email;
        let sdt = khachHang.sdt;
        let gioiTinh = khachHang.gioiTinh;
        let matKhau = khachHang.matKhau;
        let tinhThanh = khachHang.ttp;
        let quanHuyen = khachHang.qh;
        let xaPhuong = khachHang.xp;
        let soNha = khachHang.sn;
        const customerUpdate = {
            maKhachHang,
            hoTen,
            email,
            sdt,
            tinhThanh,
            quanHuyen,
            xaPhuong,
            soNha,
            gioiTinh,
            matKhau,
        }
        console.log('customer =>' + JSON.stringify(customerUpdate));
        if (props.id !== null) {
            Customer_Service.validateFU(data.id, customerUpdate).then((response) => {
                console.log('ok1');
                if (response.data === "ok") {
                    console.log('ok2');
                    Customer_Service.updateCustomer(customerUpdate, data.id).then((response) => {
                        console.log('ok3');
                        if (response.status === 200) {
                            Swal.fire(
                                'Success!',
                                'Sửa Thành Công',
                                'success'
                            )
                            props.setShowModal(false);
                        }
                    });
                } else {
                    Swal.fire(
                        'Error!',
                        response.data,
                        'error'
                    )
                }
            })
        }

    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            boxShadow: state.isFocused ? '0 0 5px rgba(0, 0, 0, 0.3)' : null,
        }),
    };

    return (
        <div>
            <Modal show={props.showModal} onHide={() => props.setShowModal(false)}
                size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="col-md-12" id="myForm" onSubmit={updateCustomer}>
                        <div className="row padd3">
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Mã Khách Hàng
                                    </label>
                                    <input type="text" value={khachHang.maKhachHang}
                                        onChange={changeId} className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Mật Khẩu
                                    </label>
                                    <input type="text" value={khachHang.matKhau}
                                        onChange={changePassword} className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Họ Tên
                                    </label>
                                    <input type="text" value={khachHang.hoTen}
                                        onChange={changeName} className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Giới Tính
                                    </label>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" value={true}
                                            checked={khachHang.gioiTinh}
                                            onChange={() => setKhachHang({ gioiTinh: true })}
                                        /> Nam
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" className="form-check-input" value={false}
                                            checked={!khachHang.gioiTinh}
                                            onChange={() => setKhachHang({ gioiTinh: false })}
                                        /> Nữ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Email
                                    </label>
                                    <input className="form-control" type="email" value={khachHang.email}
                                        onChange={changeEmail} />
                                </div>
                            </div>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label">
                                        Số Điện Thoại
                                    </label>
                                    <input className="form-control" type="text" value={khachHang.sdt}
                                        onChange={changePhoneNumber} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label padd3">
                                        Tỉnh, Thành Phố
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        className="form-control"
                                        defaultValue={defaultValueProvince}
                                        onChange={changeProvince}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={Provinces}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label padd3">
                                        Quận Huyện
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        className="form-control"
                                        defalutValue={defaultValueDistricts}
                                        onChange={changeDistrict}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={Districts !== null ? Districts : []}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label padd3">
                                        Xã Phường
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        className="form-control"
                                        onChange={changeWard}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        options={Ward !== null ? Ward : []}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 padd2">
                                <div className="row">
                                    <label className="form-label padd4">
                                        Số Nhà
                                    </label>
                                    <input type="text" value={khachHang.soNha}
                                        onChange={changeHomeNumber} className='form-control' />
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
        </div>
    )
}
