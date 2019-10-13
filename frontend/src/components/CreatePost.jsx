import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';



export default class CreatePost extends Component { 
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Container>
                    <h2>Create Post</h2>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="Title for the post" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control placeholder="Any content you want to enter" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                            </Form.Group>

                        </Form.Row>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}