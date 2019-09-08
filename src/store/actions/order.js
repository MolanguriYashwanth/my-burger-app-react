import * as actionTypes from "./actions";
import axios from "../../axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData

    }
}
export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error

    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('build/orders', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.insertedId, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            });
    }
}

export const purchaseInit = () => {
    return { type: actionTypes.PURCHASE_INIT }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/build/getburgers').then((response) => {
            console.log('response', response.data);
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(fetchOrdersSuccess(response.data))

            //        this.setState({loading:false,orders:response.data})
        }).catch((err) => {
            dispatch(fetchOrdersFailed(err))
            //this.setState({loading:false})
        })
    }
}