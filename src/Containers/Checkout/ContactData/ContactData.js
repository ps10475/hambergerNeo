import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.module.scss';
import Button from '../../../Components/UI/Button/Button';
import axios from '../../../axionOrder';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Nhập Họ và Tên',
                    type: 'text',
                },
                label: 'Tên khách hàng',
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 8
                },
                valid : false,
                touch: false,
                validMessage:'Nhập từ 3 đến 8 ký tự'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Nhập địa chỉ email',
                    type: 'email',
                },
                label: 'Địa chỉ Email',
                value: '',
                validation: {
                    required: true,
                    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.[a-z]{2,4}/
                },
                valid : false,
                touch: false,
                validMessage: "Nhập đúng định dạng email"
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Nhập địa chỉ khách hàng',
                    type: 'text',
                },
                label: 'Đại chỉ khách hàng',
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 8
                },
                valid : false,
                touch: false,
                validMessage:"Nhập từ 3 đến 8 ký tự"
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '', displayValue: 'Chọn loại vận chuyển' },
                        { value: 'nhanh', displayValue: 'Chuyển Nhanh' },
                        { value: 're', displayValue: 'Phí thấp nhất' }
                    ]
                },
                label: 'Phương thức nhận',
                value: '',
                validation: {
                    required: true,
                },
                valid : false,
                touch: false,
                validMessage:"Chọn 1 trong các lựa chọn"
            }
        },
        formValid: false,
        loading: false,
    }

    checkValidity = (value,rules) => {
        let isValid = true;
        if(rules&&rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules&&rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules&&rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules&&rules.email){
            isValid = rules.email.test(value) && isValid;
        }
        return isValid;
    }

    changeHanle = (event, changeTarget) => {
        const updateForm = { ...this.state.orderForm };
        updateForm[changeTarget].value = event.target.value;
        const value = updateForm[changeTarget].value;
        const rules = updateForm[changeTarget].validation;
        updateForm[changeTarget].valid = this.checkValidity(value,rules);
        updateForm[changeTarget].touch = true;
        let updateFormValid = true;
        for (let key in updateForm){
            updateFormValid = updateForm[key].valid && updateFormValid;
        }
        this.setState({ orderForm: updateForm, formValid: updateFormValid })
    }

    orderHandle = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let orderData = {};
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }
        const data = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: orderData,
            createAt: new Date()
        }
        axios.post('/order.json', data)
            .then(res => {
                console.log(res);
                this.setState({ loading: false });
                this.props.history.push('/')
            }).catch(error => {
                this.setState({ loading: false })
                console.log(error);
            })
    }
    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandle}>
                {formElementArray.map(formElement => {
                    return (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            label={formElement.config.label}
                            changed={(event) => this.changeHanle(event, formElement.id)}
                            inValid = {!formElement.config.valid}
                            touch={formElement.config.touch}
                            validMessage= {formElement.config.validMessage} />
                    )
                })}
                <Button btnType="Success" disabled={!this.state.formValid}> ĐẶT HÀNG </Button>
            </form>)
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.Contact} >
                <h1>Nhập thông tin khách hàng</h1>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps )(ContactData);
