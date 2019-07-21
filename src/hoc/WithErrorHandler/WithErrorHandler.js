
import React,{Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Auxilary from "../Auxilary/Auxilary";
const WithErrorHandler = (WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        }
        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err})
            })
        }
        errConfirmedHandler =()=>{
            this.setState({error:null})
        }
        render(){
            return (
                <Auxilary>
                    <Modal show={this.state.error}
                    modalClosed={this.errConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                <WrappedComponent {...this.props}/>
                </Auxilary>
            )
        }
        
    }
}
export default WithErrorHandler;