import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const User = (props) => {
    const { name, email, age } = props.userData;
    const navigate = useNavigate()
    console.log(props)
    // const buttonHandler = () =>{
    //     console.log('Button has been clicked');
    // }
    const userTileClickHandler = () => {
        console.log('User tile has been clicked');
        // handleButtonClick(name, email, age)
        // window.location.href = '/users/' + props.userData._id
        navigate(`/users/${props.userData._id}`)
    }
    return (
    <div className="user-card" style={{width: '200px',
        border: '1px solid grey',
        borderRadius: '10px',
        textAlign: 'left',
        padding: '10px'}}
        onClick={userTileClickHandler}>
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