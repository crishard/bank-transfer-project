import jwt_decode from "jwt-decode";
import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Define a interface para o payload do token
interface ITokenPayload {
    exp: number;
}
interface IAuthContext {
    isAuthenticated: boolean;
}
const AuthContext = createContext<IAuthContext>({ isAuthenticated: false });


interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode<ITokenPayload>(token);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTimestamp) {
                navigate("/login");
                localStorage.removeItem("token");
            } else{
                setIsAuthenticated(true);
                navigate("/home");
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [navigate]);

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
