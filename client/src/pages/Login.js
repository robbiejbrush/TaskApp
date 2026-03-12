import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
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
                console.log(jwtDecode(credentialResponse.credential))
                navigate("/projects")
                }}
                onError={() => console.log("Login failed")} 
                auto_select={true}
                shape= "pill"
                theme= "filled_blue"
                />
            </div>
        </div>
    );
}

export default Login;