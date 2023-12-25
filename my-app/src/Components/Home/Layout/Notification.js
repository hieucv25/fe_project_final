import React from 'react';
import moment from 'moment';

export default function NotificationRender(props) {

    const appoint = props.appoint;

    return (
        <>
            <li key={appoint.idHistoricAppointment}>
                <div className="dropdown-item" style={{ fontSize: 10 }}>
                    {appoint.status === 0 && (
                        <span>Bạn Đặt Lịch Hẹn Thành Công Với Mã Lịch Hẹn Là
                            <span className="text-notifi">
                                {appoint.codeAppointment}.</span>
                            <br />
                            <span>Vui Lòng Chờ Xác Nhận!</span>
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
        </>
    );
}