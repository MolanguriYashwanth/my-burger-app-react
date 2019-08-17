import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHanlder from "../../../hoc/WithErrorHandler/WithErrorHandler";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'

                },
                validation: {
                    required: true
                },
                valid: false,
                value: '',
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                validation:{},
                value: '',
                valid: true,

            },
        },
        formIsValid:false,
        loading: false
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length >= rules.maxLength && isValid
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {}
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement]['value']
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('build/orders', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(e => {
                this.setState({ loading: false })
            });
    }
    inputChangedListner = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updateFormElement;

        let formIsValid=true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier]['valid'] && formIsValid
        }
        this.setState({ orderForm: updatedOrderForm,formIsValid:formIsValid });
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]

            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement =>
                    (
                        <Input elementType={formElement.config.elementType}
                            onChangeListner={event =>
                            this.inputChangedListner(event, formElement.id)}
                            inValid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            elementConfig={formElement.config.elementConfig}
                            touched={formElement.config.touched}
                            value={formElement.config.value}
                            key={formElement.id} />
                    ))}
                <Button btnType="Success" formIsValid={this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        )
    }
}
export default withErrorHanlder(ContactData, axios);