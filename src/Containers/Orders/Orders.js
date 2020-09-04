import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axionOrder';
import catchErrorAxios from '../../HOC/catchErrorAxios';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../Store/Action/actionRoot';

class Orders extends Component {

    componentDidMount() {
        this.props.getFetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let result = this.props.loading ? <Spinner /> : <p>Chưa có dữ liệu</p>
        if (this.props.orders) {
            result = this.props.orders.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={order.totalPrice} />
            })
        }
        return (
            <div>
                {result}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getFetchOrders: (token,userId) => dispatch(actions.fetchOrder(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(catchErrorAxios(Orders, axios));
