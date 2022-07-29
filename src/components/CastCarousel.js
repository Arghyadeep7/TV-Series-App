import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import noPictureFound from "../assets/No_Picture.jpg"

const handleDragStart = (event) => event.preventDefault();

const CastCarousel = (props) => {

  const items = props.cast.map((actor) => (
    <div style={{display: "flex", flexDirection: "column", objectFit: "contain", padding: "10px"}}>
      <img 
        src={actor.profile_path?`https://image.tmdb.org/t/p/original${actor.profile_path}`:noPictureFound}
        alt={actor.name}
        onDragStart={handleDragStart}
        style={{borderRadius:"10px", maxHeight:'175px', maxWidth:"150px"}}
      />
      {actor.name && <b style={{paddingTop:"5px"}}>{actor.name}</b>}
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 8,
    },
  };

  return (
    <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        autoPlay={true}
        autoPlayInterval={1000}
        responsive={responsive}
        items={items}
    />
  );
};

export default CastCarousel;