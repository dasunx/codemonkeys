import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../Spinner/Spinner.component';
import DashboardActions from './DashboardActions.js';
import Experience from './Experience.component';
import Education from './Education.component';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
	useEffect(
		() => {
			getCurrentProfile();
		},
		[ getCurrentProfile ]
	);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<div>
			<p>
				{' '}
				Welcome <b>{user && user.name}</b>
			</p>
			{profile !== null ? (
				<div>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='m-2'>
						<button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minus' /> Delete my account
						</button>
					</div>
				</div>
			) : (
				<div>
					<p className='lead text-muted'>Welcome {user.name}</p>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-lg btn-info'>
						Create Profile
					</Link>
				</div>
			)}
		</div>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
