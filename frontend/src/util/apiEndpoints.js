//export const BASE_URL = "https://moneymanager-backend-master-f46389e.onrender.com/api/v1.0"
export const BASE_URL = "http://localhost:9090/api/v1.0"
const CLOUDINARY_CLOUD_NAME = "dkjzxthju"


export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXEL_DOWNLOAD: "excel/download/income",
    EMAIL_INCOME: "/email/income-excel",
    APPLY_FILTER: "/filter",
    DASHBOARD_DATA: "/dashboard",
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    EXPENSE_EXCEL_DOWNLOAD: "excel/download/expense",
    EMAIL_EXPENSE: "/email/expense-excel",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    UPDATE_PROFILE: '/updateProfile',
    AI_INPUT: '/ai-input',
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

}