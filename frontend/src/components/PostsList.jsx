import React, { Component } from 'react';
import { Card, Container, Button, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import _ from 'lodash';
import { Link } from 'react-router-dom';

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
                        <div className="card" key={post.id}>
                            <div className="card-header">
                                {post.title}
                            </div>
                            <div className="card-body">
                                {post.body}
                            </div>
                            <div style={{marginLeft: '2em', marginBottom: '1em'}}>
                                <Link to="/">
                                    <Button variant="primary">Go Home</Button>
                                </Link>
                            </div>
                        </div>            
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