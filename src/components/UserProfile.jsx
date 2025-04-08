import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../redux/usersSlice"; // Add these actions in your slice

const UserProfile = () => {
    const { id } = useParams(); // Get the user ID from the route parameters
    console.log(id)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { role } = useSelector((state) => state.loggedUser); // Get role from Redux
    const usersList = useSelector((state) => state.users.usersList); // Get users list from Redux
    console.log(role, usersList)

    const [user, setUser] = useState(null); // State to store user data
    const [isEditMode, setIsEditMode] = useState(false); // State to toggle between view and edit mode
    const [formData, setFormData] = useState({ name: "", email: "", age: "" }); // Form data

    useEffect(() => {
        if (role === "admin") {
            // If admin, read user data from Redux store
            const userData = usersList.find((user) => user._id === id);
            if (userData) {
                setUser(userData);
                setFormData({ name: userData.name, email: userData.email, age: userData.age });
            }
        } else {
            // If user, fetch user data from the backend
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/users/${id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
                    const userData = await response.json();
                    setUser(userData);
                    setFormData({ name: userData.name, email: userData.email, age: userData.age });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUser();
        }
    }, [id, role, usersList]);

    const handleEditClick = () => {
        setIsEditMode(true); // Enable edit mode
    };

    const handleDeleteClick = async () => {
        console.log('delete clicked')
        // if (window.confirm("Are you sure you want to delete this user?")) {
        //     try {
        //         await dispatch(deleteUser(id)); // Dispatch delete action
        //         alert("User deleted successfully");
        //         navigate("/users"); // Redirect to users list
        //     } catch (error) {
        //         console.error("Error deleting user:", error);
        //     }
        // }
    };

    const handleFormSubmit = async (event) => {
        console.log('form submit clicked')
        // event.preventDefault();
        // try {
        //     await dispatch(updateUser({ id, ...formData })); // Dispatch update action
        //     alert("User updated successfully");
        //     setIsEditMode(false); // Exit edit mode
        // } catch (error) {
        //     console.error("Error updating user:", error);
        // }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-profile" style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            {isEditMode ? (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditMode(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <p>
                        <b>Name:</b> {user.name}
                    </p>
                    <p>
                        <b>Email:</b> {user.email}
                    </p>
                    <p>
                        <b>Age:</b> {user.age}
                    </p>
                    <button onClick={handleEditClick}>Edit</button>
                    {role === "admin" && <button onClick={handleDeleteClick}>Delete</button>}
                </div>
            )}
        </div>
    );
};

export default UserProfile;