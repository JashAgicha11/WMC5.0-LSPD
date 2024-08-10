import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import {useState} from "react";
import { FaUser } from "react-icons/fa";
import Slideshow from "../components/SlideShow";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("user")
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            console.log(username, email, password, role);
            const response = await fetch('https://lspd-project.onrender.com/user', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username,email, password, role}),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate('/login');
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="w-full h-screen flex flex-col justify-center bg-transparent">
            <Slideshow/>
            <div className="border-fuchsia-200 shadow-lg shadow-fuchsia-400 rounded-lg w-1/3 mx-auto p-6 px-6 flex flex-col gap-y-4 items-center bg-black text-white">
                <p className="text-3xl font-bold font-anton text-fuchsia-600">Sign Up</p>
                <div className="flex items-center gap-x-2 w-full">
                    <div className="w-10 flex justify-center">
                        <FaUser size={25}/>
                    </div>
                    <input
                        name="username"
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-black font-bold w-full border-2 rounded-md px-2 py-1"
                    />
                </div>
                <div className="flex items-center gap-x-2 w-full">
                    <div className="w-10 flex justify-center">
                        <IoMdMail size={30}/>
                    </div>
                    <input
                        name="email"
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black font-bold w-full border-2 rounded-md px-2 py-1"
                    />
                </div>
              
                <div className="flex items-center gap-x-2 w-full">
                    <div className="w-10 flex justify-center">
                        <RiLockPasswordFill size={30}/>
                    </div>
                    <input
                        name="password"
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black font-bold w-full border-2 rounded-md px-2 py-1"
                    />
                </div>
                <div className="flex items-center gap-x-2 w-full">
                    <div className="w-10 flex justify-center">
                        <RiLockPasswordFill size={30}/>
                    </div>
                    <input
                        name="confirmPass"
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-black font-bold w-full border-2 rounded-md px-2 py-1"
                    />
                </div>
                <button
                    className="border-2 w-32 py-2 rounded-md glow-on-hover"
                    disabled={confirmPassword !== password || confirmPassword === "" || password === ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    Sign Up
                </button>
                <div className="w-full text-end">
                    Already have an account? <span className="text-blue-500 font-bold cursor-pointer" onClick={() => {navigate('/login')}}>Sign In</span>
                </div>
            </div>
        </div>
    )
}