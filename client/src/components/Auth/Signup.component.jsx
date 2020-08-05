import React, { useState } from 'react';
import SignUpImg from '../../images/signup-image.jpg';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'
import './Auth.styles.css';

const Signup = ({setAlert, register, isAuthenticated}) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('password do not match','danger',3000);
		} else {
			register({name, email, password});
		}
	};

	if(isAuthenticated){
		return <Redirect to='/profile'/>
	}
	return (
		<div className='shadow-box p-2 mt-3 mb-5'>
			<div className='row m-0 mt-4'>
				<div className='col-md-6 order-2 order-md-1'>
					<h3>Sign up</h3>
					<form className='mt-4' onSubmit={(e) => onSubmit(e)} method='POST'>
						<div className='form-row'>
							<div className='form-group col-md-12'>
								<input
									type='text'
									className='form-control'
									name='name'
									value={name}
									onChange={(e) => onChange(e)}
									placeholder='Name'
									required
								/>
							</div>
							<div className='form-group col-md-12'>
								<input
									type='email'
									className='form-control'
									id='inputEmail'
									placeholder='Email'
									name='email'
									value={email}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className='form-group col-md-12'>
								<input
									type='password'
									className='form-control'
									id='inputPassword'
									placeholder='Password'
									minLength='8'
									name='password'
									value={password}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='form-group col-md-12'>
								<input
									type='password'
									className='form-control'
									id='inputConfirmPassword'
									placeholder='Confirm Password'
									name='password2'
									value={password2}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='col-md-6'>
								<input type='submit' className='btn btn-primary btn-block' value='Sign up' />
							</div>
						</div>
					</form>
				</div>
				<div className='col-md-6 text-center order-1'>
					<img src={SignUpImg} alt='' />
				</div>
			</div>
			<div className='row m-0 mt-4 mb-4'>
				<div className='col-md-6' />
				<div className='col-md-6 text-center mt-2'>
					<Link to='/login' className='to-other-link'>
						I have an account
					</Link>
				</div>
			</div>
		</div>
	);
};

Signup.propTypes={
	setAlert: PropTypes.func.isRequired,
	register : PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Signup);
