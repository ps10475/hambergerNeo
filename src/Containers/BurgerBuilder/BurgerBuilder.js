import React, { Component } from 'react';
import Aux from '../../HOC/Auxx';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    Meat    : 5000,
    Salad   : 1000,
    Bacon   : 5000,
    Cheese  : 3000 
}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            Meat    : 0,
            Bacon   : 0,
            Salad   : 0,
            Cheese  : 0,
        },
        totalPrice  : 5000,
        purchasable : false,
        purchasing  : false,
    }

    purchasingHandle = ()=>{
        this.setState({
            purchasing : true
        })
    }
    closeModalHandle = () =>{
        this.setState({
            purchasing : false
        })
    }

    purchasableActive = (ingredients) => {
        let sum = Object.keys(ingredients)
            .map( igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        this.setState({
            purchasable : sum > 0
        })
    }

    addIngredientHandle = (type) => {
        let oldIngredientNum = this.state.ingredients[type];
        let newIngredientNum = oldIngredientNum + 1;
        let updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = newIngredientNum;
        
        let oldPrice = this.state.totalPrice;
        let addPrice = INGREDIENT_PRICE[type];
        let updatePrice = oldPrice + addPrice;
         
        this.setState({
            ingredients : updateIngredients,
            totalPrice  : updatePrice
        })  

        this.purchasableActive(updateIngredients)
    }

    removeIngredient = (type) => {
        let oldIngredientNum = this.state.ingredients[type];
        if(oldIngredientNum <=0 ){ return };
        let newIngredientNum = oldIngredientNum - 1;
        let updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = newIngredientNum;
        
        let oldPrice = this.state.totalPrice;
        let deductPrice = INGREDIENT_PRICE[type];
        let updatePrice = oldPrice - deductPrice;
         
        this.setState({
            ingredients : updateIngredients,
            totalPrice  : updatePrice
        })  

        this.purchasableActive(updateIngredients)
    }
    render() {
        let disableBtn = {...this.state.ingredients}
        for ( let key in disableBtn ){
            disableBtn[key] = disableBtn[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.closeModalHandle}>
                    <OrderSummary ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                    addIngredient = {this.addIngredientHandle}
                    removeIngredient = {this.removeIngredient}
                    disableBtn = {disableBtn}
                    totalPrice = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    purchasing = {this.purchasingHandle} />
            </Aux>
        );
    }
}

export default BurgerBuilder;
