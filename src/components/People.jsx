import React, {useContext} from "react";
import { UserContext } from "../App";

const People = (props) => {
    // const {data} = props;
    const {childData} = useContext(UserContext)
    return (
        <div>
            <h1>{childData.location}</h1>
        </div>
    )
}

export default People;