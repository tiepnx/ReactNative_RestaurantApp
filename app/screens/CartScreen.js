/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { FlatList, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import Item from '../components/Checkout/Item';
import AppBase from '../base_components/AppBase';
import BillReceipt from '../components/Checkout/BillReceipt';
import BR from '../base_components/BR';
import ViewRow from '../base_components/ViewRow';
import PrimaryText from '../base_components/PrimaryText';
import { deleteCartItem, fetchCartItems, updateCartItemQty } from '../../src/actions/cart';
import { createOrder } from '../../src/actions';
import { cleanCart } from '../../src/actions/cart';


const FooterContainer = styled.View`
  height: 10%;
  width: 100%;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PayButton = styled.TouchableOpacity`
  height: 100%;
  background-color: green;
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

const FooterText = styled(PrimaryText)`
  font-weight: bold;
  color: #eee;
  font-size: 16px;
`;


class CartScreen extends Component {
  componentDidMount() {
    this.props.fetchCartItems();
  }

 
  handleItemValueChange = (item, qty) => {
    if (qty === 0) {
      this.props.deleteCartItem(item._id);
    } else {
      this.props.updateCartItemQty(item._id, qty);
    }
  };

  handlePayment = (totalAmount) => {
    const { cartData } = this.props;
    if (cartData.length > 0) {
      const table = cartData[0].tableId
      const postData = cartData.map(item => ({
        id: item.food._id,
        quantity: item.qty,
        price: item.price,
      }));

      this.props.createOrder(postData, totalAmount, table);
      this.props.cleanCart();
    }
  };

  _renderItem = ({ item }) => (
    <Item
      key={item._id}
      name={item.food.name}
      price={`${item.price * item.qty}`}
      qty={item.qty}
      onChange={qty => this.handleItemValueChange(item, qty)}
    />
  );

  renderCartItems = (cartData) => {
    if (cartData.length > 0) {
      return (
        <FlatList
          style={{
            elevation: 2,
            borderWidth: 1,
            borderColor: '#fcfcfc',
          }}
          data={cartData}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
        />
      );
    }

    return (
      <ViewRow>
        <PrimaryText>
          Your Cart is empty.
        </PrimaryText>
      </ViewRow>
    );
  };

  renderBillReceipt = (billInfo) => {
    const { cartData } = this.props;

    if (cartData.length > 0) {
      return (
        <BillReceipt
          style={{
            borderTopWidth: 4,
            borderTopColor: '#eee',
          }}
          billInfo={billInfo}
        />
      );
    }
    return null;
  };

  renderFooter = (totalAmount) => {
    const { cartData } = this.props;

    if (cartData.length > 0) {
      return (
        <FooterContainer>
          <PayButton
            onPress={() => {
              this.handlePayment(totalAmount);
              Actions.drawerClose();
              Actions.pop();
              Actions.pop();
            }
            }
          >
            <FooterText>
              Proceed To Pay
            </FooterText>
          </PayButton>
        </FooterContainer>
      );
    }
    return null;
  };

  render() {
    const { cartData } = this.props;

    let totalBill = parseFloat(cartData.reduce(
      (total, item) => total + (item.price * item.qty),
      0,
    ));

    const billInfo = [
      {
        name: 'Items Total',
        total: totalBill,
      },
    ];

    return (
      <AppBase
        style={{
          alignItems: 'stretch',
        }}
      >
        <ScrollView>
          <BR size={10} />
          {this.renderCartItems(cartData)}
          <BR />
          {this.renderBillReceipt(billInfo)}
          <BR />
        </ScrollView>
        {this.renderFooter(totalBill)}
      </AppBase>
    );
  }
}

CartScreen.defaultProps = {
  createdOrder: null,
};

CartScreen.propTypes = {
  cartData: PropTypes.array.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  fetchCartItems: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  createdOrder: PropTypes.object,
};


function initMapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
    createdOrder: state.orders.createdOrder,
  };
}

function initMapDispatchToProps(dipatch) {
  return bindActionCreators({
    deleteCartItem,
    fetchCartItems,
    updateCartItemQty,
    cleanCart,
    createOrder,
  }, dipatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CartScreen);
