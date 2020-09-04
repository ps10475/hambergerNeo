import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.scss';
import { connect } from 'react-redux';
import * as actions from '../../Store/Action/actionRoot';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nhập email...'
                },
                label: 'Email',
                value: '',
                validation: {
                    required: true,
                    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,4}/
                },
                vaild: true,
                touch: false,
                validMessage: 'Nhập đúng định dạng email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Nhập mật khẩu'
                },
                label: 'Mật khẩu',
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: true,
                validMessage: 'Nhập từ 6 ký tự trở lên',
                touch: false,
            }
        },
        isSignin: false
    }

    componentDidMount(){
        if(!this.props.building && this.props.redirectPath !== '/'){
            this.props.setDefaultRedirectPath()
        }
    }

    checkValidaty = (value, rule) => {
        let isValid = true;
        if (rule.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid
        }
        if (rule.email) {
            isValid = rule.email.test(value) && isValid
        }
        return isValid
    }

    onChangeHandle = (event, changedTarget) => {
        let value = event.target.value;
        let rule = this.state.authForm[changedTarget].validation;
        let newAuthForm = {
            ...this.state.authForm,
            [changedTarget]: {
                ...this.state.authForm[changedTarget],
                value: event.target.value,
                valid: this.checkValidaty(value, rule),
                touch: true,
            }
        }
        this.setState({ authForm: newAuthForm })
    }

    onToggleSigninSignup = () => {
        let updateSignIn = !this.state.isSignin;
        this.setState({ isSignin: updateSignIn })
    }

    onSubmitHanle = (event) => {
        event.preventDefault();
        let email = this.state.authForm.email.value;
        let password = this.state.authForm.password.value;
        this.props.checkAuth(email, password, this.state.isSignin)
    }

    render() {
        
        let formElementArray = [];
        for (let inputName in this.state.authForm) {
            formElementArray.push({
                id: inputName,
                config: this.state.authForm[inputName]
            })
        }
        let form =
            <form onSubmit={this.onSubmitHanle}>
                {formElementArray.map(element => {
                    return <Input
                        key={element.id}
                        elementType={element.id}
                        elementConfig={element.config.elementConfig}
                        label={element.config.label}
                        value={element.config.value}
                        inValid={!element.config.valid}
                        touch={element.config.touch}
                        validMessage={element.config.validMessage}
                        changed={(event) => this.onChangeHandle(event, element.id)}
                    />
                })}
                <Button btnType='Success'>
                    Xác nhận
            </Button>
            </form>
        if(this.props.loading){
            form = <Spinner />
        }
        let redirect = null;
        if(this.props.isAuth){
            redirect = <Redirect to={this.props.redirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                <h1>{this.state.isSignin ? 'Đăng nhập' : 'Đăng ký'}</h1>
                <p className={classes.Alert}> {this.props.error ? this.props.error : null} </p>
                {form}
                <Button btnType='Danger' clicked={this.onToggleSigninSignup}>
                    Toggle to {!this.state.isSignin ? 'Đăng nhập' : 'Đăng ký'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        redirectPath : state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuth: (email, password, isSignin) => dispatch(actions.auth(email, password, isSignin)),
        setDefaultRedirectPath: () => dispatch( actions.setRedirectPath('/') )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
