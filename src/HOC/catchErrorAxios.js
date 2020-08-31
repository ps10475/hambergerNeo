import React, { Component } from 'react';
import Aux from './Auxx';
import Modal from '../Components/UI/Modal/Modal';

const catchErrorAxios = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, er => {
                this.setState({
                    error: er.message
                })
            })
        }

        closeModalHandle = () => {
            this.setState({
                error: null
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        closePurchase={this.closeModalHandle}
                    >
                        <p>{this.state.error} </p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default catchErrorAxios;
