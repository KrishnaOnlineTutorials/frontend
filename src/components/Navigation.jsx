import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserLogStatus } from "../redux/loggedUserSlice";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Navigation = () => {
    const dispatch = useDispatch();
    const { role } = useSelector((state) => state.loggedUser) || true;
    const onLogout = (event) => {
        event.preventDefault()
        dispatch(updateUserLogStatus({isLoggedIn: false}));
    }
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                {role === 'admin' && <li><Link to="/users">Users</Link></li>}
            </ul>
            <button onClick={onLogout}>Logout</button>
        </nav>
    );
}

export default Navigation;