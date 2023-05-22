import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            
        };
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

handleOnChangePassword = (event) => {
    this.setState({
        password: event.target.value,
    })
}
handleLogin = async () => {
    console.log(this.state.username)
    console.log(this.state.password)
    try {
        await handleLoginApi(this.state.username, this.state.password);
    } catch (e) {
        console.log(e);
    }
    
}
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text'
                             className='form-control'
                             placeholder='Enter your username' 
                             value={this.state.username}
                             onChange={(event) => {
                                this.handleOnChangeUsername(event);
                            }}/>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <input type='password'
                             className='form-control'
                             placeholder='Enter your password'
                             onChange={(event) => {
                                this.handleOnChangePassword(event)
                             }} />

                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                            
                        </div>
                    </div>
                </div>
            </div>
    )}
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
