import axios from "axios";
import {useState, useEffect} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import CarouselComponent from "./CarouselComponent";
import TvSeriesList from "./TvSeriesList";

const TvSeriesComponent = (props) => {
  const [tvSeries, setTvSeries] = useState([]);
  const [count,setCount]=useState(1);
  const [isLoading, setLoading]=useState(true);
  const [total_pages, setTotalPages]=useState();
  const type = props.type==="trending"?"trending/tv/day":"tv/"+props.type;

  const nextPageHandler=()=>{
    setCount(count+1);
  }

  const previousPageHandler=()=>{
    setCount(count-1);
  };

  const fetchTvSeries=async ()=>{
    try{

      setLoading(true);

      const tvSeriesData=await axios.get(`https://api.themoviedb.org/3/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${count}`)
        .then(res => res.data);

      setTvSeries(tvSeriesData.results);


      setTotalPages(tvSeriesData.total_pages);

      setLoading(false);
      
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTvSeries();
    //eslint-disable-next-line
  }, [type,count]);


  return (
    <>
      {
        isLoading?
          <h3><i className="fas fa-hourglass-half" />&nbsp;Loading...</h3>
        :
        <>
          <h3><Badge pill bg="primary" style={{textTransform: "uppercase"}}>{props.type}</Badge></h3>
          <CarouselComponent items={tvSeries} id=""/>
          <br />
          <h3><Badge pill bg="dark" style={{textTransform: "uppercase"}}>PAGE {count} / {total_pages}</Badge></h3>
          <TvSeriesList items={tvSeries} />
          <div style={{display:"flex", justifyContent:"center"}}>
            {count>1 && <Button onClick={previousPageHandler} variant="outline-warning" style={{margin:"20px"}} size="lg"><i className="fas fa-angle-double-left" />&nbsp;Previous</Button>}
            {count===1 && <Button onClick={previousPageHandler} variant="outline-warning" style={{margin:"20px"}} size="lg" disabled><i className="fas fa-times-circle"/>&nbsp;Previous</Button>}
            {count!==total_pages && <Button onClick={nextPageHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg">Next&nbsp;<i className="fas fa-angle-double-right"/></Button>}
            {count===total_pages && <Button onClick={nextPageHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg" disabled>Next&nbsp;<i className="fas fa-times-circle"/></Button>}
          </div>
        </>
      }
    </>
  );
}

export default TvSeriesComponent;