import React from 'react'
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/slide/Slide'
import { cards, projects } from '../../data'
import CatCard from '../../components/catCard/CatCard'

import "./Home.scss"
import ProjectCard from '../../components/projectCard/ProjectCard'
import CompCard from '../../components/compCard/CompCard'

// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const Home = () => {


  const responsive2 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const responsive1 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



  return (
    <div className='home' >
      <Featured />
      <TrustedBy />
      <CompCard />


      {/* <Slide slidesToShow={6} arrowsScroll={5} >
        {cards.map(card => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide> */}


      <Slide
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive1}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {cards.map(card => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>;



      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Elevate Your Business with Our Digital Solutions</h1>
            <div className="title">
              <img src="./img/check.png" alt="" srcset="" />
              Explore Quality Services
            </div>
            <p>Discover tailored solutions for every budget. Unlock excellence with expert delivery. </p>
            <div className="title">
              <img src="./img/check.png" alt="" srcset="" />
              Budget-Friendly Solutions
            </div>
            <p>Find high-quality digital services at affordable prices. Browse our selection for the perfect fit.</p>
            <div className="title">
              <img src="./img/check.png" alt="" srcset="" />
              Excellence, Within Reach
            </div>
            <p>Experience top-notch digital services designed for your needs. Expect nothing less than precision and expertise.</p>
          </div>
          <div className="item">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/tT2puL7IZOE" frameborder="0" allowfullscreen></iframe>


          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>Boost Your Business with Vivan Solutions</h1>
            {/* <h1>A business solution designed for teams</h1> */}
            <p>Upgrade to a curated experience packed with tools and benefits.</p>
            <div className="title">
              <img src="./img/check.png" alt="" srcset="" />
              Connect with Companies with Proven Expertise
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" srcset="" />
              Streamline Your Workflow with Advanced Solutions
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" srcset="" />
              Elevate Your Business Performance with Vivan Solutions
            </div>
            <button>Explore Business</button>
          </div>
          <div className="item">
            <img src="/img/men3.jpg" alt="" srcset="" />

          </div>
        </div>
      </div>

      {/* <Slide slidesToShow={4} arrowsScroll={5} >
        {projects.map(project => (
          <ProjectCard item={project} key={project.id} />
        ))}
      </Slide> */}
      <br /><br />


      <Slide
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive2}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {projects.map(project => (
          <ProjectCard item={project} key={project.id} />
        ))}
      </Slide>;


    </div>
  )
}

export default Home
