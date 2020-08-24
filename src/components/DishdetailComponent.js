import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

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
                        <RenderDish dish = {props.dish} />
                        <RenderComment comments = {props.dish.comments} />
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
