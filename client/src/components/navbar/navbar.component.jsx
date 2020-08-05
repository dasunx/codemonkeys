import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './navbar.css';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Bell } from '../../icons/bell.svg';
import { ReactComponent as SignUpIcon } from '../../icons/sign-up.svg';
import { ReactComponent as SignInIcon } from '../../icons/sign-in.svg';
import { ReactComponent as Messenger } from '../../icons/messenger.svg';
import { ReactComponent as Caret } from '../../icons/caret.svg';
import { ReactComponent as Cog } from '../../icons/cog.svg';
import { ReactComponent as Chevron } from '../../icons/chevron.svg';
import { ReactComponent as Arrow } from '../../icons/arrow.svg';
import { ReactComponent as Avatar } from '../../icons/avatar.svg';
import { ReactComponent as LogoutIcon } from '../../icons/logout.svg';
import { CSSTransition } from 'react-transition-group';
import Logo from '../../images/logo.png';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul className='xnavbar-nav'>
			<NavItem icon={<Plus />} url='/profiles' />
			<NavItem icon={<Bell />} url='/login' />
			<NavItem icon={<Messenger />} url='/message' />
			<NavItem icon={<Caret />}>
				<DropdownMenu logout={logout} />
			</NavItem>
		</ul>
	);
	const guestLinks = (
		<ul className='xnavbar-nav'>
			<NavItem icon={<SignInIcon />} url='/login' />
			<NavItem icon={<SignUpIcon />} url='/signup' />
		</ul>
	);
	return (
		<div className='container-fluid p-0'>
			<div className='row m-0 nav-row'>
				<div className='col-2 p-0'>
					<Link to='/'>
						<img src={Logo} alt='Logo monkey' className='logo' />
					</Link>
				</div>
				<div className='col-10 p-0'>
					<nav className='xnavbar'>{!loading && (isAuthenticated ? authLinks : guestLinks)}</nav>
				</div>
			</div>
		</div>
	);
};

const NavItem = (props) => {
	const [ open, setOpen ] = useState(false);
	return (
		<li className='nav-item'>
			<Link to={props.url} className='icon-button' onClick={() => setOpen(!open)}>
				{props.icon}
			</Link>

			{open && props.children}
		</li>
	);
};

export function DropdownMenu ({ logout }) {
	const [ activeMenu, setActiveMenu ] = useState('main');
	const [ menuHeight, setMenuHeight ] = useState(null);

	function calcHeight (el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}
	function DropdownItem (props) {
		return (
			<a className='menu-item' href={props.href} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
				<span className='icon-button'>{props.leftIcon}</span>
				{props.children}
				<span className='icon-right'>{props.rightIcon}</span>
			</a>
		);
	}
	return (
		<div className='dropdown' style={{ height: menuHeight }}>
			<CSSTransition
				in={activeMenu === 'main'}
				unmountOnExit
				timeout={500}
				classNames='menu-primary'
				onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem href='/profile'>My Profile</DropdownItem>
					<DropdownItem leftIcon={<Cog />} rightIcon={<Chevron />} goToMenu='settings'>
						Settings
					</DropdownItem>
					<a className='menu-item' onClick={logout}>
						<span className='icon-button'>
							<LogoutIcon />
						</span>
						Log out
					</a>
				</div>
			</CSSTransition>
			<CSSTransition
				in={activeMenu === 'settings'}
				unmountOnExit
				timeout={500}
				classNames='menu-secondary'
				onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem leftIcon={<Arrow />} goToMenu='main'>
						<b>Settings</b>
					</DropdownItem>
					<DropdownItem leftIcon={<Avatar />}>Profile</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
				</div>
			</CSSTransition>
		</div>
	);
}

NavBar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
