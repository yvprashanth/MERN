import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';


class Home extends Component { 
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Welcome to Readable</h2>
                    <p>This is how to build a website with React, React-Router, Redux & React-Bootstrap</p>
                    <Link to="/learnmore">
                        <Button bsstyle="primary">Learn More</Button>
                    </Link>
                    &nbsp;
                    <Link to="/createpost">
                        <Button bsstyle="primary">Create Post</Button>
                    </Link>
                </Jumbotron>
            </Container>
        )
    }
}

export default Home