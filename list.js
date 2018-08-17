import React from 'react';
import {
  Animated,
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';


export default class list extends React.Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  render()  {
    const {
      children
    } = this.props;
  
    return (  
      <View>
        <Animated.View style={styles.collapsibleHeaderContainer}>
          {children}
        </Animated.View>

        <FlatList

        />
      </View>
    );
  }
  
}


const styles = StyleSheet.create({
  collapsibleHeaderContainer: {
  
  },
  
});


list.PropTypes = {

};

list.defaultProps = {

};
