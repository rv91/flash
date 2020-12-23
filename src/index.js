import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

// import App from './App';
import reportWebVitals from './reportWebVitals';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Card, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Star, PersonBadge, StarFill } from 'react-bootstrap-icons';
// import {  } from 'react-router';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import { products } from './productsInfo.json';

function NavHeader() {
  return (<Navbar bg="light" variant="light" className="topNav" activeKey="/home">

    <Navbar.Brand href="/home" >
      <img src="/media/logos/flash_deals_LD.jpg" />
    </Navbar.Brand>
    <Navbar.Collapse id="nav-collapse" activeKey="/home">

      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/home">Coupons</Nav.Link>
      </Nav.Item>

    </Navbar.Collapse>
  </Navbar>);
}

function GiveThanks(props) {
  return (
    <Form className="text-center">
      <Form.Group as={Row}>
        <Form.Text size="sm" className="text-muted">
          <PersonBadge /> {props.submitter} posted this deal. Say thanks!
          </Form.Text>
        <Form.Text size="sm" className="text-muted">
          <StarFill color="gold" > </StarFill>
          <a href="#">
            Give Thanks
      </a>

        </Form.Text>

      </Form.Group>
    </Form>

  )
}

function Blog(props) {

  let colors = props.blog.available_colors;
  colors = colors.map((color) =>
    <li key={color.toString()}><a href="/color">{color}</a></li>
  );

  return (

    <Container className="bg-main-container w-75">

      <h1 className="dealTitle">{props.blog.title}</h1>
      <Row md="11" >
        <Col md="8">

          <div>
            <b>{props.blog.dealPrice} </b>
            <strike>{props.blog.originalPrice}</strike>
          + {props.blog.shipping} shipping
          </div>
          <br />
          <p>{props.blog.content_line1}</p>
          <p>{props.blog.content_line2}</p>
          <br />
          <p>{props.blog.content_line3}</p>
          <p>Available colors:</p>
          <ul>
            {colors}
          </ul>
        </Col>
        <Col md="3">
          <Image src={props.blog.image_url} className='productImage' />
          <br /><br /><br /><br /><br />
          <Button className="deal-green-button" block>See Deal</Button>
          <GiveThanks submitter={props.blog.submitter} />
        </Col>
      </Row>
    </Container>

  );
}

function ProductCard(props) {
  return (

    <Card className="productCard">
      <Card.Img className="productCardImage" variant="top" src={props.blog.image_url} />
      <Card.Body>
        <Card.Text>
          {props.blog.title}
        </Card.Text>
        <Card.Text>
          <b>{props.blog.dealPrice}</b>
          <strike>{props.blog.originalPrice}</strike>
          <Form.Text className="text-muted">
            More
              </Form.Text>
        </Card.Text>
        <Button variant="secondary" href={`/productDetails/${props.blog.id}`}>View Details</Button>
      </Card.Body>
    </Card>
  );


}

function HomeController(props) {

  let productCards = products.map((blogItem) => {
    return (<Col md={3}> <ProductCard blog={blogItem} />
    </Col>);
  });

  return (
    <Container>
      <br />
      <Row>
        {productCards}
      </Row>
    </Container>
  );
}

function BlogController(props) {

  var { id } = useParams();
  const blog = products.map((blogItem) => {

    if (parseInt(id) === blogItem.id)
      return <Blog key={blogItem.id} blog={blogItem} />;
  });

  return (
    <div>
      <br />
      {blog}
    </div>
  );

}

function SlickAppController() {

  return (
      <Router >
        <NavHeader />
        <Switch>
          <Route path="/home"><HomeController /></Route>
          <Route path="/blog"><BlogController /></Route>
          <Route path="/productDetails/:id"><BlogController /></Route>
          <Route path="/"><BlogController /></Route>
        </Switch>
      </Router>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <SlickAppController />
  </React.StrictMode>
  , document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
