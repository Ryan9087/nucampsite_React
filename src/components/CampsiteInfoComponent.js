import React from "react";
import { Button, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          isModalOpen:false 
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
      return ( 
        <React.Fragment> 
        <div class="my-4">
        <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" />Submit Comment</Button>
        </div>    
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader className="pl-3" toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
            <div className="form-group"><Label htmlFor="Rating" md={12}>Rating</Label></div>
            <div className="form-group">        
                        <Control.select model=".Rating" id="Rating" name="Rating"
                                model=".Rating"
                                name="Rating"
                                className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
            </div>            
            <div className="form-group">  
                    <Label htmlFor="Name" md={12}>Your Name</Label>
            </div>          
            <div className="form-group">       
                        <Control.text model=".Name" id="Name" name="Name"
                            placeholder="Name"
                            className="form-control" 
                            validators={{
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                            }}
                        />
                        <Errors
                                className="text-danger"
                                model=".Name"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
            </div>                 
            <div className="form-group">     
                    <Label htmlFor="Comment" md={2}>Comment</Label>
                    <Control.textarea model=".Comment" id="Comment" name="Comment"
                        rows="12"
                        className="form-control"
                    />
            </div> 
            <div className="form-group">         
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
            </div>             
            </LocalForm>
        </ModalBody>
        </Modal>
        </React.Fragment>
      );
    }
}


function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }



    function RenderComments({comments}) {
        if (comments) {
            return (
              <div className="cold-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                  return (
                    <div>
                      <p>
                        {comment.text} <br />
                        -- {comment.author},{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit"
                        }).format(new Date(Date.parse(comment.date)))}
                      </p>
                    </div>
                  );
                })}
                
                <CommentForm />

              </div>
            );

        }
    };



    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                <div className="col">
                <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div />;
    }


export default CampsiteInfo;


