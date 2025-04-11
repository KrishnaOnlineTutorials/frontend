import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../apiConfig";

const UserDetails = () => {
    const { id } = useParams(); // Get the user ID from the route parameters
    const [user, setUser] = useState(null); // State to store user data
    const [error, setError] = useState(null); // State to handle errors
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                setUser(userData); // Set the user data
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUser();
    }, [id]); // Dependency array ensures the effect runs when `id` changes

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!user) {
        return <p>No user found</p>;
    }

    return (
        <div className="user-card" style={{
            width: '300px',
            border: '1px solid grey',
            borderRadius: '10px',
            textAlign: 'left',
            padding: '10px',
            margin: '20px auto'
        }}>
            <p>
                <b>Name:</b> {user.name}
            </p>
            <p>
                <b>Email:</b> {user.email}
            </p>
            <p>
                <b>Age:</b> {user.age}
            </p>
        </div>
    );
};

export default UserDetails;