import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';

function Login() {

    const navigate = useNavigate()

    return (
        <div>
            <div className="TopDiv">
                <h1 className= "IntroHeading">Welcome to the Task App</h1>
            </div>
            
            <div className="LoginPrompt">
                <GoogleLogin onSuccess={(credentialResponse) => {
                    const decodedUser = jwtDecode(credentialResponse.credential)
                    
                    const data = { email: decodedUser.email, name: decodedUser.name }

                    axios.post("http://localhost:3001/auth", data).then((response) => {
                        if (response.data.error) alert(response.data.error);
                        sessionStorage.setItem("accessToken", response.data)
                    });

                    navigate("/projects")
                }}
                onError={() => console.log("Login failed")} 
                auto_select={true}
                shape= "pill"
                theme= "filled_blue"/>
            </div>
        </div>
    );
}

export default Login;