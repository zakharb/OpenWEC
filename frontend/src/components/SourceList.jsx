import React, {useState} from 'react'
import SourceItem from './SourceItem'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { Form, Container, Row, Col } from 'react-bootstrap';

const SourceList = function ({sources, title, remove}) {

	if(!sources.length){
		return(
	      <h1 style={{textAlign: 'center'}}> 
	        Sources not found 
	      </h1>
		)
	}

	return(
      <div>
        <Container >
          <Row className="my-3" style={{fontWeight: 'bold'}} >
            <Col xs={1}>
                <Form.Check/>
            </Col>
            <Col>Name</Col>
            <Col>Description</Col>
            <Col>IP Address</Col>
            <Col>Status</Col>
            <Col>Date</Col>
            <Col>Actions</Col>
          </Row>
      		<TransitionGroup>
	      		{sources.map(source =>
			        <CSSTransition
				        key={source.id}
				        timeout={300}
				        classNames="source"
				    >
	        			<SourceItem remove={remove} source={source}/>
	      				</CSSTransition>
	      		)}
      		</TransitionGroup>
        </Container>
      </div>
	)
}

export default SourceList

