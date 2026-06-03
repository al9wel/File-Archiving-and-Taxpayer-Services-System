export interface RequestResetPassword {
    userName?: string;
    password?: string;
}
export interface ResetPassword {
    status: boolean,
    data: {
        message: string
    }
}
export interface VerifyCode {
    status: boolean,
    data: {
        message: string,
        user_id: number | string,
    }
}
export interface ResetPassword {
    status: boolean,
    data: {
        message: string
    }
}
export interface ResendCode {
    status: boolean,
    data: {
        message: string,
        user_id: number | string,
        code?: number | string
    }
}

// ResendCode endpoint body
// {
//     userName
// }

// ResetPassword endpoint body
// {
//     user_id: number | string,
//     code: number | string,
//     newPassword: string,
//     newPassword_confirmation: string
// }

// VerifyCode endpoint body
// {
//     user_id: number | string,
//     code: number | string,
// }

// RequestResetPassword endpoint body
// {
//     userName
// }
