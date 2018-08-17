import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import List from '../../../list';
import ContactListItem from '../components/contactListItem';


export default class contactList extends Component {
  //state = {};
  
  _keyExtractor = (item, index) => {
  
  };

  _renderItem = ({ item }) => {
    
  };
   
  render()  {
    return (
      <List
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}>
        // Search bar
      </List>
    
    );   
  }
  
}


const styles = StyleSheet.create({

});
