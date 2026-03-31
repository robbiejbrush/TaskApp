import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../CSS/App.css';
import '../CSS/Login.css'

function Login({ setToken }) {

    const navigate = useNavigate()

    return (
        <div>
            <div className="HeadingDiv">
                <h1 className= "IntroHeading">Welcome to the Task App</h1>
            </div>
            
            <div className="LoginPrompt">
                <GoogleLogin onSuccess={(credentialResponse) => {
                    const decodedUser = jwtDecode(credentialResponse.credential)
                    
                    const data = { email: decodedUser.email, name: decodedUser.name }

                    axios.post("https://task-app-9add24d8d958.herokuapp.com/auth", data).then((response) => {
                        if (response.data.error) {
                            alert(response.data.error);
                        } else {
                            const expiryDate = new Date(9999, 0, 1).toUTCString();
                            document.cookie = `accessToken=${response.data}; expires=${expiryDate}; path=/`;
                            
                            setToken(response.data);
                            navigate("/projects", { replace: true })
                        }
                    });
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