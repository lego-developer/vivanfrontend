import React from 'react'
import "./GigCard.scss"
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';


const GigCard = ({ item }) => {


    const { isLoading, error, data } = useQuery({
        queryKey: ['gigUser',item.userId],
        queryFn: () =>
            newRequest.get(`/users/${item.userId}`).then((res) => { return res.data })
    })
    
    // console.log(data._id)
    // console.log("hello")
    // console.log(item.userId)

    return (
        <Link to={`/gig/${item._id}`} className='link' >
            <div className='gigCard' >
                <img src={item.cover} alt="" />
                <div className="info">
                    {isLoading ? "loading..." : error ? "something went wrong" : <div className="user">
                        <img src={data.img || "/img/noavatar.jpg"} alt="" />
                        <span>{data.username}</span>
                    </div>}
                    <p>{item.desc}</p>
                    <div className="star">
                        {/* <img src="./img/star.png" alt="" /> */}
                        <StarIcon style={{color:"orange"}} />
                        <span>{!isNaN(Math.round(item.totalStars / item.starNumber)) && Math.round(item.totalStars / item.starNumber)}</span>
                    </div>
                </div>
                <hr />
                <div className="details">
                    {/* <img src="./img/heart.avif" alt="" /> */}
                    <FavoriteIcon style={{color:"gray"}} />

                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>${item.price}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GigCard





// import React, { useMemo } from 'react';
// import "./GigCard.scss";
// import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import newRequest from '../../utils/newRequest';

// const GigCard = ({ item }) => {
//     const { userId } = item;

//     const { isLoading, error, data } = useQuery({
//         queryKey: ['gigUser', userId], // Include userId in the queryKey
//         queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data)
//     });

//     // Memoize the result of useQuery
//     const queryResult = useMemo(() => ({ isLoading, error, data }), [isLoading, error, data]);

//     return (
//         <Link to={`/gig/${item._id}`} className='link' >
//             <div className='gigCard' >
//                 <img src={item.cover} alt="" />
//                 <div className="info">
//                     {queryResult.isLoading ? "loading..." : queryResult.error ? "something went wrong" :
//                         <div className="user">
//                             <img src={queryResult.data.img || "/img/noavatar.jpg"} alt="" />
//                             <span>{queryResult.data.username}</span>
//                         </div>
//                     }
//                     <p>{item.desc}</p>
//                     <div className="star">
//                         <img src="./img/star.png" alt="" />
//                         <span>{!isNaN(Math.round(item.totalStars / item.starNumber)) && Math.round(item.totalStars / item.starNumber)}</span>
//                     </div>
//                 </div>
//                 <hr />
//                 <div className="details">
//                     <img src="./img/heart.avif" alt="" />
//                     <div className="price">
//                         <span>STARTING AT</span>
//                         <h2>${item.price}</h2>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// export default GigCard;


