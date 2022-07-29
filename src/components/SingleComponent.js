import noPosterFound from "../assets/No_Poster.jpg";

import styles from "./SingleComponent.module.css";

const SingleComponent = (props) => {
  return (
    <a href={`/tv/${props.tvSeries.id}`} className={styles.card_link}>
        <div className={styles.card}>
            <img
                className={`d-block w-100 ${styles.card_img}`}
                src={props.tvSeries.poster_path?`https://image.tmdb.org/t/p/original${props.tvSeries.poster_path}`:noPosterFound}
                alt={props.tvSeries.name}
                style={{borderBottom:"2px solid white"}}
            />
            <div className={styles.rating}>
                <span><b><i className="fa-solid fa-star"/>&nbsp;{props.tvSeries.vote_average}</b></span>
            </div>
            <h6 style={{margin:"5px"}}><b>{props.tvSeries.name}</b></h6>
        </div>
    </a>
  )
}

export default SingleComponent