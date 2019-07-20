import React, { Component } from 'react';
import Auxilary from '../..//hoc/Auxilary/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENTS_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    meat: 1.3,
    cheese: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false
    }

    updatePurchasable () {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
        .map((igKey)=>{return ingredients[igKey]})
        .reduce((sum,el)=>{return sum +el},0);
        this.setState({purchasable:sum>0})
    }
    purchaseHandler =() =>{
        this.setState({purchasing:true})
    }

    addIngredientsHandler = (type)=> {
        let oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        let OldPrice = this.state.totalPrice;
        let updatedPrice = OldPrice + INGREDIENTS_PRICES[type]
        this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients},()=>{
            this.updatePurchasable()
        })
    }

    removeIngredientHandler =(type)=>{
        let oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return ;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        let OldPrice = this.state.totalPrice;
        let updatedPrice = OldPrice - INGREDIENTS_PRICES[type]
        this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients},()=>{this.updatePurchasable()})
    }
    modalHandler =()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{

        alert('You Continue!');

    }
    render() {
        const disabledInfo={...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key]<=0)
        }
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.modalHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    modalClosed={this.modalHandler}
                    continueClicked={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
                    </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                price={this.state.totalPrice}
                removeIngredient={this.removeIngredientHandler}
                disabledInfo ={disabledInfo}
                purchasable={this.state.purchasable}
                purchasing={this.purchaseHandler}
                addIngredient={this.addIngredientsHandler}/>
            </Auxilary>
        );
    }
}

export default BurgerBuilder;