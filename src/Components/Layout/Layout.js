import React, { Component } from 'react';
import Aux from '../../HOC/Auxx';
import classes from './Layout.module.scss'
import Navigation from '../Navigation/Navigation';
import Sidedraw from '../Navigation/Sidedraw/Sidedraw';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSidedraw: false
    }

    sideDrawCloseHanlde = () => {
        this.setState({
            showSidedraw: false
        })
    }

    sideDrawToggleHandle = () => {
        this.setState((preState) => {
            return { showSidedraw: !preState.showSidedraw }
        })
        // this.setState({ showSidedraw : !this.state.showSidedraw })
    }

    render() {
        return (
            <Aux>
                <Navigation
                    isAuth={this.props.isAuth}
                    sideDrawToggle={this.sideDrawToggleHandle} />
                <Sidedraw
                    isAuth={this.props.isAuth}
                    closed={this.sideDrawCloseHanlde}
                    opened={this.state.showSidedraw} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);
