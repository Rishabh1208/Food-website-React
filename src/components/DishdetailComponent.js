import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Row,
	Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			isModalOpen: false,
		};
	}
	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		this.props.postComment(
			this.props.dishId,
			values.rating,
			values.author,
			values.comment
		);
	}
	render() {
		return (
			<React.Fragment>
				<Button onClick={this.toggleModal}>
					<span className='fa fa-pencil fa-lg'></span>Submit Comment
				</Button>

				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						<strong>Submit Comment</strong>
					</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className='form-group'>
								<Label htmlFor='rating' md={12}>
									<strong>Rating</strong>
								</Label>
								<Col md={12}>
									<Control.select
										model='.rating'
										name='rating'
										className='form-control'>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor='author' md={12}>
									<strong>Your Name</strong>
								</Label>
								<Col md={12}>
									<Control.text
										model='.author'
										id='author'
										name='author'
										placeholder='Your Name'
										className='form-control'
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>

									<Errors
										className='text-danger'
										model='.name'
										show='touched'
										messages={{
											required: 'Required',
											minLength: 'Must be greater than 2 characters',
											maxLength: 'Must be 15 characters or less',
										}}
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor='comment' md={12}>
									{' '}
									<strong>Comment</strong>
								</Label>
								<Col md={12}>
									<Control.textarea
										model='.comment'
										id='comment'
										name='comment'
										rows='6'
										className='form-control'
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col>
									<Button type='submit' color='primary'>
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

function RenderDish({ dish }) {
	return (
		<FadeTransform
			in
			transformProps={{
				exitTransform: 'scale(0.5) translateY(-50%)',
			}}>
			<Card>
				<CardImg top src={baseUrl + dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	);
}

function RenderComments({ comment, postComment, dishId }) {
	if (comment != null)
		return (
			<div>
				<h4>Comments</h4>
				<ul className='list-unstyled'>
					<Stagger in>
						{comment.map((c) => {
							return (
								<Fade in key={c.id}>
									<li>
										<p>{c.comment}</p>
										<p>
											-- {c.author},{' '}
											<span>
												{new Intl.DateTimeFormat('en-US', {
													year: 'numeric',
													month: 'short',
													day: '2-digit',
												}).format(new Date(Date.parse(c.date)))}
											</span>
										</p>
									</li>
								</Fade>
							);
						})}
					</Stagger>
				</ul>
				<CommentForm dishId={dishId} postComment={postComment} />
			</div>
		);
	else return <div></div>;
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className='container'>
				<div className='row'>
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className='container'>
				<div className='row'>
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish != null)
		return (
			<div className='container'>
				<div className='row'>
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to='/menu'>Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className='col-12'>
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className='row'>
					<div className=' col-12 col-md-5 m-1'>
						<RenderDish dish={props.dish} />
					</div>
					<div className=' col-12 col-md-5 m-1'>
						<RenderComments
							comment={props.comments}
							postComment={props.postComment}
							dishId={props.dish.id}
						/>
					</div>
				</div>
			</div>
		);
	else return <div></div>;
};

export default DishDetail;
