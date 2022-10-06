import  React, {useState} from 'react'
import MyButton from './UI/button/MyButton'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SourceItem = function (props) {
	const navigate = useNavigate();
	return(
          <Row >
            <Col xs={1}>
	  			<Form.Check/>
            </Col>
            <Col>
	  			{props.source.title}
            </Col>
            <Col>
            	{props.source.body}
            </Col>
            <Col>192.168.1.1</Col>
            <Col>Active</Col>
            <Col>06/23/2022</Col>
            <Col className="ml-5 ml-lg-0">
	    	  	<Button variant="outline-secondary" onClick={() => navigate(`${props.source.id}`)}>
	    	  		Edit
	    	  	</Button>
	    	  	<Button variant="outline-danger" onClick={() => props.remove(props.source)}>
	    	  		Delete
	    	  	</Button>
            </Col>
          </Row>
	)
}


export default SourceItem
