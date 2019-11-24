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
                            <Card.Header>Post</Card.Header>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>
                                    <i>Body:</i> {post.body}
                                </Card.Text>
                                <Card.Text>
                                    <i>Category:</i> {_.capitalize(post.category)}
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