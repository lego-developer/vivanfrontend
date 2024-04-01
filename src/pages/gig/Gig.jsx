// import { Slider } from 'infinite-react-carousel'
import React from 'react'
import "./Gig.scss"
import newRequest from '../../utils/newRequest'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Reviews from '../../components/reviews/Reviews'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import StarIcon from '@mui/icons-material/Star';
import { CircularProgress } from '@mui/material'


const Gig = () => {

  const { id } = useParams()
  // console.log(id)

  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => { return res.data })
  })

  const userId = data?.userId

  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => { return res.data }),
    enabled: !!userId, // useQuery works only when data is present in line 21
  })

  // console.log(dataUser)

  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 1
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 1,
  //      slidesToSlide: 1
  //   }
  // };


  return (
    <div className='gig' >
      {isLoading ? <CircularProgress style={{marginTop:"30px"}} /> : error ? "something went wrong" : <div className="container">
        <div className="left">
          <span className="breadCrumbs">VIVAN  GRAPHIC & DESIGN</span>
          <h1>{data.title}</h1>


          {isLoadingUser ? <CircularProgress style={{marginTop:"30px"}} /> : errorUser ? "something went wrong" : (<div className="user">
            <img className='pp' src={dataUser.img || "/img/noavatar.jpg"} alt="" />

            <span>{dataUser.username}</span>


            {!isNaN(Math.round(data.totalStars / data.starNumber)) && (
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                  // <img src="/img/star.png" alt="" key={i} />
                  <StarIcon style={{color:"orange"}} />
                ))}
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
              </div>
            )}
          </div>)}

          {/* <Slider slidesToShow={1} arrowsScroll={1} className="slider" >
            <img src="https://t3.ftcdn.net/jpg/02/14/53/92/360_F_214539232_YnUrtuwUEt84gHuU0qG8l7OwZvH4rnPG.jpg" alt="" />
            <img src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051191.jpg?size=626&ext=jpg&ga=GA1.1.1488620777.1708646400&semt=ais" alt="" />
            <img src="https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg" alt="" />
          </Slider> */}

          {/* <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            // itemClass="carousel-item-padding-40-px"
          >
            <img src="https://t3.ftcdn.net/jpg/02/14/53/92/360_F_214539232_YnUrtuwUEt84gHuU0qG8l7OwZvH4rnPG.jpg" alt="" />
            <img src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051191.jpg?size=626&ext=jpg&ga=GA1.1.1488620777.1708646400&semt=ais" alt="" />
            <img src="https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg" alt="" />
          </Carousel>; */}


          <Carousel infiniteLoop  >

            {data.images.map((img) => (
              <div>
                <img src={img} alt="" /> 
                <p className="legend">page1</p>
              </div>
            ))}
            {/* <div>
              <img src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051191.jpg?size=626&ext=jpg&ga=GA1.1.1488620777.1708646400&semt=ais" alt="" />
              <p className="legend">page2</p>
            </div>
            <div>
              <img src="https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg" alt="" />
              <p className="legend">page3</p>
            </div> */}
          </Carousel>



          <h2>About this gig</h2>
          <p>{data.desc}</p>
          {isLoadingUser ?  <CircularProgress style={{marginTop:"30px"}} />: errorUser ? "something went wrong" : (<div className="seller">
            <h2>About the seller</h2>
            <div className="user">
              <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(Math.round(data.totalStars / data.starNumber)) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                      // <img src="/img/star.png" alt="" key={i} />
                  <StarIcon style={{color:"orange"}} />

                    ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Since</span>
                  <span className="desc">2022</span>
                </div>
                <div className="item">
                  <span className="title">Last Delivery</span>
                  <span className="desc">1 week</span>
                </div>
                {/* <div className="item">
      <span className="title">From</span>
      <span className="desc">USA</span>
    </div>
    <div className="item">
      <span className="title">From</span>
      <span className="desc">USA</span>
    </div> */}

              </div>
              <hr />
              <p>{dataUser.desc}</p>
            </div>
          </div>)}

          <Reviews gigId={id} />

        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>${data.price}</h2>
          </div>
          <p>{data.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery </span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revision </span>
            </div>
          </div>
          <div className="features">
            {data.features.map((feature) => (

              <div className="item" key={feature} >
                <img src="/img/tick.png" alt="" />
                <span>{feature}</span>
              </div>

            ))}

          </div>
          <button>Continue</button>
        </div>
      </div>}
    </div>
  )
}

export default Gig












// import { Slider } from 'infinite-react-carousel';
// import React, { useMemo } from 'react';
// import "./Gig.scss";
// import newRequest from '../../utils/newRequest';
// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
// import Reviews from '../../components/reviews/Reviews';

// const Gig = () => {
//   const { id } = useParams();

