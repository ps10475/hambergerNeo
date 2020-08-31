import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancelCheckout={this.cancelCheckoutHandle}
                    continueCheckout={this.continueCheckoutHandle} />
                <Route path={this.props.match.url + '/contact'} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients 
    }
}

export default connect(mapStateToProps)(Checkout);
