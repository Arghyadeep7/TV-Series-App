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

import styles from "./TvSeriesDetail.module.css";

const SeasonComponent = () => {
    const [tvSeriesData, setTvSeries] = useState([]);
    const [tvSeasonData, setTvSeason] = useState([]);
    const [images, setImages] = useState([]);
    const [poster, setPoster] = useState();
    const [cast, setCast]=useState([]);
    const [videos, setVideos]=useState("");
    const [trailer, setTrailer] = useState("");
    const [episodes, setEpisodes]=useState([]);
    const [loading, setLoading]=useState(true);

    const {id, season_num} = useParams();

    const navigate=useNavigate();

    const Undefined=()=>{
        navigate("/error");
    };

    const fetchTvSeries=async()=>{

        setLoading(true);

        try{

            const data=await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,videos,credits`)
            .then(res => res.data);

            setTvSeries(data);

            setPoster(data.poster_path);




            const seasonData=await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season_num}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,videos,credits`)
            .then(res => res.data);

            setTvSeason(seasonData);

            setImages(seasonData.images.posters);

            const actorData=seasonData.credits.cast.filter((cast)=>{
                return cast.known_for_department.toLowerCase()==="acting";
            });

            setCast(actorData);

            if(seasonData.videos.results.length > 0){

                const trailerData=seasonData.videos.results.filter((trailer)=>{
                    return trailer.name.toLowerCase().includes("trailer");
                });
            
                if(trailerData.length > 0) {
                    setTrailer(trailerData[0].key);
                }else{
                    setTrailer("");
                }
            }

            setEpisodes(seasonData.episodes);

            setVideos(seasonData.videos.results);

        }catch(error){
            console.log(error);

            Undefined();

            return;
        }

        setLoading(false);
    
    };

    useEffect(()=>{
        fetchTvSeries();
        // eslint-disable-next-line
    },[]);

    return (
        <>
            {
                loading?
                <h3><i className="fas fa-hourglass-half" />&nbsp;Loading...</h3>
                :
                <>
                    <Row style={{justifyContent: 'center'}}>

                        <Col xs={10} md={4} style={{marginTop:"10px"}}>

                            {images.length!==0 && <CarouselComponent items={images}/>}
                            {images.length ===0 && 
                                <img
                                    className="d-block w-100"
                                    src={poster?`https://image.tmdb.org/t/p/original${poster}`:noPosterFound}
                                    alt={`https://image.tmdb.org/t/p/original${poster}`}
                                />
                            }

                            <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"20px"}}>

                            {trailer && <Button href={`https://www.youtube.com/watch?v=${trailer}`} target="_blank" variant="danger" style={{backgroundColor:"red"}}><i className="fab fa-youtube" />&nbsp;Trailer</Button>}
                            {!trailer && <Button variant="danger" style={{backgroundColor:"red"}} disabled><i className="fas fa-times-circle"/>&nbsp;Trailer</Button>}

                            {tvSeriesData.homepage && <Button href={tvSeriesData.homepage} variant="primary" target="_blank" ><i className="fas fa-play-circle"></i>&nbsp;Website</Button>}
                            {!tvSeriesData.homepage && <Button variant="primary" disabled><i className="fas fa-times-circle"></i>&nbsp;Website</Button>}

                            {tvSeriesData.seasons.length!==0 && 
                                <DropdownButton
                                    variant="outline-primary"
                                    title="Season"
                                    id="input-group-dropdown-1"
                                >
                                    {tvSeriesData.seasons.map((season)=>(
                                        <>
                                            {season.season_number!=season_num &&
                                                <Dropdown.Item href={`/tv/${id}/season/${season.season_number}`} style={{textAlign: "center"}} key={season.season_number}>Season {season.season_number}</Dropdown.Item>                                            
                                            }
                                        </>
                                    ))}
                                </DropdownButton>
                            }

                            </div>

                        </Col>
                        <Col md={1}></Col>
                        <Col xs={12} md={7} style={{marginTop:"10px"}}>

                            <h2><b className={styles.title}>{tvSeriesData.name}&nbsp;|&nbsp;Season&nbsp;{season_num}</b></h2>

                            {tvSeriesData.genres.length!==0 && 
                                <div>
                                    {    
                                        tvSeriesData.genres.map( (genre) =>(
                                        <span key={genre.name}>
                                            <Badge pill bg="info"><h6>{genre.name}</h6></Badge>&nbsp;&nbsp;
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
                                        <Badge><h6>{lang.english_name}</h6></Badge>&nbsp;&nbsp;
                                    </span>
                                    ))
                                }
                                </div>
                            }

                            {tvSeriesData.spoken_languages.length===0 && <Badge>No language Available</Badge>}                        

                            <Row>
                                <Col xs={7}>
                                    {tvSeasonData.air_date && <h5 className={styles.font_manager}>Released on : {tvSeasonData.air_date}</h5>}
                                </Col>
                                <Col xs={5}>
                                    {episodes.length!==0 && <h5 className={styles.font_manager}>Total Episodes : {episodes.length}</h5>}
                                </Col>
                            </Row>                

                            <div style={{color:'yellow'}}>
                                <h4>Season Overview :</h4>
                                {tvSeasonData.overview!=="" && <h5 className={styles.font_manager}>{tvSeasonData.overview}</h5>}
                                {tvSeasonData.overview==="" && <h5 className={styles.font_manager}>No overview available</h5>}
                            </div>

                            <br />
                            
                            <div style={{display:'flex', justifyContent: 'space-between'}}>
                                
                                {episodes.length>0 && 
                                    <DropdownButton
                                        variant="outline-light"
                                        title="EPISODE"
                                        id="input-group-dropdown-1"
                                    >
                                        {episodes.map((episode)=>(    
                                            <Dropdown.Item key={episode.episode_number} href={`/tv/${id}/season/${tvSeasonData.season_number}/episode/${episode.episode_number}`}>{episode.episode_number}&nbsp;&nbsp;{episode.name}</Dropdown.Item>                                            
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

                            <br />

                            <div style={{color:'red'}}>
                                <h4>Series Overview :</h4>
                                {tvSeriesData.overview!=="" && <h5 className={styles.font_manager}>{tvSeriesData.overview}</h5>}
                                {tvSeriesData.overview==="" && <h5 className={styles.font_manager}>No overview available</h5>}
                            </div>

                        </Col>

                    </Row>

                    <br />
                    
                    {cast.length>0 &&
            
                        <>
                            <h3><Badge bg="secondary">Season&nbsp;{tvSeasonData.season_number} Cast</Badge>&nbsp;&nbsp;</h3>
                            <CastCarousel cast={cast} />
                        </>
                    }
                </>
            }
        </>
    )
}

export default SeasonComponent;