import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../HOC/Auxx';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axionOrder';
import Spinner from '../../Components/UI/Spinner/Spinner';
import catchErrorAxios from '../../HOC/catchErrorAxios';
import * as actionTypes from '../../Store/actionTypes';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    purchasingHandle = () => {
        this.setState({
            purchasing: true
        })
    }
    closePurchaseHandle = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchaseHandle = () => {
        this.props.history.push('/checkout')
    }

    purchasableActive = (ingredients) => {
        let sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }

    render() {
        let result = <p>Không thể tải dữ liệu từ firebase</p>

        if (!this.state.error) {
            let disableBtn = { ...this.props.ingredients }
            for (let key in disableBtn) {
                disableBtn[key] = disableBtn[key] <= 0;
            }
            let orderSummary = this.state.loading ?
                (
                    <Spinner />
                ) : (
                    <OrderSummary
                        ingredients={this.props.ingredients}
                        closePurchase={this.closePurchaseHandle}
                        continuePurchase={this.continuePurchaseHandle}
                        totalPrice={this.props.totalPrice} />
                )
            result =
                <Aux>
                    <Modal show={this.state.purchasing} closePurchase={this.closePurchaseHandle}>
                        {orderSummary}
                    </Modal>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.props.addIngredient}
                        removeIngredient={this.props.removeIngredient}
                        disableBtn={disableBtn}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.purchasableActive(this.props.ingredients)}
                        purchasing={this.purchasingHandle} />
                </Aux>

        }
        return (
            result
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (name) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
        removeIngredient: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(catchErrorAxios(BurgerBuilder, axios));
