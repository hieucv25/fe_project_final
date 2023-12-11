export const APP_ROUTERS = {
    CUSTOMER: {
        INDEX: {
            LABEL: 'QUAN LI KHACH HANG',
            VALUE: '/admin/customer/index'
        },
        ADD: {
            LABEL: 'QUAN LI KHACH HANG',
            VALUE: '/admin/customer/add'
        },
        SEARCH: {
            LABEL: 'QUAN LI KHACH HANG',
            VALUE: '/admin/customer/search/:name'
        },
    },
    APPOINTMENT: {
        INDEX: {
            LABEL: 'QUAN LI LICH HEN',
            VALUE: '/admin/appointment/index'
        },
        ADD: {
            LABEL: 'QUAN LI LICH HEN',
            VALUE: '/admin/appointment/add'
        },
        DETAIL: {
            LABEL: 'QUAN LI LICH HEN',
            VALUE: '/admin/appointment/detail/:id'
        },
    },
    Service: {
        INDEX: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/index",
        },
        PAGE: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/index/page/:number",
        },
        SEARCH_TEN: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/index/search_ten/:ten",
        },
        SEARCH_TEN2: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/index/search_ten/:ten/:number",
        },
        SEARCH_LOAIDV: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/index/search_loai/:loaiDV",
        },
        SEARCH_LOAIDV2: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/index/search_loai/:loaiDV/:number",
        },
        SORT: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/index/sort/:field",
        },
        ADD: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/add",
        },
        DETAIL: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/detail/:id",
        },
        UPDATE: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/update/:id",
        },
        DELETE: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/dichvu/delete",
        },
    },
    Service_Type: {
        INDEX: {
            LABEL: "QUAN LI LOAI DICH VU",
            VALUE: "admin/loaidichvu/index",
        },
        PAGE: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/loaidichvu/index/page/:number",
        },
        search: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/loaidichvu/index/search/:ten",
        },
        SORT: {
            LABEL: "QUAN LI DICH VU",
            VALUE: "admin/loaidichvu/index/sort/:field",
        },
        ADD: {
            LABEL: "QUAN LI LOAI DICH VU",
            VALUE: "admin/loaidichvu/add",
        },
        DETAIL: {
            LABEL: "QUAN LI LOAI DICH VU",
            VALUE: "admin/loaidichvu/detail/:id",
        },
        UPDATE: {
            LABEL: "QUAN LI LOAI DICH VU",
            VALUE: "admin/loaidichvu/update/:id",
        },
        DELETE: {
            LABEL: "QUAN LI LOAI DICH VU",
            VALUE: "admin/loaidichvu/delete",
        },
    },
}