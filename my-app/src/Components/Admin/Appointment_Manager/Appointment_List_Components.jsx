// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "../Layout/Sidebar";
// import Appointment_Service from "../../../Api/Admin/Appointment_Service";
// import moment from 'moment';
// // import * as XLSX from 'xlsx/xlsx.mjs';
// // import Common_Util from "../../../Utils/Common_Util";
// import Swal from 'sweetalert2';
// import 'react-toastify/dist/ReactToastify.css';
// import Modal_Detail_Appointment from "./Modal/Modal_Detail_Apponintment";
// import Import_Appointment_Component from "./Excel/Import_Appointment_Components";
// import Export_Appointment_Components from "./Excel/Export_Appointment_Components";

// function Appointment_List_Components() {

//     const [number, setNumber] = useState(0);
//     const [numberStatus, setNumberStatus] = useState(0);
//     const [numberType, setNumberType] = useState(0);
//     const [numberDouble, setNumberDouble] = useState(0);
//     const [numberName, setNumberName] = useState(0);
//     const [nameSearch, setNameSearch] = useState('');
//     const [pageData, setPageData] = useState([]);
//     const [maxPage, setMaxPage] = useState(0);
//     const [trangThaiFilter, setTrangThaiFilter] = useState(5);
//     const [loaiLichHenFilter, setLoaiLichHenFilter] = useState(0);
//     const [statusQuery, setStatusQuery] = useState(0);
//     const [showModal, setShowModal] = useState(false);
//     const [appointment, setAppointment] = useState();

//     const myStyle = {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     }

//     useEffect(() => {
//         fetchData();
//     }, [showModal])

//     useEffect(() => {
//         fetchData();
//     }, [number]);

//     useEffect(() => {
//         fetchDataFilterByStatus();
//     }, [numberStatus]);

//     useEffect(() => {
//         fetchDataFilterByType();
//     }, [numberType]);

//     useEffect(() => {
//         fetchDataFilterByStatusAndType();
//     }, [numberDouble]);

//     useEffect(() => {
//         if (nameSearch != '')
//             fetchDataFilterByName();
//         else if (nameSearch === '')
//             fetchData();
//     }, [numberName]);

//     useEffect(() => {
//         if (nameSearch != '')
//             fetchDataFilterByName();
//         else if (nameSearch === '')
//             fetchData();
//     }, [nameSearch]);

//     useEffect(() => {
//         if (loaiLichHenFilter == 0 && trangThaiFilter == 5) {
//             fetchData();
//         }
//         else if (loaiLichHenFilter != 0 && trangThaiFilter == 5) {
//             fetchDataFilterByType();
//         }
//         else if (loaiLichHenFilter == 0 && trangThaiFilter != 5) {
//             fetchDataFilterByStatus();
//         }
//         else if (loaiLichHenFilter != 0 && trangThaiFilter != 5) {
//             fetchDataFilterByStatusAndType();
//         }
//     }, [loaiLichHenFilter, trangThaiFilter]);

//     const fetchData = async () => {
//         const response = await Appointment_Service.getAppointment(number);
//         const data = response.data.content;
//         setPageData(data);
//         setStatusQuery(0);
//         setMaxPage(response.data.totalPages);
//     }

//     const fetchDataFilterByStatus = async () => {
//         const response = await Appointment_Service.findByStatus(trangThaiFilter, numberStatus);
//         const data = response.data.content;
//         setPageData(data);
//         setStatusQuery(1);
//         setMaxPage(response.data.totalPages);
//     }

//     const fetchDataFilterByType = async () => {
//         const response = await Appointment_Service.findByType(loaiLichHenFilter, numberType);
//         const data = response.data.content;
//         setPageData(data);
//         setStatusQuery(2);
//         setMaxPage(response.data.totalPages);
//     }

//     const fetchDataFilterByStatusAndType = async () => {
//         const response = await Appointment_Service.findByStatusAndType(trangThaiFilter, loaiLichHenFilter, numberDouble);
//         const data = response.data.content;
//         setPageData(data);
//         console.log(pageData);
//         setStatusQuery(3);
//         setMaxPage(response.data.totalPages);
//     }

//     const fetchDataFilterByName = async () => {
//         const response = await Appointment_Service.findByName(nameSearch, numberName);
//         const data = response.data.content;
//         setPageData(data);
//         console.log(pageData);
//         setStatusQuery(4);
//         setMaxPage(response.data.totalPages);
//     }

//     const showAppointmentDetailModal = (appointment) => {
//         fetchData();
//         setShowModal(true);
//         setAppointment(appointment);
//     }

