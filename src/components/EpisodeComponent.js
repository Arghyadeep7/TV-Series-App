import axios from "axios";
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import noImageFound from "../assets/No_Image.png";
import CarouselComponent from "./CarouselComponent";
import CastCarousel from "./CastCarousel";

import styles from "./TvSeriesDetail.module.css";

const SeasonComponent = () => {
    const [episodeData, setEpisodeData] = useState([]);
    const [images, setImages] = useState([]);
    const [cast, setCast]=useState([]);
    const [videos, setVideos]=useState("");
    const [loading, setLoading]=useState(true);

    const {id, season_num, episode_num} = useParams();

    const navigate=useNavigate();

    const Undefined=()=>{
        navigate("/error");
    };

    const fetchEpisode=async()=>{

        setLoading(true);

        try{
            const data=await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season_num}/episode/${episode_num}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,videos,credits`)
            .then(res => res.data);

            setEpisodeData(data);

            setImages(data.images.stills);

            const actorData=data.credits.cast.filter((cast)=>{
                return cast.known_for_department.toLowerCase()==="acting";
            });

            setCast(actorData.concat(data.guest_stars));

            setVideos(data.videos.results);

        }catch(error){
            console.log(error);

            Undefined();

            return;
        }

        setLoading(false);
    
    };

    useEffect(()=>{
        fetchEpisode();
        // eslint-disable-next-line
    },[]);

    return (
        <>
            {
                loading?
                <h3><i className="fas fa-hourglass-half" />&nbsp;Loading...</h3>
                :
                <>
                    <Row >

                        <Col md={5} style={{marginTop:"10px"}}>

                            {images.length!==0 && <CarouselComponent items={images}/>}

                            {images.length ===0 && 
                                <img
                                    className="d-block w-100"
                                    src={noImageFound}
                                    alt="No Images Found"
                                />
                            }

                        </Col>
                        <Col xs={12} md={7} style={{marginTop:"10px"}}>

                            <h2><b className={styles.title}>{episodeData.name}</b></h2>

                            {episodeData.air_date && <h5 className={styles.font_manager}>Aired on : {episodeData.air_date}</h5>}

                            <Row>
                                <Col xs={6}>
                                    <h4>Episode : {episodeData.episode_number}</h4>
                                </Col>
                                <Col xs={6}>
                                    <h4>Season : {episodeData.season_number}</h4>
                                </Col>
                            </Row>

                            <div style={{display:"flex", justifyContent: "flex-start"}}>
                                <h5 className={styles.font_manager} style={{color:"goldenrod", marginRight:'50px'}}><i className="fa-solid fa-star" />&nbsp;{episodeData.vote_average}&nbsp;&nbsp;({episodeData.vote_count} votes)</h5>
                                <h5 className={styles.font_manager}><i className="fas fa-clock" />&nbsp;{episodeData.runtime} mins.</h5>
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

                            {episodeData.overview!=="" && <h5 className={styles.font_manager}>{episodeData.overview}</h5>}
                            {episodeData.overview==="" && <h5 className={styles.font_manager}>No overview available</h5>}

                        </Col>

                    </Row>

                    <br />
                    
                    {cast.length>0 &&
            
                        <>
                            <h3><Badge bg="secondary">Episode&nbsp;{episodeData.episode_number} Cast</Badge>&nbsp;&nbsp;</h3>
                            <CastCarousel cast={cast} />
                        </>
                    }
                </>
            }
        </>
    )
}

export default SeasonComponent;