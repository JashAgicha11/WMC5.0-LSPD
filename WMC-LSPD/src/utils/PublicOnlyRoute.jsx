import { useState } from "react";
import { Navigate } from "react-router-dom"



const PublicOnlyRoute = ({Component}) => {
    const [isLogin, setIsLogin] = useState(false);
    return isLogin ? <Navigate to="/office" replace /> : <Component />
};

export default PublicOnlyRoute
