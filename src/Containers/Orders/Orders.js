import React, { Component } from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axionOrder';
import catchErrorAxios from '../../HOC/catchErrorAxios';
import Aux from '../../HOC/Auxx';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: null,
        loading: true
    }
    componentDidMount() {
        axios.get('order.json')
            .then(res => {
                let fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({ ...res.data[key], id: key })
                }
                this.setState({ orders: fetchOrders, loading: false })
            })
            .catch(er => {
                console.log(er.message);
            })
    }
    render() {
        let result = <p>Chưa có dữ liệu ... </p>
        if(this.state.orders){
            result = (
                <div>
                    {this.state.orders.map(order => {
                        return <Order 
                            key={order.id} 
                            ingredients = {order.ingredients}
                            totalPrice = {order.totalPrice} />
                    })}
                </div>
            )
        }
        if (this.state.loading) {
            result = <Spinner />
        }
        return (
            <Aux>
                {result}
            </Aux>
        );
    }
}

export default catchErrorAxios(Orders, axios);
