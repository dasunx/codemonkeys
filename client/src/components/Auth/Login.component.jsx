import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../actions/auth';
import './Auth.styles.css';
import SignInImg from '../../images/signin-image.jpg';

const Login = ({login , isAuthenticated}) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};
	// redirect if logged in
	if(isAuthenticated){
		return <Redirect to='/profile'/>
	}
	return (
		<div className='shadow-box p-2 mt-3 mb-5'>
			<div className='row m-0 mt-4'>
				<div className='col-md-6 order-2'>
					<h3>Sign in</h3>
					<form className='mt-4' method="POST" onSubmit={e => onSubmit(e)}>
						<div className='form-row'>
							<div className='form-group col-md-12'>
								<input
									type='email'
									className='form-control'
									id='inputEmail'
									placeholder='Email'
									name='email'
									value={email}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='form-group col-md-12'>
								<input
									type='password'
									className='form-control'
									id='inputPassword'
									placeholder='Password'
									name='password'
									value={password}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className='col-md-6 offset-md-3'>
								<input type="submit" className='btn btn-primary btn-block' value="Login"/>
							</div>
						</div>
					</form>
				</div>
				<div className='col-md-6 text-center'>
					<img src={SignInImg} alt='' />
				</div>
			</div>
			<div className='row m-0 mt-4 mb-4'>
				<div className='col-md-6 text-center mt-2 '>
					<Link to='/signup' className='to-other-link '>
						I'm new here
					</Link>
				</div>
				<div className='col-md-6 text-center login-quote'>new quote every day</div>
			</div>
		</div>
	);
};


Login.propTypes = {
	login : PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login})(Login);
