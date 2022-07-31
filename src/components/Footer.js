import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Footer = () => {
  return (
    <Row style={{marginTop:"20px", marginBottom:"20px"}}>
        <Col sm={8} md={7} lg={4} style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
            <h5><i className="fas fa-copyright" />&nbsp;Made by ARGHYA DEEP PAL</h5>
        </Col>
        <Col sm={4} md={5} lg={6} style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
          <a href="https://www.linkedin.com/in/arghya-deep-pal7/" style={{color:'blue', textDecoration: 'none'}} target="_blank"><i class="fab fa-linkedin fa-2x"></i>&nbsp;&nbsp;</a>
          <a href="https://github.com/Arghyadeep7" style={{color:'white', textDecoration: 'none'}} target="_blank"><i class="fab fa-github fa-2x"></i>&nbsp;&nbsp;</a>
          <a href="mailto:ronipal07@gmail.com" style={{color:'red', textDecoration: 'none'}} target="_blank"><i class="fas fa-envelope fa-2x"></i></a>
        </Col>
        <Col lg={2} style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
          <Button variant="outline-danger" href="mailto:ronipal07@gmail.com" target="_blank">CONTACT</Button>
        </Col>
    </Row>
  )
}

export default Footer;