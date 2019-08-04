import React, { Component } from 'react';
import Auxilary from '../..//hoc/Auxilary/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHanlder from "../../hoc/WithErrorHandler/WithErrorHandler";
const INGREDIENTS_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    meat: 1.3,
    cheese: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        axios.get('ingredients/').then((response) => {
            var responseOutput = response.data[0]; 
            delete responseOutput['_id'];
            this.setState({ ingredients: responseOutput })
        }).catch((err)=>{
            this.setState({error:true})
        })
    }

    updatePurchasable() {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
            .map((igKey) => { return ingredients[igKey] })
            .reduce((sum, el) => { return sum + el }, 0);
        this.setState({ purchasable: sum > 0 })
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    addIngredientsHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        let OldPrice = this.state.totalPrice;
        let updatedPrice = OldPrice + INGREDIENTS_PRICES[type]
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients }, () => {
            this.updatePurchasable()
        })
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        let OldPrice = this.state.totalPrice;
        let updatedPrice = OldPrice - INGREDIENTS_PRICES[type]
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients }, () => { this.updatePurchasable() })
    }
    modalHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {

        this.setState({ loading: true });
        //alert('You Continue!');
      

        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'./checkout',
            search:'?' +queryString
        })
            //'./checkout')
    }
    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        let orderSummary = null;
        let burger =this.state.error?<p>Ingredients can't be loaded</p>: <Spinner/>
        if(this.state.ingredients){
            burger = (<Auxilary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    removeIngredient={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler}
                    addIngredient={this.addIngredientsHandler} />
            </Auxilary>);
            orderSummary = <OrderSummary
            price={this.state.totalPrice}
            modalClosed={this.modalHandler}
            continueClicked={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
   
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.modalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

export default withErrorHanlder(BurgerBuilder, axios);