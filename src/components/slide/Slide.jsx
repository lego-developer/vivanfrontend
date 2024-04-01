import React from 'react'
import "./Slide.scss"
// import Slider from 'infinite-react-carousel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



// const Slide = ({ children, slidesToShow, arrowsScroll }) => {
//     return (
//         <div className='slide' >
//             <div className="container">
//                 {/* <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}   >
//                     {children}
//                 </Slider> */}



//             </div>
//         </div>
//     )
// }

// export default Slide


const Slide = ({ children,
    swipeable,
    draggable,
    showDots,
    responsive,
    ssr,
    infinite,
    autoPlaySpeed,
    keyBoardControl,
    transitionDuration,
    containerClass,
    removeArrowOnDeviceType,
    dotListClass,
    itemClass,
}) => {
    return (
        <div className='slide' >
            <div className="container">
                <Carousel 
                    swipeable={swipeable}
                    draggable={draggable}
                    showDots={showDots}
                    responsive={responsive}
                    ssr={ssr}
                    infinite={infinite}
                    autoPlaySpeed={autoPlaySpeed}
                    keyBoardControl={keyBoardControl}
                    transitionDuration={transitionDuration}
                    containerClass={containerClass}
                    removeArrowOnDeviceType={removeArrowOnDeviceType}
                    dotListClass={dotListClass}
                    itemClass={itemClass}
                >
                    {children}
                </Carousel>;



            </div>
        </div>
    )
}

export default Slide