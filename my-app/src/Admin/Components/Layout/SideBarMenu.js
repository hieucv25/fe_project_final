import React, { useState } from 'react';
import "../../../css/sidebarMenu.css";
import { Space } from 'antd'

export default function SideBarMenu() {

    return (
        <>
            <div className='header'> header
                <Space>
                    <div className='side_menu'>Menu</div>
                    <div className='page_content'>Content</div>
                </Space>

            </div>
        </>
    )
};
