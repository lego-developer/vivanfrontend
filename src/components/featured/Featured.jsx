import React, { useState } from 'react'
import "./Featured.scss"

const Featured = () => {

    const [input, setInput] = useState("")
    const handleSubmit = ()=>{
        console.log("hello")
    }

    return (
        <div className='featured' >
            <div className="container">
                <div className="left">
                    <h1>Find the perfect company services for you business</h1>
                    <div className="search">
                        <div className="searchInput">
                            <img src="./img/search.png" alt="" />
                            <input type="text" name="" onChange={e => setInput(e.target.value)} id="" placeholder='search for companies or services' />
                        </div>
                        <button onClick={handleSubmit} >Search</button>
                    </div>
                    <div className="popular">
                        <span>Popular : </span>
                        <button>Cloud Computing</button>
                        <button>AI & ML</button>
                        <button>UI/UX Design</button>
                        <button>AR & VR</button>
                        <button>Cybersecurity </button>
                    </div>
                </div>
                {/* <div className="right">
                    <img src="./img/men1.jpg" alt="" srcset="" />
                </div> */}
            </div>
        </div>
    )
}

export default Featured
