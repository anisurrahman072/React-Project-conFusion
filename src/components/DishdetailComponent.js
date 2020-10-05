import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        alert(JSON.stringify(values));
    }

    render(){
        return(
            <React.Fragment>
                <Button type="button" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>
                    Submit Comment 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Name</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control" validators={{isNumber}}>
                                    <option>Choose rating</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors className="text-danger" model=".rating" show="touched"
                                    messages={{
                                        isNumber: 'Select a rating'
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control"
                                    validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                                />
                                <Errors className="text-danger" model=".name" show="touched" 
                                messages={{
                                    required: 'required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}  />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="coment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" className="form-control" rows="6" validators={{required}}>
                                    Your Comment
                                </Control.textarea>
                                <Errors model=".comment" className="text-danger" show="touched" messages={{
                                    required: 'Required'
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary">
                                    Send Feedback
                                </Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderComment({comments}) {
    const comment = comments.map((comment) => {
        return(
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(comment.date))}</p>
            </li>
        );
    });
    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comment}
            </ul>
            <div>
                <CommentForm />
            </div>
        </div>
    );
}

function RenderDish({dish}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );   
}

const DishDetail = (props) => { //first Class function
        if(props.dish){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <RenderDish dish = {props.dish} />
                        <RenderComment comments = {props.comments} />
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
}

export default DishDetail;
