import React, { useContext } from "react";
import { UserContext } from "../App";

const User = (props) => {
    const {name, email, age, handleButtonClick} = props;
    const buttonHandler = () =>{
        console.log('Button has been clicked');
    }
    return (
    <div className="user-card" style={{width: '200px',
        border: '1px solid grey',
        borderRadius: '10px',
        textAlign: 'left',
        padding: '10px'}}>
        <p>
            <b>Name:</b> 
            {name}
        </p>
        <p><b>email:</b> {email}</p>
        <p><b>age:</b> {age}</p>
        {/* <button onClick={buttonHandler}>PassInfoToParent</button> */}
    </div>
    )
}

export default User;