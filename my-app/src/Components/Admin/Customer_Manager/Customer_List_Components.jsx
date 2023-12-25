// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "../Layout/Sidebar";
// import Customer_Service from "../../../Api/Admin/Customer_Service";
// import { Button } from "react-bootstrap";
// import Swal from 'sweetalert2';
// import 'react-toastify/dist/ReactToastify.css';
// import Export_Components from './Excel/Export_Components';
// import Import_Components from './Excel/Import_Components'
// import Modal_Detail_Customer from "./Modal/Modal_Detail_Customer";

// export default function Customer_List_Components() {

//     const [number, setNumber] = useState(0);
//     const [pageData, setPageData] = useState([]);
//     const [nameSearch, setNameSearch] = useState('');
//     const [customer, setCustomer] = useState();
//     const [maxPage, setMaxPage] = useState(0);
//     const [showModal, setShowModal] = useState(false);
//     const [statusQuery, setStatusQuery] = useState(0);

//     useEffect(() => {
//         fetchData();
//     }, [number])

//     useEffect(() => {
//         fetchData();
//     }, [showModal])

//     useEffect(() => {
//         if (nameSearch !== '')
//             fetchDataByName();
//     }, [nameSearch])

//     const fetchData = async () => {
//         try {
//             const response = await Customer_Service.getCustomer(number);
//             const data = response.data.content;
//             setMaxPage(response.data.totalPages);
//             setPageData(data);
//         }
//         catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchDataByName = async () => {
//         try {
//             const response = await Customer_Service.searchByName(nameSearch, number);
//             const data = response.data.content;
//             setMaxPage(response.data.totalPages);
//             setPageData(data);
//         }
//         catch (error) {
//             console.error(error);
//         }
//     };

//     const showCustomerDetailModal = (customer) => {
//         setCustomer(customer);
//         setShowModal(true);
//         setNameSearch('');
//     };

//     const myStyle = {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     }

//     const handlePreviousPage = () => {
//         if (statusQuery === 0 && number > 0) {
//             setNumber((prevPageNumber) => prevPageNumber - 1);
//         }
//         if (statusQuery === 1 && number > 0) {
//             setNumber((prevPageNumber) => prevPageNumber - 1);
//         }
//     };

//     const handleNextPage = () => {
//         if (statusQuery === 0) {
//             setNumber((prevPageNumber) => prevPageNumber + 1);
//             if ((number + 1) === maxPage) {
//                 setNumber(0);
//             }
//         }
//         if (statusQuery === 1) {
//             setNumber((prevPageNumber) => prevPageNumber + 1);
//             if ((number + 1) === maxPage) {
//                 setNumber(0);
//             }
//         }
//     };

//     const changeNameSearch = (e) => {
//         setNameSearch(e.target.value);
//         setStatusQuery(1);
//     }

//     const searchByName = (nameSearch) => {
//         if (nameSearch.length === '')
//             fetchData();
//         else
//             fetchDataByName();
//     }

//     const deleteById = (id) => {
//         Swal.fire({
//             title: 'Bạn có muốn xoá?',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Có, Tôi Đồng Ý!',
//             cancelButtonText: 'Không!'
//         }).then((result) => {
//             if (result.isConfirmed) {

//                 Customer_Service.deleteCustomer(id).then((response) => {
//                     if (response.status === 200) {
//                         Swal.fire(
//                             'Xoá Thành Công!'
//                         )
//                     }
//                     fetchData();
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
//                                     <Link to="/Admin/Customer/add" className="btn btn-primary">
//                                         Thêm Mới
//                                     </Link>
//                                 </div></div>
//                                 <div className="col-md-2">  <div>
//                                     <Export_Components number={number} />
//                                 </div></div>
//                             </div>
//                             <span style={{ paddingtop: 20 }}></span>
//                             <div className="row" >
//                                 <div className="col-md-4"> <div>
//                                     <Import_Components />
//                                 </div></div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-md-6" style={{ paddingTop: 35 }}>
//                                     <div className="input-group mb-3">
//                                         <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" value={nameSearch} onChange={changeNameSearch} />
//                                         <div className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => searchByName(nameSearch)}><i class="bx bx-search"></i></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//                 <main>
//                     <div className="table-data container">
//                         <div className="order">
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th>STT</th>
//                                         <th>Mã Khách Hàng</th>
//                                         <th>Họ Tên</th>
//                                         <th>Email</th>
//                                         <th>Số Điện Thoại</th>
//                                         <th>Địa Chỉ</th>
//                                         <th>Giới Tính</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {
//                                         pageData.map(
//                                             (customer, index) =>
//                                                 <tr key={customer.id}>
//                                                     <td>{index + 1}</td>
//                                                     <td>{customer.maKhachHang}</td>
//                                                     <td>{customer.hoTen}</td>
//                                                     <td>{customer.email}</td>
//                                                     <td>{customer.sdt}</td>
//                                                     <td>{customer.quanHuyen + ", " + customer.tinhThanh}</td>
//                                                     <td>{customer.gioiTinh === true ? "Nam" : "Nữ"}</td>
//                                                     <td><button className='btn btn-danger' onClick={() => deleteById(customer.id)}><i class="bx bxs-trash"></i></button>
//                                                         <span className="padd2"></span>
//                                                         <Button className='btn btn-success' onClick={() => showCustomerDetailModal(customer)}><i class="bx bxs-edit"></i></Button>
//                                                     </td>
//                                                 </tr>

//                                         )}
//                                 </tbody>
//                             </table>
//                             <nav aria-label="Page navigation example" style={myStyle}>
//                                 <ul className="pagination">
//                                     <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
//                                     <li className="page-item"><button className="page-link" disabled>{number + 1}</button></li>
//                                     <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </main>
//                 {showModal && (<Modal_Detail_Customer showModal={showModal} setShowModal={setShowModal} data={customer} />)}
//             </section>
//         </>
//     );
// }
