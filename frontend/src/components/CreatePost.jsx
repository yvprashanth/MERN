import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'
import _ from 'lodash';
import DropdownItem from 'react-bootstrap/DropdownItem';

class CreatePost extends Component { 
 
    componentWillMount() {
        this.props.myfetchCategories();
    }

    render(){
        const { myStaticCategories } = this.props;
        console.log(typeof myStaticCategories);
        
        return(
            <div>
                <Container>
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
                            <Form.Label>Category</Form.Label>
                            <select className="form-control">
                                <option value="" className="disabled">Select Category</option>
                                {_.map(myStaticCategories, category => (
                                    <option
                                        key={category.name}
                                        value={category.name}
                                    >
                                        {_.startCase(_.toLower(category.name))}
                                    </option>
                                ))}
                            </select>
                            </Form.Group>                           
                        </Form.Row>


                        <div class="col-md-4 center-block">
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