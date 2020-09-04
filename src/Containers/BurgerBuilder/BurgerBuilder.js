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
import * as actions from '../../Store/Action/actionRoot'



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        if (!this.props.building || !this.props.isAuth ) {
            this.props.setInitIngredient();
        }
    }

    purchasingHandle = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true })
        } else {
            this.props.setRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    closePurchaseHandle = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchaseHandle = () => {
        this.props.purchasedInit()
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
        let result = <Spinner />;
        if (this.props.ingredients) {
            let disableBtn = { ...this.props.ingredients }
            for (let key in disableBtn) {
                disableBtn[key] = disableBtn[key] <= 0;
            }
            let orderSummary = (
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
                        purchasing={this.purchasingHandle}
                        isAuth={this.props.isAuth} />
                </Aux>
        }

        if (this.props.error) {
            result = <p>Có lỗi load trang</p>
        }
        return result;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        redirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (name) => dispatch(actions.addIngredient(name)),
        removeIngredient: (name) => dispatch(actions.removeIngredient(name)),
        setInitIngredient: () => dispatch(actions.initIngredient()),
        purchasedInit: () => dispatch(actions.purchaseBurgerInit()),
        setRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(catchErrorAxios(BurgerBuilder, axios));
