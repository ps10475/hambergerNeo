import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../Components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    cancelCheckoutHandle = () => {
        this.props.history.goBack()
    }
    continueCheckoutHandle = () => {
        this.props.history.push({
            pathname: this.props.match.url + '/contact',
        })
    }
    render() {
        let checkoutSummary = <Redirect to='/' />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            checkoutSummary = 
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancelCheckout={this.cancelCheckoutHandle}
                        continueCheckout={this.continueCheckoutHandle} />
                    <Route path={this.props.match.url + '/contact'} component={ContactData} />
                </div>
        }
        return  checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
