import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Footer = () => {
  return (
    <Row style={{margin:"20px auto"}}>
        <Col sm={4} style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
            <h5><i className="fas fa-copyright" />&nbsp;Made by ARGHYA DEEP PAL</h5>
        </Col>
        <Col sm={5} style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
          <a href="https://www.linkedin.com/in/arghya-deep-pal7/" style={{color:'blue', textDecoration: 'none'}} target="_blank"><i className="fab fa-linkedin fa-2x"></i>&nbsp;&nbsp;</a>
          <a href="https://github.com/Arghyadeep7" style={{color:'white', textDecoration: 'none'}} target="_blank"><i className="fab fa-github fa-2x"></i>&nbsp;&nbsp;</a>
          <a href="mailto:ronipal07@gmail.com" style={{color:'red', textDecoration: 'none'}} target="_blank"><i className="fas fa-envelope fa-2x"></i></a>
        </Col>
        <Col sm={3} style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
          <Button variant="outline-danger" href="mailto:ronipal07@gmail.com" target="_blank">CONTACT</Button>
        </Col>
    </Row>    
  )
}

export default Footer;