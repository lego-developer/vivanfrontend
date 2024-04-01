import React from 'react'
import "./Review.scss"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import StarIcon from '@mui/icons-material/Star';

const Review = ({ review }) => {


    const { isLoading, error, data } = useQuery({
        queryKey: ['reviewUser',review.userId],
        queryFn: () =>
            newRequest.get(`/users/${review.userId}`).then((res) => { return res.data })
    })


    return (
        <div className="review">
            {isLoading ? "Loading..." : error ? "Something went wrong" : (<div className="user">
                <img className='pp' src={data.img || "/img/noavatar.jpg"} alt="" />
                <div className="info">
                    <span>{data.username}</span>
                    <div className="country">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png" alt="" />
                        <span>{data.country}</span>
                    </div>
                </div>
            </div>)}

            <div className="stars">
                {Array(review.star).fill().map((item, i) => (
                    // <img src="/img/star.png" alt="" />
                  <StarIcon style={{color:"orange"}} />

                ))}
                <span>{review.star}</span>
            </div>

            <p>{review.desc}</p>
            <div className="helpful">
                <span>Helpful</span>
                <img src="https://cdn1.iconfinder.com/data/icons/logos-and-brands-3/512/94_Dislike_logo_logos-512.png" alt="" />
                <span>Yes</span>
                <img src="https://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png" alt="" />
                <span>No</span>

            </div>
        </div>
    )
}

export default Review




// import React, { useMemo } from 'react';
// import "./Review.scss";
// import { useQuery } from '@tanstack/react-query';
// import newRequest from '../../utils/newRequest';

// const Review = ({ review }) => {
//     const { isLoading, error, data } = useQuery({
//         queryKey: ['reviewUser', review.userId], // Include review.userId in the queryKey
//         queryFn: () => newRequest.get(`/users/${review.userId}`).then((res) => res.data)
//     });

//     // Memoize the result of useQuery
//     const queryResult = useMemo(() => ({ isLoading, error, data }), [isLoading, error, data]);
//     // console.log(queryResult)

//     return (
//         <div className="review">
//             {queryResult.isLoading ? "Loading..." : queryResult.error ? "Something went wrong" : (
//                 <div className="user">
//                     <img className='pp' src={queryResult.data.img || "/img/noavatar.jpg"} alt="" />
//                     <div className="info">
//                         <span>{queryResult.data.username}</span>
//                         <div className="country">
//                             <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png" alt="" />
//                             <span>{queryResult.data.country}</span>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <div className="stars">
//                 {Array(review.star).fill().map((item, i) => (
//                     <img key={i} src="/img/star.png" alt="" />
//                 ))}
//                 <span>{review.star}</span>
//             </div>

//             <p>{review.desc}</p>
//             <div className="helpful">
//                 <span>Helpful</span>
//                 <img src="https://cdn1.iconfinder.com/data/icons/logos-and-brands-3/512/94_Dislike_logo_logos-512.png" alt="" />
//                 <span>Yes</span>
//                 <img src="https://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png" alt="" />
//                 <span>No</span>
//             </div>
//         </div>
//     );
// }

// export default Review;
