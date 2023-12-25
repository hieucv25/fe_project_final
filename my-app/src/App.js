import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home_Page from "./Client/Components/Home_Page";
import Service from "./Client/Components/Service";
import About from "./Client/Components/About";
import Booking from "./Client/Components/Booking";
import Contact from "./Client/Components/Contact";
import Login from "./Author/Components/Login";
import Register from "./Author/Components/Register";
import Create_Customer_Components from "./Admin/Components/Customer_Manager/Create_Customer_Component";
import Customer_List_Components from "./Admin/Components/Customer_Manager/Customer_List_Components";
import { APP_ROUTERS } from "./Contants";
import Appointment_List_Components from "./Admin/Components/Appointment_Manager/Appointment_List_Components";
import Create_Appointment_Components from "./Admin/Components/Appointment_Manager/Create_Appointment_Components";
import Appointment_Detail_Components from "./Admin/Components/Appointment_Manager/Appointmet_Detail_Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login_With_NumberPhone from "./Author/Components/Login_With_NumberPhone";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login_with_number_phone" element={<Login_With_NumberPhone />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" excact element={<Home_Page />}></Route>
        <Route path="/home" element={<Home_Page />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path={APP_ROUTERS.CUSTOMER.ADD.VALUE} element={<Create_Customer_Components />}></Route>
        <Route path={APP_ROUTERS.CUSTOMER.INDEX.VALUE} element={<Customer_List_Components />}></Route>
        <Route path={APP_ROUTERS.APPOINTMENT.INDEX.VALUE} element={<Appointment_List_Components />}></Route>
        <Route path={APP_ROUTERS.APPOINTMENT.ADD.VALUE} element={<Create_Appointment_Components />}></Route>
        <Route path={APP_ROUTERS.APPOINTMENT.DETAIL.VALUE} element={<Appointment_Detail_Components />}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
export default App;