//     const handlePreviousPage = () => {
//         if (statusQuery === 0) {
//             if (number > 0) {
//                 setNumber((prevPageNumber) => prevPageNumber - 1);
//             }
//         }
//         if (statusQuery === 1) {
//             if (numberStatus > 0) {
//                 setNumberStatus((prevPageNumber) => prevPageNumber - 1);
//             }
//         }
//         if (statusQuery === 2) {
//             if (numberType > 0) {
//                 setNumberType((prevPageNumber) => prevPageNumber - 1);
//             }
//         }
//         if (statusQuery === 3) {
//             if (numberDouble > 0) {
//                 setNumberDouble((prevPageNumber) => prevPageNumber - 1);
//             }
//         }
//         if (statusQuery === 4) {
//             if (numberName > 0) {
//                 setNumberName((prevPageNumber) => prevPageNumber - 1);
//             }
//         }
//     };

//     const changeStatus = (e) => {
//         setTrangThaiFilter(e.target.value);
//     }

//     const changeType = (e) => {
//         setLoaiLichHenFilter(e.target.value);
//     }

//     const handleNextPage = () => {
//         if (statusQuery === 0) {
//             setNumber((prevPageNumber) => prevPageNumber + 1);
//             if ((number + 1) === maxPage) {
//                 setNumber(0);
//             }
//         }
//         if (statusQuery === 1) {
//             setNumberStatus((prevPageNumber) => prevPageNumber + 1);
//             if ((numberStatus + 1) === maxPage) {
//                 setNumberStatus(0);
//             }
//         }
//         if (statusQuery === 2) {
//             setNumberType((prevPageNumber) => prevPageNumber + 1);
//             if ((numberType + 1) === maxPage) {
//                 setNumberType(0);
//             }
//         }
//         if (statusQuery === 3) {
//             setNumberDouble((prevPageNumber) => prevPageNumber + 1);
//             if ((numberDouble + 1) === maxPage) {
//                 setNumberDouble(0);
//             }
//         }
//         if (statusQuery === 4) {
//             setNumberName((prevPageNumber) => prevPageNumber + 1);
//             if ((numberName + 1) === maxPage) {
//                 setNumberName(0);
//             }
//         }
//     };

//     const changeNameSearch = (e) => {
//         setNameSearch(e.target.value);
//     }

//     const searchByName = () => {
//         if (nameSearch === '')
//             fetchData();
//         else
//             fetchDataFilterByName();
//     }

//     // const onchangeExport = async () => {
//     //     const response = await Appointment_Service.getAppointment(number);
//     //     const appointments = response.data.content;
//     //     const data = [
//     //         ['STT', 'Mã Khách Hàng', 'Tên khách hàng', 'Ngày đặt', 'Thời gian đặt', 'Trạng thái', 'Loại'],
//     //         ...appointments.map((appointment, index) => [
//     //             index + 1,
//     //             appointment.kh.maKhachHang,
//     //             appointment.kh.ho + " " + appointment.kh.ten,
//     //             moment(appointment.thoiGianDat).format('YYYY-MM-DD'),
//     //             moment(appointment.thoiGianDat).format('HH:mm'),
//     //             (() => {
//     //                 switch (appointment.trangThai) {
//     //                     case 0:
//     //                         return "Chờ Xác Nhận"
//     //                     case 1:
//     //                         return "Đã Xác Nhận"
//     //                     case 2:
//     //                         return "Đã Hoàn Thành"
//     //                     case 3:
//     //                         return "Quá Hẹn"
//     //                     case 4:
//     //                         return "Đã Huỷ"
//     //                     default:
//     //                         return "Chưa Cập Nhật"
//     //                 }
//     //             })(),
//     //             appointment.loaiLichHen ? "Online" : "Offline"
//     //         ]),
//     //     ];
//     //     await Common_Util.exportExcel(data, "Danh Sách Lịch Hẹn Trang " + (Number(number) + 1), "ListAppointmentPage" + (Number(number) + 1));
//     // }

