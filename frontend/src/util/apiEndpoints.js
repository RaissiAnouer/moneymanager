//export const BASE_URL = "https://moneymanager-backend-master-f46389e.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:9090";

const CLOUDINARY_CLOUD_NAME = "dkjzxthju"


export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}