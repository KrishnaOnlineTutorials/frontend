import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { updateUserLogStatus } from "../redux/loggedUserSlice";
import { UserContext } from "../App";

const Navigation = () => {
    // const { setIsLoggedIn } = useContext(UserContext);
    const dispatch = useDispatch();
    const onLogout = (event) => {
        event.preventDefault()
        console.log("Logout clicked");
        // setIsLoggedIn(false);
        dispatch(updateUserLogStatus(false));
    }
    return (
        <nav className="navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
                {/* <li><a href="/userform">Userform</a></li> */}
            </ul>
            <button onClick={onLogout}>Logout</button>
        </nav>
    );
}

export default Navigation;