//     // const onchangeImport = async (e) => {
//     //     const selectedFile = e.target.files[0];
//     //     const fileReader = new FileReader();
//     //     fileReader.onload = (e) => {
//     //         const data = new Uint8Array(e.target.result);
//     //         const workbook = XLSX.read(data, { type: 'array' });
//     //         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     //         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//     //         console.log(jsonData);
//     //     };
//     //     fileReader.readAsArrayBuffer(selectedFile);
//     // }
//     const deleteById = (id) => {
//         Swal.fire({
//             title: 'Bạn có muốn xoá?',
//             text: "Dữ Liệu Liên Quan Đến Lịch Hẹn Sẽ Bị Xoá!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Có, Tôi Đồng Ý!',
//             cancelButtonText: 'Không!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 Appointment_Service.deleteAppointment(id).then((response) => {
//                     if (response.data === true) {
//                         Swal.fire(
//                             'Xoá Thành Công!',
//                             '',
//                             'success'
//                         )
//                         fetchData()
//                     }
//                     else {
//                         console.error(response.data);
//                     }
//                 }).catch(error => {
//                     console.log(error);
//                 })
//             }
//         })
//     }
//     return (
//         <>
//             <Sidebar />
//             <section id="content">
//                 <main>
//                     <div className="table-data container">
//                         <div className="order">
//                             <div className="head">
//                                 <h3>Filter</h3>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-2"> <div>
//                                     <Link to="/Admin/Appointment/add" className="btn btn-primary">
//                                         Thêm Mới
//                                     </Link>
//                                 </div></div>
//                                 <div className="col-md-2">  <div>
//                                     <Export_Appointment_Components number={number} />
//                                 </div></div>
//                             </div>
//                             <span style={{ paddingtop: 20 }}></span>
//                             <div className="row" >
//                                 <div className="col-md-4"> <div>
//                                     <Import_Appointment_Component />
//                                 </div></div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-6" style={{ paddingTop: 35 }}>
//                                     <div className="input-group mb-3">
//                                         <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" value={nameSearch} onChange={changeNameSearch} />
//                                         <div className="btn btn-outline-secondary" type="button" onClick={() => searchByName()}><i className="bx bx-search"></i></div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="row">
//                                         <div className="col-md-1">
//                                             <i class="bi bi-filter-left"></i>
//                                         </div>
//                                         <div className="col-md-4">
//                                             <div className="row">
//                                                 <label className="form-label">
//                                                     Loại Lịch Hẹn
//                                                 </label>
//                                                 <select className="form-select" aria-label="Default select example" value={loaiLichHenFilter} onChange={changeType} >
//                                                     <option selected value="0">Tất Cả</option>
//                                                     <option value="true">Online</option>
//                                                     <option value="false">Offline</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label className="form-label">
//                                                 Trạng Thái
//                                             </label>
//                                             <select className="form-select" aria-label="Default select example" value={trangThaiFilter} onChange={changeStatus}>
//                                                 <option selected value="5">Tất Cả</option>
//                                                 <option value="0">Chờ Xác Nhận</option>
//                                                 <option value="1">Đã Xác Nhận</option>
//                                                 <option value="2">Đã Hoàn Thành</option>
//                                                 <option value="3">Quá Hẹn</option>
//                                                 <option value="4">Đã Huỷ</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//                 <main>
//                     <div className="table-data container">
//                         <div className="order">
//                             <div className="head">
//                                 <h3>Lịch Hẹn</h3>
//                             </div>
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th>STT</th>
//                                         <th>Mã Lịch Hẹn</th>
//                                         <th>Khách Hàng</th>
//                                         <th>Thời Gian Đặt</th>
//                                         <th>Thời Gian Dự Kiến</th>
//                                         <th>Trạng Thái</th>
//                                         <th>Loại Lịch Hẹn</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {
//                                         pageData.map(
//                                             (appoint, index) =>
//                                                 <tr key={appoint.id}>
//                                                     <td>{index + 1}</td>
//                                                     <td>{appoint.maLichHen}</td>
//                                                     <td>{appoint.kh.hoTen}</td>
//                                                     <td>{moment(appoint.thoiGianDat).format('YYYY-MM-DD HH:mm')}</td>
//                                                     <td>{appoint.thoiGianDuKien}</td>
//                                                     <td>{(() => {
//                                                         switch (appoint.trangThai) {
//                                                             case 0:
//                                                                 return "Chờ Xác Nhận"
//                                                             case 1:
//                                                                 return "Đã Xác Nhận"
//                                                             case 2:
//                                                                 return "Đã Hoàn Thành"
//                                                             case 3:
//                                                                 return "Quá Hẹn"
//                                                             case 4:
//                                                                 return "Đã Huỷ"
//                                                             default:
//                                                                 return "Chưa Cập Nhật"
//                                                         }
//                                                     })()}</td>
//                                                     <td>{appoint.loaiLichHen ? "Online" : "Offline"}</td>
//                                                     <td><button className='btn btn-danger' onClick={() => deleteById(appoint.id)}><i class="bx bxs-trash"></i></button>
//                                                         <span className="padd2"></span>
//                                                         <button className='btn btn-success'
//                                                             onClick={() => showAppointmentDetailModal(appoint)}
//                                                         ><i class="bx bxs-edit"></i></button>
//                                                     </td>
//                                                 </tr>
//                                         )}
//                                 </tbody>
//                             </table>
//                             <nav aria-label="Page navigation example" style={myStyle}>
//                                 <ul className="pagination">
//                                     <li className="page-item"><button class="page-link" onClick={handlePreviousPage}>Previous</button></li>
//                                     <li className="page-item"><button class="page-link" disabled>{(() => {
//                                         switch (statusQuery) {
//                                             case 0:
//                                                 return number + 1
//                                             case 1:
//                                                 return numberStatus + 1
//                                             case 2:
//                                                 return numberType + 1
//                                             case 3:
//                                                 return numberDouble + 1
//                                             case 4:
//                                                 return numberName + 1
//                                             default:
//                                                 return number + 1
//                                         }
//                                     })()}</button></li>
//                                     <li className="page-item"><button class="page-link" onClick={handleNextPage}>Next</button></li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </main>
//                 {showModal && <Modal_Detail_Appointment showModal={showModal} setShowModal={setShowModal} data={appointment} />}
//             </section>
//         </>
//     );
// }

// export default Appointment_List_Components