//   const { isLoading: gigLoading, error: gigError, data: gigData } = useQuery({
//     queryKey: ['gig'],
//     queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data)
//   });


//   // Memoize gig data
//   const memoizedGigData = useMemo(() => gigData, [gigData]);

//   // Fetch user data
//   const { isLoading: userLoading, error: userError, data: userData } = useQuery({
//     queryKey: ['user'],
//     queryFn: () => newRequest.get(`/users/${memoizedGigData?.userId}`).then((res) => res.data),
//     enabled: !!memoizedGigData
//   });

//   // Memoize user data
//   const memoizedUserData = useMemo(() => userData, [userData]);

//   if (gigLoading) return "Loading...";
//   if (gigError) return "Something went wrong fetching gig data.";

//   return (
//     <div className='gig'>
//       <div className="container">
//         <div className="left">
//           <span className="breadCrumbs">VIVAN GRAPHIC & DESIGN</span>
//           <h1>{memoizedGigData.title}</h1>

//           {userLoading ? "Loading..." : userError ? "Something went wrong fetching user data." : (
//             <div className="user">
//               <img className='pp' src={memoizedUserData?.img || "/img/noavatar.jpg"} alt="" />
//               <span>{memoizedUserData?.username}</span>
//               <div className="stars">
//                 {Array(Math.round(memoizedGigData.totalStars / memoizedGigData.starNumber)).fill().map((item, i) => (
//                   <img src="/img/star.png" alt="" key={i} />
//                 ))}
//                 <span>{Math.round(memoizedGigData.totalStars / memoizedGigData.starNumber)}</span>
//               </div>
//             </div>
//           )}

//           <Slider slidesToShow={1} arrowsScroll={1} className="slider" >
//             <img src="https://t3.ftcdn.net/jpg/02/14/53/92/360_F_214539232_YnUrtuwUEt84gHuU0qG8l7OwZvH4rnPG.jpg" alt="" />
//             <img src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051191.jpg?size=626&ext=jpg&ga=GA1.1.1488620777.1708646400&semt=ais" alt="" />
//             <img src="https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg" alt="" />
//           </Slider>

//           <h2>About this gig</h2>
//           <p>{memoizedGigData.desc}</p>

//           {userLoading ? "Loading..." : userError ? "Something went wrong fetching user data." : (
//             <div className="seller">
//               <h2>About the seller</h2>
//               <div className="user">
//                 <img src={memoizedUserData.img || "/img/noavatar.jpg"} alt="" />
//                 <div className="info">
//                   <span>{memoizedUserData.username}</span>
//                   {!isNaN(Math.round(memoizedGigData.totalStars / memoizedGigData.starNumber)) && (
//                     <div className="stars">
//                       {Array(Math.round(memoizedGigData.totalStars / memoizedGigData.starNumber)).fill().map((item, i) => (
//                         <img src="/img/star.png" alt="" key={i} />
//                       ))}
//                       <span>{Math.round(memoizedGigData.totalStars / memoizedGigData.starNumber)}</span>
//                     </div>
//                   )}
//                   <button>Contact Me</button>
//                 </div>
//               </div>
//               <div className="box">
//                 <div className="items">
//                   <div className="item">
//                     <span className="title">From</span>
//                     <span className="desc">{memoizedUserData.country}</span>
//                   </div>
//                   <div className="item">
//                     <span className="title">Since</span>
//                     <span className="desc">2022</span>
//                   </div>
//                   <div className="item">
//                     <span className="title">Last Delivery</span>
//                     <span className="desc">1 week</span>
//                   </div>
//                   <div className="item">
//                     <span className="title">From</span>
//                     <span className="desc">USA</span>
//                   </div>


//                 </div>
//                 <hr />
//                 <p>{memoizedGigData.desc}</p>
//               </div>
//             </div>
//           )}

//           <Reviews gigId={id} />
//         </div>

//         <div className="right">
//           <div className="price">
//             <h3>{memoizedGigData.shortTitle}</h3>
//             <h2>${memoizedGigData.price}</h2>
//           </div>
//           <p>{memoizedGigData.shortDesc}</p>
//           <div className="details">
//             <div className="item">
//               <img src="/img/clock.png" alt="" />
//               <span>{memoizedGigData.deliveryTime} Days Delivery </span>
//             </div>
//             <div className="item">
//               <img src="/img/recycle.png" alt="" />
//               <span>{memoizedGigData.revisionNumber} Revision </span>
//             </div>
//           </div>
//           <div className="features">
//             {memoizedGigData.features.map((feature) => (

//               <div className="item" key={feature} >
//                 <img src="/img/tick.png" alt="" />
//                 <span>{feature}</span>
//               </div>

//             ))}

//           </div>
//           <button>Continue</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Gig;
