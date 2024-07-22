export interface ILogin {
    email: string;
    password: string;
}

export interface IAuthantication {
    title?: string;
    fullname: string;
    displayName?: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;    
    confirmTermsAndConditions: boolean;
    isRememberUser: boolean;
    pic?: string;
    number: string;
    about?: string;
    code?: string;
    token?: string;
}

export interface IApiResponse {
    message: string,
    success: boolean,
    result?: any
}

export interface IAuthContextType {
    user: string | null;
    contextSignIn: (user: string) => void;
    contextSignOut: () => void;
}