
// ====================================== LOGIN ====================================== 
// 🌸 Request type for login
export type LOGIN_REQUEST = {
    email : string,
    password : string,
}

// 👑 Response type for login
export type LOGIN_RESPONSE = {
    message: string,
    result?: {
        id: number,
        name: string,
        mobile: string,
        email: string,
        role: string
    }
}

// ====================================== LOGOUT ====================================== 
// 🌸 Request type for logout
export type LOGOUT_REQUEST = void

// 👑 Response type for logout
export type LOGOUT_RESPONSE = { message: string }