# react-native-list

Native ScrollView provides the option to stop scrolling while header is expending or collapsing.<br>
List component allows you to acheive the same effect in hacky but reliable way.

<img src='https://github.com/dev-dano/react-native-list/blob/master/example/Demo.gif?raw=true' width="25%" height="25%">

## Example
1. Passing header component as a prop.
```js
import React from 'react';
import { ... } from 'react-native';
import List from './src/list';

/**
 * Minimal example showing how to use List Component.
 * Detailed example will be available soon!
 */
export default home extends React.Component {
  
  ...
  
  render() {  
    return (
      <List
        data          = {this.state.data}
        keyExtractor  = {this._keyExtractor}
        renderItem    = {this._renderItem}
        
        minHeight     = {this.minHeight}
        maxHeight     = {this.maxHeight}>
        
        <SearchBar
          ...
        />
      </List>
    );
  } 

}
```

2. Using navigation header (react-navigation)
```js
import React from 'react';
import { ... } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import List from './src/list';

export default home extends React.Component {
  static navigationOptions = {{ navigation }} => {  
    const {
      interpolatedValue
    } = navigation.state.params;
    
    return {
      ...
    }; 
  };
  
  ...
  
  componentDidMount() {
    const interpolatedValue = this.listRef.getScrollAnimatedValue().interpolate({
      // Interpolate it however you want.
    });
  
    this.props.navigation.setParams({
      interpolatedValue
    });
  }
  
  ...
  
  render() {  
    return (
      <List
        ref           = {ref => { this.listRef = ref }}
        data          = {this.state.data}
        keyExtractor  = {this._keyExtractor}
        renderItem    = {this._renderItem}
       />
    );
  } 

}
```
