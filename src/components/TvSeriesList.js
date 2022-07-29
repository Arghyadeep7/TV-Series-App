import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SingleComponent from "./SingleComponent";

const TvSeriesList = (props) => {

    if(props.items.length===0){
        return (
            <h2 style={{margin:"15px auto"}}>
                No Tv Series found!
            </h2>
        )
    }

    return (
    <Row>
    {
        props.items.map((tvSeries) =>(
            <Col xs={4} sm={3} lg={2} key={tvSeries.id}>
                
                    <SingleComponent tvSeries={tvSeries} />
                
            </Col>
        ))
    }
    </Row>
    );
}

export default TvSeriesList