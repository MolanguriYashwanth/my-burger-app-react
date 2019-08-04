import React,{Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHanlder from "../../../hoc/WithErrorHandler/WithErrorHandler";

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({ loading: true });
          const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'sai',
                address: {
                    street: 'Test street',
                    zipCode: '24479',
                    country: 'India'
                },
                email: 'test@j.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('build/orders', order)
            .then(response => {
                this.setState({ loading: false})
                this.props.history.push('/');
            })
            .catch(e => {
                this.setState({ loading: false })
            });
    }
    render(){
        let form =(
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input  className={classes.Input} type="text" name="postalcode" placeholder="Postal COde"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        )
        if(this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            
            </div>
        )
    }
}
export default withErrorHanlder(ContactData,axios);