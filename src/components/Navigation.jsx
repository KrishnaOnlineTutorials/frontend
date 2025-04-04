import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { updateUserLogStatus } from "../redux/loggedUserSlice";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Navigation = () => {
    const dispatch = useDispatch();
    const onLogout = (event) => {
        console.log(event.target)
        event.preventDefault()
        dispatch(updateUserLogStatus(false));
    }
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/users">Users</Link></li>
            </ul>
            <button onClick={() =>{}}>Logout</button>
        </nav>
    );
}

export default Navigation;