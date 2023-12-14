import React from 'react';
import Appointment_Service from '../../../../Api/Admin/Appointment_Service';
import moment from 'moment';
import Common_Util from '../../../../Utils/Common_Util';

export default function Export_Appointment_Components(props) {

    const onchangeExport = async () => {
        const response = await Appointment_Service.getAppointment(props.number);
        const appointments = response.data.content;
        const data = [
            ['STT', 'Mã Khách Hàng', 'Tên khách hàng', 'Ngày đặt', 'Thời gian đặt', 'Trạng thái', 'Loại'],
            ...appointments.map((appointment, index) => [
                index + 1,
                appointment.kh.maKhachHang,
                appointment.kh.ho + " " + appointment.kh.ten,
                moment(appointment.thoiGianDat).format('YYYY-MM-DD'),
                moment(appointment.thoiGianDat).format('HH:mm'),
                (() => {
                    switch (appointment.trangThai) {
                        case 0:
                            return "Chờ Xác Nhận"
                        case 1:
                            return "Đã Xác Nhận"
                        case 2:
                            return "Đã Hoàn Thành"
                        case 3:
                            return "Quá Hẹn"
                        case 4:
                            return "Đã Huỷ"
                        default:
                            return "Chưa Cập Nhật"
                    }
                })(),
                appointment.loaiLichHen ? "Online" : "Offline"
            ]),
        ];
        await Common_Util.exportExcel(data, "Danh Sách Lịch Hẹn Trang " + (Number(props.number) + 1), "ListAppointmentPage" + (Number(props.number) + 1));
    }
    return (
        <div>
            <button onClick={() => onchangeExport()} className="btn btn-success">
                Export
            </button>
        </div>
    )
}