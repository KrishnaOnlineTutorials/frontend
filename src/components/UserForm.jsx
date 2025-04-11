import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../redux/formSlice";
import { updateUserLogStatus } from "../redux/loggedUserSlice";
import { UserContext } from "../App";
import CryptoJS from 'crypto-js';
import './userform.css'
import API_BASE_URL from "../apiConfig";

const UserForm = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form);
    const loggedUserData = useSelector((state) => state.loggedUser);
    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch(updateForm({ field: name, value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!formData.name || !formData.email || !formData.age || !formData.password || !formData.confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(formData.password, "secret-key").toString();

        // Log the form data (you can replace this with an API call)
        const userData = {
            name: formData.name,
            email: formData.email,
            age: formData.age,
            password: encryptedPassword, // Encrypted password
        }

        try {
            // Make the POST request
            const authToken = localStorage.getItem('token')
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the form');
            }

            const result = await response.json();
            console.log('Form submitted successfully:', result);
            // setIsLoggedIn(true);
            dispatch(updateUserLogStatus({isLoggedIn: false}));
            // alert("Form submitted successfully!");
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert("Failed to submit the form. Please try again.");
        }

        console.log("Form submitted successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} value={formData.name} />
            </div>
            <div>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} value={formData.email} />
            </div>
            <div>
                <label>Age</label>
                <input type="text" name="age" onChange={handleChange} value={formData.age} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={formData.password} />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <button type="submit">Submit</button>
                <input type="button" value="Login" onClick={() => window.location.href = "/login"} />
            </div>
        </form>
    )
}

export default UserForm;