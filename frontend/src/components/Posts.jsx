import React, { Component } from 'react';
import { Card, Container, Button, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'

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
                        <Card id={post.id}>
                            <Card.Header>Post</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                <h4 style={{textAlign:"right", cursor: "pointer"}}><FaEdit /></h4>
                                    {post.title}
                                </Card.Title>
                                <Card.Text>
                                    <i>Body:</i> {post.body}
                                </Card.Text>
                                <Card.Text>
                                    <i>Category:</i> {_.capitalize(post.category)}
                                </Card.Text>
                                <Link to="/">
                                    <Button variant="primary">Go Home</Button>
                                </Link>
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