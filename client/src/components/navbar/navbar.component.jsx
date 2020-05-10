import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import {ReactComponent as Plus} from '../../icons/plus.svg'
import {ReactComponent as Bell} from '../../icons/bell.svg'
import {ReactComponent as Messenger} from '../../icons/messenger.svg'
import {ReactComponent as Caret} from '../../icons/caret.svg'
import {ReactComponent as Cog} from '../../icons/cog.svg'
import {ReactComponent as Chevron} from '../../icons/chevron.svg'
import {ReactComponent as Arrow} from '../../icons/arrow.svg'
import {ReactComponent as Avatar} from '../../icons/avatar.svg'
import { CSSTransition} from 'react-transition-group';
import Logo from '../../images/logo.png';

const NavBar =() => {
    return(
        <div className="container-fluid p-0">
            <div className="row m-0 nav-row">
                <div className="col-2 p-0">
                    <Link to="/">
                        <img src={Logo} alt="Logo monkey" className="logo"/>
                    </Link>
                    
                </div>
                <div className="col-10 p-0">
                    <nav className="xnavbar">
                        <ul className="xnavbar-nav">
                            <NavItem icon={ <Plus/>} url="/signup"></NavItem>
                            <NavItem icon={<Bell/>} url="/login"></NavItem>
                            <NavItem icon={<Messenger/>} url="/message"></NavItem>
                            <NavItem icon={<Caret/>}>
                                <DropdownMenu></DropdownMenu>
                            </NavItem>
                        </ul>
                    </nav>
                </div>           
            </div>
        </div>
    )
};

const NavItem = (props) =>{
    const [open, setOpen] = useState(false);
    return(
        <li className="nav-item">
            <Link to={props.url} className="icon-button" onClick={()=> setOpen(!open)}>
                {props.icon}
            </Link>

            {open && props.children}
        </li>
    )
};

export function DropdownMenu(){
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);

    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
    function DropdownItem(props){
        return(
            <a  className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }
    return(
        <div className="dropdown" style={{ height: menuHeight}}>
            <CSSTransition 
                in={activeMenu === 'main' } 
                unmountOnExit timeout={500} 
                classNames="menu-primary"
                onEnter={calcHeight}
                >
                    <div className="menu">
                        <DropdownItem>My Profile</DropdownItem>
                        <DropdownItem
                            leftIcon={<Cog/>}
                            rightIcon={<Chevron/>}
                            goToMenu="settings">
                                Settings
                            </DropdownItem>
                    </div>
            </CSSTransition>
            <CSSTransition 
                in={activeMenu === 'settings'} 
                unmountOnExit timeout={500} 
                classNames="menu-secondary"
                onEnter={calcHeight}
                >
                    <div className="menu">
                        <DropdownItem leftIcon={<Arrow/>} goToMenu="main"><b>Settings</b></DropdownItem>
                        <DropdownItem leftIcon={<Avatar/>}>Profile</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                    </div>
            </CSSTransition>
        </div>
    );
}

export default NavBar;