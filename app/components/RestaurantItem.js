/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Assets from '../../src/constants/assets';
import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';

const RestaurantItem = ({ restaurant, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.6}
  >
    <View
      key={restaurant._id}
      style={{
        width: '100%',
        minHeight: 180,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
    >      
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <PrimaryText size={20} align="left" style={{ marginBottom: 0 }}>
          {restaurant.name}
        </PrimaryText>
        {/* <SecondaryText>
          {restaurant.details}
        </SecondaryText> */}
      </View>
      <Image
        source={Assets.Images.placeholderRestaurant}
        style={{
          width: '100%',
          height: 150,
          marginBottom: 30,
        }}
        resizeMode="contain"
      />
    </View>
  </TouchableOpacity>
);

RestaurantItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};


export default RestaurantItem;
