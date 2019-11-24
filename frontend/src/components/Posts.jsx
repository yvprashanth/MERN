import React, { Component } from 'react';
import { Card, Container, Row, Col, Form, Button, DropdownButton, MenuItem, Dropdown, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import _ from 'lodash';

class PostsList extends Component { 
    constructor(props){
        super(props)
        this.state = { posts: [] }
    }

    componentDidMount() {
        this.props.myfetchPosts();
    }

    render(){
        const { myPosts } = this.props;
        return (
            <div>
                <Container>
                    <Jumbotron>
                    {_.map(myPosts, post => (
                        <Card>
                            <Card.Header>post.title</Card.Header>
                            <Card.Body>
                                <Card.Title>Special title treatment</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    ))}                        
                    </Jumbotron>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { myPosts : state.posts }
}

const mapDispatchToProps = (dispatch) => ({
    myfetchPosts: () => dispatch(fetchPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)