export interface ILogin {
    email: string;
    password: string;
}

export interface IAuthantication {
    fullname: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    confirmTermsAndConditions: boolean;
    isRememberUser: boolean;
}

export interface IApiResponse {
    message: string,
    success: boolean,
    result?: any
}