import React, { useState } from 'react';
import "./Login.css";
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import Netflix_in from '../../assets/Netflix_Intro4K.mp4'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 5000); // ✅ Play video for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return (
    <div className='login-container'>
      {showVideo ? (
        <video autoPlay unmuted className='fullscreen-video'>
          <source src={Netflix_in} type='video/mp4' />
        </video>
      ) : (
        <div className='login'>
          <img src={logo} alt='' className='login-logo' />
          <div className='login-form'>
            <h1>{signState}</h1>
            <form>
              {signState === "Sign Up" && (
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Your Name' />
              )}
              <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
              <button onClick={user_auth} type='submit'>{signState}</button>
              <div className='form-help'>
                <div className='remember'>
                  <input type='checkbox' />
                  <label>Remember Me</label>
                </div>
                <p>Need Help?</p>
              </div>
            </form>
            <div className='form-switch'>
              {signState === "Sign In" ? (
                <p>New To Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
              ) : (
                <p>Already Have an Account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
