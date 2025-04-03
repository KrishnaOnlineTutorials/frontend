import React, { useState, useEffect } from "react";
import User from "./User";
import './Users.css'


const Users = (props) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResponse = await fetch('http://localhost:5000/users')
                const usersList = await usersResponse.json()
                setUsers(usersList)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [])
    return (
        <React.Fragment>
            <h1>List of Users</h1>
            <div className={'user-container'}>
            <div className="user-card">
                {
                    users.map((user, index) => {
                        return <User key={index} {...user} />
                        // handleButtonClick={props.handleButtonClick}
                    })
                }
            </div>
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