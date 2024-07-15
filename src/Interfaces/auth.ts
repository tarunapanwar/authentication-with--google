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
}

export interface IApiResponse {
    message: string,
    success: boolean,
    result?: any
}

export interface IAuthContextType {
    user: string | null;
    signIn: (user: string) => void;
    signOut: () => void;
}