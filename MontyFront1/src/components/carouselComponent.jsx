import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.css";

export default function CarouselComponent() {
    return (
        <div>
        <div class="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div className = "render">
                    <img class = "render" src="../pic1.png" />
                </div>
                <div className = "render">
                    <img class = "render" src="../pic2.png" />
                </div>
                <div className = "render">
                    <img class = "render" src="../pic3.png" />
                </div>
            </Carousel>
        </div>
        <div>
            <h1> Welcome to MontyApp </h1><br/>
            <h5> To start your experience, please click the Start button</h5><br/>
        </div>
        <div class="text-center">
          <Link to="/add" className="btn btn-primary">
            Start
          </Link>
        </div>
        <br />
        <br />
        </div>
    );
}