import React, { Component } from 'react';
import Aux from '../../HOC/Auxx';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axionOrder';
import Spinner from '../../Components/UI/Spinner/Spinner';
import catchErrorAxios from '../../HOC/catchErrorAxios';
 

const INGREDIENT_PRICE = {
    Meat: 5000,
    Salad: 1000,
    Bacon: 5000,
    Cheese: 3000
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            Meat: 0,
            Bacon: 0,
            Salad: 0,
            Cheese: 0,
        },
        totalPrice: 5000,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    resetState = () => {
        this.setState({
            ingredients: {
                Meat: 0,
                Bacon: 0,
                Salad: 0,
                Cheese: 0,
            },
            totalPrice: 5000,
            purchasable: false,
            purchasing: false,
            loading: false
        })
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
        this.setState({
            loading: true
        })
        const data = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Neo',
                email: 'neo.nguyen88@gmail.com',
                phone: '090-996-2108',
                address: {
                    street: '60 Chu Văn An',
                    district: 'Quận 1',
                },
            },
            note: 'lấy tương cà nhiều ',
            createAt: new Date(),
        }
        axios.post('/order.json', data)
            .then(r => {
                console.log(r);
                this.resetState();
            }).catch(error => {
                console.log(error);
            })
    }


    purchasableActive = (ingredients) => {
        let sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandle = (type) => {
        let oldIngredientNum = this.state.ingredients[type];
        let newIngredientNum = oldIngredientNum + 1;
        let updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = newIngredientNum;

        let oldPrice = this.state.totalPrice;
        let addPrice = INGREDIENT_PRICE[type];
        let updatePrice = oldPrice + addPrice;

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatePrice
        })

        this.purchasableActive(updateIngredients)
    }

    removeIngredient = (type) => {
        let oldIngredientNum = this.state.ingredients[type];
        if (oldIngredientNum <= 0) { return };
        let newIngredientNum = oldIngredientNum - 1;
        let updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = newIngredientNum;

        let oldPrice = this.state.totalPrice;
        let deductPrice = INGREDIENT_PRICE[type];
        let updatePrice = oldPrice - deductPrice;

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatePrice
        })

        this.purchasableActive(updateIngredients)
    }
    render() {
        let disableBtn = { ...this.state.ingredients }
        for (let key in disableBtn) {
            disableBtn[key] = disableBtn[key] <= 0;
        }
        let orderSummary = this.state.loading ?
            (
                <Spinner />
            ) : (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    closePurchase={this.closePurchaseHandle}
                    continuePurchase={this.continuePurchaseHandle}
                    totalPrice={this.state.totalPrice} />
            )
        return (
            <Aux>
                <Modal show={this.state.purchasing} closePurchase={this.closePurchaseHandle}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandle}
                    removeIngredient={this.removeIngredient}
                    disableBtn={disableBtn}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchasingHandle} />
            </Aux>
        );
    }
}

export default catchErrorAxios(BurgerBuilder, axios);
