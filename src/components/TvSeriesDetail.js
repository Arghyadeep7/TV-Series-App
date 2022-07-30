import axios from "axios";
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import noPosterFound from "../assets/No_Poster.jpg";
import CarouselComponent from "./CarouselComponent";
import CastCarousel from "./CastCarousel";
import TvSeriesList from "./TvSeriesList";

import styles from "./TvSeriesDetail.module.css";

const TvSeriesDetail = () => {
    const [tvSeriesData, setTvSeries] = useState([]);
    const [images, setImages] = useState([]);
    const [count, setCount]= useState(1);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading]=useState(true);
    const [cast, setCast]=useState([]);
    const [videos, setVideos]=useState([]);
    const { id } = useParams();

    const navigate=useNavigate();

    const countHandler=()=>{
        setCount(count+1);
    }

    const Undefined=()=>{
        navigate("/error");
    };

    const fetchTvSeries=async()=>{

        if(count===1){

            setLoading(true);

            try{
                const data=await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,videos,credits,similar`)
                .then(res => res.data);

                setTvSeries(data);

                setImages(data.images.backdrops);

                const actorData=data.credits.cast.filter((cast)=>{
                    return cast.known_for_department.toLowerCase()==="acting";
                });

                setCast(actorData);

                setVideos(data.videos.results);

                setSimilar(data.similar.results);

            }catch(error){
                console.log(error);

                Undefined();

                return;
            }

            setLoading(false);
        }else{
            try{

                const similarTvSeriesData=await axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&page=${count}`)
                .then(res => res.data);
    
                setSimilar(similar.concat(similarTvSeriesData.results));
    
            }catch(error){
                console.log(error);
    
                Undefined();
    
                return;
            }
        }
    };

    useEffect(()=>{
        fetchTvSeries();
        // eslint-disable-next-line
    },[count]);

    return (
        <Row style={{marginTop:"10px"}}>
            {
                loading?
                <h3><i className="fas fa-hourglass-half" />&nbsp;Loading...</h3>
                :
                <>
                    <Row style={{justifyContent:"center", marginBottom:"20px"}}>

                        <Col md={4} className={styles.poster}>
                            <img
                                className="d-block w-100"
                                src={tvSeriesData.poster_path?`https://image.tmdb.org/t/p/original${tvSeriesData.poster_path}`:noPosterFound}
                                alt={tvSeriesData.id}
                                style={{border:"2px solid white"}}
                            />
                        </Col>

                        <Col md={8}>

                            {images && <CarouselComponent items={images}/>}

                            <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"40px"}}>

                                {tvSeriesData.homepage && <Button href={tvSeriesData.homepage} variant="primary" target="_blank" ><i className="fas fa-play-circle"></i>&nbsp;Website</Button>}
                                {!tvSeriesData.homepage && <Button variant="primary" disabled><i className="fas fa-times-circle"></i>&nbsp;Website</Button>}
                                
                                {tvSeriesData.seasons.length!==0 && 
                                    <DropdownButton
                                    variant="outline-primary"
                                    title="Season"
                                    id="input-group-dropdown-1"
                                    >   
                                        {tvSeriesData.seasons.map((season)=>(
                                            <Dropdown.Item href={`/tv/${id}/season/${season.season_number}`} style={{textAlign: "center"}} key={season.season_number}>Season {season.season_number}</Dropdown.Item>                                            
                                        ))}
                                    </DropdownButton>
                                }

                                {videos.length>0 &&
                                    <DropdownButton
                                        variant="outline-danger"
                                        title="VIDEOS"
                                        id="input-group-dropdown-1"
                                    >
                                    {videos.map((video)=>(
                                        <Dropdown.Item key={video.key} target="_blank" href={`https://www.youtube.com/watch?v=${video.key}`}>{video.name}</Dropdown.Item>
                                    ))}
                                    </DropdownButton>
                                }

                            </div>
                            
                        </Col>

                    </Row>

                    <br />

                    <Row>
                        <Col md={4}>

                            <h2><b className={styles.title}>{tvSeriesData.name}</b></h2>

                            {tvSeriesData.genres.length!==0 && 
                                <div>
                                    {    
                                        tvSeriesData.genres.map( (genre) =>(
                                        <span key={genre.name}>
                                            <Badge pill bg="info">{genre.name}</Badge>&nbsp;&nbsp;
                                        </span>
                                        ))
                                    }
                                </div>
                            }  

                            {tvSeriesData.genres.length===0 && <Badge pill bg="info">No genre Available</Badge>}          

                            {tvSeriesData.spoken_languages.length!==0 &&
                                <div style={{marginTop:"10px"}}>
                                {
                                    tvSeriesData.spoken_languages.map((lang)=>(
                                    <span key={lang.english_name}>
                                        <Badge style={{margin:"5px"}}>{lang.english_name}</Badge>&nbsp;&nbsp;
                                    </span>
                                    ))
                                }
                                </div>
                            }

                            {tvSeriesData.spoken_languages.length===0 && <Badge>No language Available</Badge>}                        

                            {tvSeriesData.number_of_seasons && <h5 className={styles.font_manager}>Total Seasons : {tvSeriesData.number_of_seasons}</h5>}

                            {tvSeriesData.number_of_episodes && <h5 className={styles.font_manager}>Total Episodes : {tvSeriesData.number_of_episodes}</h5>}

                            {tvSeriesData.status && <h5 className={styles.font_manager}>Status : {tvSeriesData.status}</h5>}
                            
                        </Col>
                        <Col md={8}>

                            <Col style={{display:"flex", justifyContent: "flex-start"}}>
                                {tvSeriesData.vote_count!=="" && <h5 className={styles.font_manager} style={{color:"goldenrod", marginRight:'50px'}}><i className="fa-solid fa-star" />&nbsp;{tvSeriesData.vote_average}&nbsp;&nbsp;({tvSeriesData.vote_count} votes)</h5>}
                                {tvSeriesData.episode_run_time[0] && <h5 className={styles.font_manager}><i className="fas fa-clock" />&nbsp;{tvSeriesData.episode_run_time[0]} mins.</h5>}
                            </Col>

                            {tvSeriesData.tagline!=="" && <h5 className={styles.font_manager}><i><b>"{tvSeriesData.tagline}"</b></i></h5>}
                            {tvSeriesData.tagline==="" && <h5 className={styles.font_manager}><i><b>No tagline available</b></i></h5>}

                            {tvSeriesData.overview!=="" && <h5 className={styles.font_manager}>{tvSeriesData.overview}</h5>}
                            {tvSeriesData.overview==="" && <h5 className={styles.font_manager}>No overview available</h5>}

                            {tvSeriesData.next_episode_to_air!==null && 
                                <Row style={{color:'red'}}>
                                    <Col xs={6}>
                                        <h5 className={styles.font_manager}>Next airing on : {tvSeriesData.next_episode_to_air.air_date}</h5>
                                    </Col>
                                    <Col xs={6}>
                                        <h5 className={styles.font_manager}>Episode Number : {tvSeriesData.next_episode_to_air.episode_number}</h5>
                                    </Col>
                                </Row>
                            }

                            <Row>
                                <Col xs={6}>
                                    {tvSeriesData.first_air_date && <h5 className={styles.font_manager}>First aired on : {tvSeriesData.first_air_date}</h5>}
                                    {!tvSeriesData.first_air_date && <h5 className={styles.font_manager}>Releasing date not available!</h5>}
                                </Col>
                                <Col xs={6}>
                                    {tvSeriesData.last_air_date && <h5 className={styles.font_manager}>Last aired on : {tvSeriesData.last_air_date}</h5>}
                                    {!tvSeriesData.last_air_date && <h5 className={styles.font_manager}>Airing date not available!</h5>}
                                </Col>
                            </Row>


                        </Col>

                    </Row>

                    {cast.length>0 &&
            
                        <>
                            <h3><Badge bg="secondary">Series Cast</Badge>&nbsp;&nbsp;</h3>
                            <CastCarousel cast={cast} />
                        </>
                    }
                    

                    <Row>
                        <h3><Badge pill bg="primary" style={{textTransform: "uppercase"}}>Similar</Badge></h3>
                        <TvSeriesList items={similar} />
                    </Row>

                    {similar.length > 0 && 
                        <div style={{display:"flex",justifyContent: "center"}}>
                            <Button onClick={countHandler} variant="outline-primary" style={{margin:"20px"}}  size="lg">Load More</Button>
                        </div>
                    }
                    
                </>
            }
        </Row>
    )
}

export default TvSeriesDetail;