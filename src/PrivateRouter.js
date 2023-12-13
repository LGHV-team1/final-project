import React from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
function PrivateRouter() {
    const jwtToken = window.localStorage.getItem("jwtToken");
    const refresh = window.localStorage.getItem("refresh");

    if (jwtToken || refresh){
        return <Outlet/>
    }
    else {
        alert("로그인을 하세요")
        return <Navigate to="/login" />;
    }
}

export default PrivateRouter;