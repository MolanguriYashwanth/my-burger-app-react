import React, { Component } from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
class Orders extends Component {

    state ={
            orders:[],
            loading:true
    }
    componentDidMount(){
        axios.get('/build/getburgers').then((response) => {
            console.log('response',response.data);
            this.setState({loading:false,orders:response.data})
        }).catch((err)=>{
            this.setState({loading:false})
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order=>
                    (<Order 
                        ingredients={order.ingredients}
                        price={order.price}
                        key={order['_id']}/>)
                )}
                {/* <Order/>
                <Order/> */}
            </div>
        );
    }
}

export default Orders;