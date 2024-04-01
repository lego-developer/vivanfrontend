import React, { useState } from 'react'
import "./Login.scss"
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await newRequest.post("auth/login",{username,password})
      localStorage.setItem("currentUser",JSON.stringify(res.data))
      navigate("/")

      console.log(res.data)
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit} >
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Username or Company Name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username or company name"
          onChange={e=>setUsername(e.target.value)}
          value={username}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={e=>setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && error}
    </form>
  </div>
  )
}

export default Login
