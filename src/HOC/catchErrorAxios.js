import React, { Component } from 'react';
import Aux from './Auxx';
import Modal from '../Components/UI/Modal/Modal';

const catchErrorAxios = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        }
        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({
                    error: null
                })
                return req
            })
            axios.interceptors.response.use(res => res , er => {
                this.setState({
                    error: er.message
                })
            })
        }

        closeModalHandle = () => {
            this.setState({
                error:null
            })
        }
        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error} 
                        closePurchase={this.closeModalHandle}
                        >
                        <p>{ this.state.error } </p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }  
}

export default catchErrorAxios;
