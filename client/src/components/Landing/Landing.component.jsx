import React from 'react'
import Dev from '../../icons/dev.svg';
import './Landing.styles.css';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to='/profile'/>
    }
    return (
        <div className="container p-5 mt-8 main-shadow" height={window.screen.height}>
            <div className="row m-0">
                <div className="col-md-7 text-center">
                    <img src={Dev} alt="" width="60%"/>
                </div>
                <div className="col-md-5 text-left mq-text-center">
                    <h1 className="landing-text"> <span className="xtext-wrap">WELCOME</span> <br/>to the <br/>developer's <br></br>community</h1>
                    <div className="row mt-8">
                       <Link className="col btn login-signup-btn pl-5 pr-5 p-2 m-2" to="/login">Sign In</Link>
                       <Link className="col btn login-signup-btn pl-5 pr-5 p-2 m-2" to="/signup">Sign Up</Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);