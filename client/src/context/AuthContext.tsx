import { AxiosBackend } from "@/utils/Axios";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";


type AuthContextType = {
  authLoading: boolean
  authState: boolean
  Login: (email: string, password: string) => Promise<void>
  Logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children : ReactNode}) {
    const [authState, setAuthState] = useState<boolean>(false)
    const [authLoading, setAuthLoading] = useState<boolean>(true)

    const VerifyToken = async () => {
        try {
            setAuthLoading(true)
            const res = await AxiosBackend.post("/user/verify-token")
            if (res.status === 200){
                setAuthState(true)
            }
        } catch (error) {
            console.error(error)
            setAuthState(false)
        } finally {
            setAuthLoading(false)
        }
    }

    useEffect(() => {
        VerifyToken()
    },[])


    const Login = async (email : string ,password :string) => {
        try {
            setAuthLoading(true)

            const res = await AxiosBackend.post("/user/login")
            if(res.status === 200){
                setAuthState(true)
            }

        } catch (error) {
            console.error(error)
            setAuthState(false)
        } finally {
            setAuthLoading(false)
        }
    }

    const Logout = async () => {
        try {
            setAuthLoading(true)
            const res = await AxiosBackend.post("/user/logout")
            if(res.status === 200) {
                setAuthState(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setAuthLoading(false)
        }
    }


    return (
        <AuthContext.Provider value={{authLoading, authState, Login, Logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}