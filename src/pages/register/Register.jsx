import React, { useState } from 'react'
import "./Register.scss"
// import axios from 'axios'
import upload from '../../utils/Upload'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [active, setActive] = useState(false)
  // const [seller, setSeller] = useState(null)

  const [file, setFile] = useState(null)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }



  const handleSeller = (e) => {
    setUser({})
    setUser((prev) => {
      return { ...prev, isSeller: e === 'user' ? false : true }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    
    const url = await upload(file)

    try {
      await newRequest.post("/auth/register",{...user,img:url})
      navigate("/")

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='register' >
      <div className="container">
        <div className="buttons">
          <button onClick={e => { setActive(false); handleSeller('user') }}  >USER REGISTER</button>
          <br />
          <button onClick={e => { setActive(true); handleSeller('company') }} >COMPANY REGISTER</button>
        </div>
        <div className='forms' >

          {active ?
            <form className="login-form" onSubmit={handleSubmit}  >
              <h2 >COMPANY REGISTER</h2>
              <div className="form-group">
                <label htmlFor="username">Company Name</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your  company name"
                  onChange={handleChange}
                  value={user.username ? user.username : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={user.email ? user.email : ""}
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
                  onChange={handleChange}
                  value={user.password ? user.password : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone no.</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={user.phone ? user.phone : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Photo</label>
                <input
                  type="file"
                  onChange={e => setFile(e.target.files[0])}
                // onChange={e=>setUsername(e.target.value)}
                // value={username}
                // required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="country"
                  onChange={handleChange}
                  value={user.country ? user.country : ""}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea rows={2} name='desc' onChange={handleChange} value={user.desc ? user.desc : ""} cols={41} ></textarea>
              </div>
              <button type="submit">Register</button>

            </form>
            :
            <form className="login-form" onSubmit={handleSubmit}  >
              <h2 >USER REGISTER</h2>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your  company name"
                  onChange={handleChange}
                  value={user.username ? user.username : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={user.email ? user.email : ""}
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
                  onChange={handleChange}
                  value={user.password ? user.password : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone no.</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={user.phone ? user.phone : ""}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Photo</label>
                <input
                  type="file"
                  onChange={e => setFile(e.target.files[0])}
                  // onChange={e=>setUsername(e.target.value)}
                  // value={username}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="country"
                  onChange={handleChange}
                  value={user.country ? user.country : ""}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea rows={2} name='desc' onChange={handleChange} value={user.desc ? user.desc : ""} cols={41} ></textarea>
              </div>
              <button type="submit">Register</button>

            </form>

          }

        </div>
      </div>

      {/* <form action="" onSubmit={handleSubmit} >
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button type="submit">register</button>
      </form> */}

    </div>
  )
}

export default Register
