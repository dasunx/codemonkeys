import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navbar/navbar.component';
import Landing from './components/Landing/Landing.component';
import Login from './components/Auth/Login.component';
import Signup from './components/Auth/Signup.component';
import Alert from './components/alert/alert.component';
import Dashboard from './components/Dashboard/Dashboard.component.js';
import PrivateRoute from './components/Routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreatProfile.component';
import EditProfile from './components/profile-form/EditProfile.component';
import AddExperience from './components/profile-form/AddExperience.component';
import AddEducation from './components/profile-form/AddEducation.component';
import Profiles from './components/profiles/Profile.component';
import Profile from './components/Profile/Profile.component';
//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<div>
					<NavBar />
					<Route exact path='/' component={Landing} />
					<div className='container'>
						<Alert />
						<Switch>
							<Route exact path='/login' component={Login} />
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/profiles' component={Profiles} />
							<Route exact path='/profile/:id' component={Profile} />
							<PrivateRoute exact path='/profile' component={Dashboard} />
							<PrivateRoute exact path='/create-profile' component={CreateProfile} />
							<PrivateRoute exact path='/edit-profile' component={EditProfile} />
							<PrivateRoute exact path='/add-experience' component={AddExperience} />
							<PrivateRoute exact path='/add-education' component={AddEducation} />
						</Switch>
					</div>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
