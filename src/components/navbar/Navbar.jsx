import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link, useLocation } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)

    const { pathname } = useLocation()

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", isActive)

        return () => {
            window.removeEventListener("scroll", isActive)
        }

    }, [])

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout")
            localStorage.setItem("currentUser", null)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        < div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link className='link' to="/" >
                        <span className="text">VIVAN</span>
                    </Link>
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <span>Vivan Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <Link to="/login" className='link' >
                    { !currentUser && <span>Sign in</span>}
                    </Link>
                    {/* {!currentUser?.isSeller && <span>Become a Seller</span>} */}
                    {/* {currentUser ? currentUser.isSeller ? <span>Company</span> : <span>Buyer</span> : <span></span>   } */}
                    {!currentUser && <Link to="/register" className='link'><button  >Join</button></Link>}
                    {currentUser && (
                        <div onClick={() => setOpen(!open)} className="user">
                            <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && (<div className="options">
                                {
                                    currentUser?.isSeller && (
                                        <>
                                            <Link className='link' to="/mygigs">Gigs</Link>
                                            <Link className='link' to="/add">Add new Gig</Link >

                                        </>
                                    )
                                }
                                <Link className='link' to="/orders">Orders</Link >
                                <Link className='link' to="/messages">Messages</Link>
                                <Link className='link' onClick={handleLogout}>Logout</Link>
                            </div>)}
                        </div>
                    )}
                </div>
            </div>
            {(active || pathname !== "/") && (
                <>
                    <hr />
                    <div className="menu">
                        <Link className='link' to="/gigs" >Graphics & Design</Link>
                        <Link className='link' to="/gigs" >Video & Animation</Link>
                        <Link className='link' to="/gigs" >Writing & Translation</Link>
                        <Link className='link' to="/gigs" >AI Services</Link>
                        <Link className='link' to="/gigs" >Digital Marketing</Link>
                        <Link className='link' to="/gigs" >Web Development</Link>
                        <Link className='link' to="/gigs" >Programming & Tech</Link>
                        <Link className='link' to="/gigs" >Business</Link>
                    </div>
                    <hr />
                </>
            )}
        </div>
    )
}

export default Navbar
