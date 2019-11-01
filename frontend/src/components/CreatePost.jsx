import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import _ from 'lodash';

class CreatePost extends Component { 
    constructor(props){
        super(props)
        this.state = { title:'My Catchy Title', content: "Random Content", author: "King of the world", category:"" }
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
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event);
        const data = new FormData(event.target);
        fetch('/posts', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('username:password'), 
            }), 
            body: event,
        });
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
                            <select className="form-control" onChange={this.handleChange}>
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


                        <div className="col-md-4 center-block">
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