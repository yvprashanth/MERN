import React, { Component } from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchCategories, createPost } from '../actions'
import _ from 'lodash';
import uuid from "uuid";
import { Redirect } from 'react-router-dom';

class CreatePost extends Component { 
    constructor(props){
        super(props)
        this.state = { title:'My Catchy Title', content: "Please enter any content", author: "King of the world", category:"", posts:[] }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        toPosts : false
    }
 
    componentWillMount() {
        this.props.myfetchCategories();
    }

    handleChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
       if(e.target.nodeName !== "SELECT"){
          this.setState({ [e.target.name]: e.target.value });
       } else { 
           this.setState({category : e.target.value})
       }
    }

    handleSubmit(event){
        event.preventDefault();
        var data = {}
        data = new FormData(event.target);
        data.id = uuid.v4()
        data.timestamp = Date.now()
        data.title = this.state.title
        data.body = this.state.content
        data.author = this.state.author
        data.category = this.state.category
        fetch('/posts', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('username:password'), 
                "Content-Type": "application/json"
            }), 
            body: JSON.stringify(data)
        }).then(function(response){
            console.log(response)
        });

        fetch('/posts', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('username:password'), 
            })
        })
        .then(response => response.json())
        .then(data => this.setState({ posts : data, toPosts : true}))
        // this.props.history.push('/posts/');
    }

    render(){
        if(this.state.toPosts === true) {
            return <Redirect to="/posts/" />
        }
        const { myStaticCategories } = this.props;
        return(
            <div>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control size="lg" type="text" name="title" placeholder={this.state.title} onChange={this.handleChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows="4" placeholder={this.state.content} name="content" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control placeholder={this.state.author} name="author" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Category</Form.Label>
                            <select className="form-control" onChange={this.handleChange}>
                                <option value="" className="disabled">Select Category</option>
                                {_.map(myStaticCategories, category => (
                                    <option
                                        key={category.name}
                                        value={category.name} >
                                        {_.capitalize(category.name)}
                                    </option>
                                ))}
                            </select>
                            </Form.Group>                           
                        </Form.Row>

                        <div className="">
                                <Button variant="primary" type="submit" className="text-center">
                                    Submit
                                </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { myStaticCategories : state.categories }
}

const mapDispatchToProps = (dispatch) => ({
    myfetchCategories: () => dispatch(fetchCategories()),
    submitPost: () => dispatch(createPost())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)