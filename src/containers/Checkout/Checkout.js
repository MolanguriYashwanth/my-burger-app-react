import React,{Component} from 'react';
import {connect} from "react-redux";
import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import * as actionTypes from "../../store/actions/actions";
class Checkout extends Component{
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(<div>
            <CheckoutSumary 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ings}/>
            <Route path={this.props.match.path + '/contact-data'}
            component={ContactData}
            />
            {/* component={ContactData}/> */}
        </div>)
    }
}
const mapStateToProps = (state) => {
    
    return {
        ings: state.ingredients,
        totalPrice:state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);