import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import _ from 'lodash';
import uuid from "uuid";

class CreatePost extends Component { 
    constructor(props){
        super(props)
        this.state = { title:'My Catchy Title', content: "Random Content", author: "King of the world", category:"", posts:[] }
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        data.id = uuid.v4()
        data.timestamp = Date.now()
        data.title = this.state.title
        data.body = this.state.content
        data.author = this.state.author
        data.category = this.state.category
        debugger
        fetch('/posts', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('username:password'), 
                "Content-Type": "application/json"
            }), 
            // body: JSON.stringify(data)
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
        .then(data => this.setState({ posts : data}))
    }

    render(){
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
                            <Form.Control placeholder={this.state.content} name="content" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control placeholder={this.state.author} name="author" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Category</Form.Label>
                            <DropdownButton
                                alignRight
                                title="Dropdown right"
                                id="dropdown-menu-align-right"
                                >
                                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>
                            <select className="form-control" onChange={this.handleSubmit}>
                                <option value="" className="disabled">Select Category</option>
                                {_.map(myStaticCategories, category => (
                                    <option
                                        key={category.name}
                                        value={category.name}
                                    >
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
    myfetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)