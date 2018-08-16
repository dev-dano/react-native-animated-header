import React from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';

import ContactListItem from '../components/contactListItem';


export default class contactList extends React.Component {
  state = {};
  
  _keyExtractor = (item, index) => {
  
  };

  _renderItem = ({ item }) => {
    
  };
   
  render()  {
    return (
      <View style={styles.container}>
        // Search bar
      
        <FlatList
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );   
  }
  
}


const styles = StyleSheet.create({
  container: {
    
  }
  
});
