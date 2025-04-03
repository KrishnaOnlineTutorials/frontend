import React from "react";
import { useSelector } from "react-redux";

const UserFormReadOnly = () => {
    const formData = useSelector((state) => state.form);

    return (
        <div>
            <ul>
                <li>Name: {formData.name}</li>
                <li>Email: {formData.email}</li>
                <li>Age: {formData.age}</li>
            </ul>
        </div>
    )

}

export default UserFormReadOnly;