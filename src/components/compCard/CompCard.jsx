import React from 'react'
import "./CompCard.scss"
import { Link } from 'react-router-dom'
import { gigs } from '../../data'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'




const CompCard = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['cards'],
        queryFn: () =>
            newRequest.get(`/users/sellers//`).then((res) => { return res.data })
    })


    return (

        <div className='companies' >
            <hr />
            <center><h1>COMPANIES</h1></center>
            {isLoading ? "Loading..." : error ? "something went wrong" : (<div className='cards' >
                {data.map(seller => (<Link to={`/gigs/?userId=${seller._id}`} className='link' >
                    <div className='compCard' >
                        <img src={seller.img} alt="" />
                        <div className="info">
                            <div className="user">
                                {/* <img src={item.pp} alt="" /> */}
                                <span>{seller.username}</span>
                            </div>
                        </div>

                    </div>
                </Link>))}
            </div>)}
            <hr />
        </div>
    )
}

export default CompCard





// import React from 'react'
// import "./CompCard.scss"
// import { Link } from 'react-router-dom'
// import { gigs } from '../../data'

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const CompCard = () => {

//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 5
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 4,
//             slidesToSlide: 1
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 2
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1
//         }
//     };

//     return (
//         <div className='companies' >
//             <hr />
//             <center><h1>COMPANIES</h1></center>
//             <div className='cards' >
//                 {/* {gigs.map(gig => (<Link to="/gigs/?userId=65d0a5aac5a92bb75d874c93" className='link' >
//                     <div className='compCard' >
//                         <img src={gig.img} alt="" />
//                         <div className="info">
//                             <div className="user">
//                                 <span>{gig.username}</span>
//                             </div>
//                         </div>

//                     </div>
//                 </Link>))} */}

//                 <Carousel
//                     swipeable={false}
//                     draggable={false}
//                     showDots={true}
//                     responsive={responsive}
//                     ssr={true} // means to render carousel on server-side.
//                     infinite={true}
//                     // autoPlay={this.props.deviceType !== "mobile" ? true : false}
//                     autoPlaySpeed={1000}
//                     keyBoardControl={true}
//                     customTransition="all .5"
//                     transitionDuration={500}
//                     containerClass="carousel-container"
//                     removeArrowOnDeviceType={["tablet", "mobile"]}
//                     // deviceType={this.props.deviceType}
//                     dotListClass="custom-dot-list-style"
//                     itemClass="carousel-item-padding-40-px"
//                 >
//                 {gigs.map(gig => (<Link to="/gigs/?userId=65d0a5aac5a92bb75d874c93" className='link' >
//                     <div className='compCard' >
//                         <img src={gig.img} alt="" />
//                         <div className="info">
//                             <div className="user">
//                                 <span>{gig.username}</span>
//                             </div>
//                         </div>

//                     </div>
//                 </Link>))}
//                 </Carousel>;

//             </div>
//             <hr />
//         </div>
//     )
// }

// export default CompCard
