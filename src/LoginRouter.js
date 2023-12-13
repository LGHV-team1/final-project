import React from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
function LoginRouter() {
    const jwtToken = window.localStorage.getItem("jwtToken");
    const refresh = window.localStorage.getItem("refresh");

    if (jwtToken || refresh){
        return <Navigate to="/home" />;
    }
    else {
        return <Outlet/>;
    }
}

export default LoginRouter;