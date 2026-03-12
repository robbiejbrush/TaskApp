import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

function Login() {

    return (
        <div>
            
        </div>
    );
}

export default Login;

// const [listOfUsers, setListOfUsers] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:3001/login").then ((response) => {
//             setListOfUsers(response.data);
//         });
//     }, []);

//     return (
//         <div>
//             {listOfUsers.map((value, key) => {
//                 return (
//                     <div> 
//                         <div> {value.email} </div>
//                         <div> {value.name} </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );