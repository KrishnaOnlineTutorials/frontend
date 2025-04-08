import React, { useState, useEffect } from "react";
import User from "./User";
import './Users.css'
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/usersSlice";


const Users = (props) => {
    const dispatch = useDispatch()
    const { usersList, loading, error } = useSelector((state) => state.users)
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error: {error}</div>
    }
    
    return (
        <React.Fragment>
            <h1>List of Users</h1>
            <div className="users-container">
                {
                    usersList.map((user, index) => {
                        return <User key={index} userData={user}/>
                    })
                }
            </div>
        </React.Fragment>
    );
}

export default Users;


// Component - Functional Component and Class Component
// State ful - Hooks (lifecycle)        Lifecycle
// Mounting     Updating    Unmounting
// State        useState                this.state
// State        setVariable             this.setState
// Effect       useEffect               all life cycle methods
// Props        props                   this.props  - Read Only