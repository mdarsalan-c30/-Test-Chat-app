import React ,{useState}from 'react'
import { useNavigate,Link } from 'react-router-dom';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const data= await signInWithEmailAndPassword(auth, email, password);
      console.log(data)
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className='logo'>Chat-App</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password' />
                

                <button>Login</button>
                {err && <span>Something went wrrong</span>}
            </form>
            <p>You do'nt have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}
