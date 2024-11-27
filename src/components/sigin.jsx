import { useState } from "react";
import { signUp } from "../api";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword ] = useState('');

    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        signUp(name,email,password).then(data => {
            console.log(data);
            if (data.Error !== undefined) {
                window.alert(data.Error);
                return;
            }
            sessionStorage.setItem("token",data.token);
            navigate("/home");
        })
    }

    return (
        <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div className="main-container">
            <h2>SignUp</h2>
            <form onSubmit={onSubmitHandler}>
            <div>
                    <label>Name</label>
                    <input type="text" value={name} className="login_input"
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} className="login_input"
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" value={password} className="login_input"
                    onChange={(p) => setPassword(p.target.value)}/>
                </div>
                <button type="submit">SignIN</button>
                <Link to='/login'><p>Login</p></Link>
            </form>
        </div>
        </div>
    );
}