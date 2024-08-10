import React, { useState } from 'react'
import './loginsignup.css'
// import icon1 from '../Assets/275510-blackangel.jpg'
// import icon2 from '../Assets/359621-blackangel.jpg'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import pass_icon from '../Assets/password.png'
// import role_icon from '../Assets/icons8-roles-64.png'
const Loginsingup = () => {
    const [action,setAction] = useState("Sign Up")
    const [username, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [role, setrole] = useState("")
    const [message, setMessage] = useState("");
    
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/user', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username,email, password, role}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

   return (
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
            {action==='Login'?<div></div>:<div className="input">
                <img src={user_icon} alt=''/>
                <input
                            type='text'
                            placeholder='Name'
                            value={username}
                            onChange={(e) => setname(e.target.value)}
                        />
            </div>
            }
            <div className="input">
                <img src={email_icon} alt=''/>
                <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <div className="input">
                {/* <img src={role_icon} alt=''/> */}
                <input
                        type='text'
                        placeholder='Role'
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                    />
            </div>
                <div className="input">
                    <img src={pass_icon} alt='password icon' />
                    <input
                        type='password' placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-pass">Forgot Password? <span>Click Here!</span></div>}
        <div className="submit-container">
            <button className={action==='Login'?'submit gray':'submit'} onClick={() =>{setAction("Sign Up"); handleSubmit();}}>Sign Up</button>
            <button className={action==="Sign Up"?'submit gray':'submit'} onClick={() =>{setAction("Login"); handleSubmit();}} >Login</button>
        </div>
        {message && <p>{message}</p>}
    </div>
  )
}

export default Loginsingup