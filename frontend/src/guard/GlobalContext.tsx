import { createContext } from "react";
export const GlobalContext = createContext<any>({
    user: null,
    setUser: () => {},
    setLoading: () => {},
    http: null,
    loading: false,
    setOtpEmail: () => {},
    setOtp: () => {},
    otpEmail: "",
    otp: "",
    switchOtp: () => {},
    switchToSignup: () => {},
    switchToLogin: () => {},
    switchToProfile: () => {},
    switchToHome: () => {}, 
    setGfilter:()=>{}
});
