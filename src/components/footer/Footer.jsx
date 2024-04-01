import React from 'react'
import "./Footer.scss"

const Footer = () => {
    return (
        <div className='footer' >
            <div className="container">
                <div className="top">
                    <div className="item">
                        <h2>Categories</h2>
                        <span> Web design</span>
                        <span> Graphic design</span>
                        <span> Logo design</span>
                        <span> Content writing</span>
                        <span> Digital marketing</span>
                        <span> Video production/editing</span>
                        <span> Mobile app development</span>
                        <span> E-commerce solutions</span>
                    </div>
                    <div className="item">
                        <h2>Companies</h2>
                        <span>Accenture</span>
                        <span>TCS</span>
                        <span>Infosys</span>
                        <span>IBM</span>
                        <span>Capgemini</span>
                        <span>Wipro</span>
                        <span>Cognizant</span>
                        <span>HCL Technologies</span>
                    </div>
                    <div className="item">
                        <h2>Quick Links</h2>
                        <span>About Us</span>
                        <span>Services</span>
                        <span>Portfolio</span>

                        <span>Testimonials</span>

                        <span>Pricing</span>
                        <span>Contact Us</span>
                        <span>Blog</span>
                        <span>FAQ</span>
                    </div>
                    <div className="item">
                        <h2>Connect With Us</h2>
                        <span>Facebook</span>
                        <span>X</span>
                        <span>Instagram</span>
                        <span>123 Main Street, City, Country</span>
                        <span>Email: info@example.com</span>
                        <span>Phone: +1234567890</span>
                    </div>

                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <h2>Vivan</h2>
                        <span>Vivan international Ltd. 2024</span>
                    </div>
                    <div className="right">
                        <div className="social">
                            <img src="./img/facebook.png" alt="" />
                            <img src="./img/instagram.png" alt="" />
                            <img src="./img/x.avif" alt="" />
                        </div>
                        <div className="link">
                            <img src="./img/language.png" alt="" />
                            <span>English</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
