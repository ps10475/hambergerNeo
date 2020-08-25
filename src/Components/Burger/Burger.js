import React, { Component } from 'react';
import classes from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends Component {
    render() {
        let transformedIngredients = Object.keys(this.props.ingredients)
            .map(igKey => {
                return [...Array(this.props.ingredients[igKey])].map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                })
            })
            .reduce((combinedArray, el) => {
                return combinedArray.concat(el)
            }, []);
        // console.log(this.props.ingredients);
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Hãy chọn thành phần burger !!!</p>
        }
        // console.log(this.transformedIngredients);
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type='BreadTop' />
                {transformedIngredients}
                <BurgerIngredient type='BreadBottom' />
            </div>
        );
    }
}

export default Burger;
