import React from 'react';
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import styles from "./CarouselComponent.module.css";

import noImageFound from "../assets/No_Image.png";

const CarouselComponent = (props) => {

  if(props.items.length === 0){
    return (
      <Carousel controls={false} indicators={false}>
        <Carousel.Item style={{border:"2px solid white"}}>
          <img className="d-block w-100" src={noImageFound} alt="No Images Available"/>
        </Carousel.Item>
      </Carousel>
    );
  }

  if(props.items.length === 1){
    return (
      <Carousel controls={false} indicators={false}>
        <Carousel.Item style={{border:"2px solid white"}}>
          <img className="d-block w-100" src={`https://image.tmdb.org/t/p/original${props.items[0].file_path}`} alt="No Images Available"/>
        </Carousel.Item>
      </Carousel>
    );
  }

  
  return (
    <Carousel> 
      {
        props.items.map((tvSeries)=>(
            <Carousel.Item key={tvSeries.file_path || tvSeries.backdrop_path} style={{position: 'relative', border:"2px solid white"}} >
              {tvSeries.id && 
                <Link to={`/tv/${tvSeries.id}`}>
                  <img
                      className="d-block w-100"
                      src={tvSeries.backdrop_path?`https://image.tmdb.org/t/p/original${tvSeries.backdrop_path}`:noImageFound}
                      alt={`https://image.tmdb.org/t/p/original${tvSeries.backdrop_path}`}
                  />
                  <Carousel.Caption>
                    <span className={styles.captionTitle}>{tvSeries.name}&nbsp;<br /></span>
                    <p className={styles.caption}>{tvSeries.overview}</p>
                  </Carousel.Caption>
                  <div className={styles.rating}>
                    <h5><i className="fa-solid fa-star" style={{color:"goldenrod"}}/>&nbsp;{tvSeries.vote_average}</h5>
                  </div>
                </Link>
              }
              {!tvSeries.id && 
                <img
                    className="d-block w-100"
                    src={tvSeries.file_path?`https://image.tmdb.org/t/p/original${tvSeries.file_path}`:noImageFound}
                    alt={`https://image.tmdb.org/t/p/original${tvSeries.file_path}`}
                />
              }
            </Carousel.Item>
        ))
      }
    </Carousel>
  )
}

export default CarouselComponent;