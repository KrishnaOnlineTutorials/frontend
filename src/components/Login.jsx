import React from "react";
import { useDispatch } from "react-redux";
import { updateUserLogStatus } from "../redux/loggedUserSlice";
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiConfig";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
            event.preventDefault();
    
            // Validate form fields
            if (!formData.email || !formData.password) {
                alert("All fields are required!");
                return;
            }
    
            // Encrypt the password
            const encryptedPassword = CryptoJS.AES.encrypt(formData.password, "secret-key").toString();
            console.log(formData.password, encryptedPassword)
            const authUser = {
                email: formData.email,
                password: encryptedPassword,
            }
    
            try {
                // Make the POST request
                console.log(API_BASE_URL)
                const response = await fetch(`${API_BASE_URL}/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(authUser),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to submit the form');
                }
    
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.user.id);
                console.log(result)
                dispatch(updateUserLogStatus({ isLoggedIn: true, role: result.user.role }))
                // if(result?.user?.role === "admin"){
                //     navigate("/users")
                // }
                // else { 
                //     navigate(`/users/`+ result.user.id)
                // }
                // setTimeout(() => {
                //     dispatch(updateUserLogStatus({ isLoggedIn: true, role: result.user.role }));
                // }, 1000)
                // dispatch(updateUserLogStatus(true));
            } catch (error) {
                console.error('Error submitting the form:', error);
                alert("Failed to submit the form. Please try again.");
            }
    
            console.log("Form submitted successfully!");
        };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSignUp = () => {
        window.location.href = "/signup";
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <button type="submit">Login</button>
                <input type="button" value="Sign Up" onClick={handleSignUp}/>
            </div>
        </form>
    )
}

export default Login;