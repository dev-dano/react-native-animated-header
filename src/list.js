import React from 'react';
import {
  Animated,
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import heightPropType from './customPropTypes/heightPropType';


export default class list extends React.PureComponent {
  constructor(props)  {
    super(props);  
    this.state = {
      animatedValue: new Animated.Value(0),
      enableSnapAnimation: true
    };
  }

  
  componentDidMount() {
    this.state.animatedValue.addListener(({ value }) => {
      this._scrollVal = value;
    });
  }
  
  componentWillUnmount()  {
    this.state.animatedValue.removeAllListeners();
  }
  
  
  /**
   * Return a reference for animatedValue.
   * It can be interpolated and used to animate headers from third party libraries (Ex: react-navigation)
   */
  getScrollAnimatedValue = () => this.state.animatedValue;


  /**
   * Disable snap animation unless content size is big enough to fill screen.
   */ 
  _verifyContentSize = ({ contentSize, layoutMeasurement: { height } }) => {
    const enableSnapAnimation = (contentSize.height > height) ? true : false;
    this.setState({ enableSnapAnimation });
  };

  /**
   * Disable snap animation unless content size is big enough to fill screen.
   */ 
  _onScrollBeginDrag = ({ nativeEvent }) => {
    this._verifyContentSize(nativeEvent);
    this._clearDelayedAnimation();
  };

  /**
   * onScrollAnimatonEnd is deprecated. Alternative approach to detect animation end point.
   */ 
  _fireDelayedAnimation = () => {
    // 100ms delay provides smooth animation and enough wait time (inMomentumScrollBegin usually fires within 1ms if there is a glide)
    this.scrollAnimationEndTimer = setTimeout(this._headerSnapAnimation, 100);
  };

  _clearDelayedAnimation = () => {
    this.scrollAnimationEndTimer && clearTimeout(this.scrollAnimationEndTimer);
  };

  _fireAnimation = () => {
    this._headerSnapAnimation();
  };

  _headerSnapAnimation = () => {
    const { minHeight, maxHeight } = this.props;
    
    if(this._scrollVal > 0 && this._scrollVal < maxHeight) {
      const toValue = (this._scrollVal < maxHeight/2) ? minHeight : maxHeight;

      this.flatListRef.getScrollResponder().scrollTo({y: toValue});
    }
  };
  
  
  render()  {
    const {
      minHeight,
      maxHeight,
      containerStyle,
      children,
      ...attributes
    } = this.props;
    
    
    const renderCollapsibleHeader = () => {
      
      // If animatedValue has not been interpolated.
      if (!this._interpolatedValue) {
        const { minHeight, maxHeight } = this.props;
        
        // Used to expand/collapse header
        this._interpolatedValue = this.state.animatedValue.interpolate({
          inputRange: [0, maxHeight],
          outputRange: [minHeight, -maxHeight],
          extrapolate: 'clamp'
        });
      }
      
      return (
        <Animated.View
          style={[
            styles.collapsibleHeader,
            { transform: [{ translateY: this._interpolatedValue }] }
          ]}>
          {children}
        </Animated.View>
      );
    }
    
    const renderListHeaderComponent = () => (
      <View style={{ height: maxHeight }} />
    );   
    
    const snapAnimationAttributes = this.state.enableSnapAnimation ? {
      onScrollEndDrag: this._fireDelayedAnimation,
      onMomentumScrollBegin: this._clearDelayedAnimation,
      onMomentumScrollEnd: this._fireAnimation
    } : {};
  
    
    return (  
      <View style={containerStyle}>      
        { children && renderCollapsibleHeader() }

        <FlatList
          ref={ref => { this.flatListRef = ref }}
          ListHeaderComponent={renderListHeaderComponent}
          onScroll={
            Animated.event([{
              nativeEvent: { contentOffset: { y: this.state.animatedValue } }
            }])
          }
          scrollEventThrottle={16}
          onScrollBeginDrag={this._onScrollBeginDrag}
          {...attributes}
          {...snapAnimationAttributes}
        />
      </View>
    );
  }
  
}


const styles = StyleSheet.create({
  collapsibleHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  } 
});

/**
 * children               : optional
 * minHeight & maxHeight  : required if children passed, otherwise ignored
 * containerStyle         : optional
 */
list.propTypes = {
  children: PropTypes.element,
  minHeight: heightPropType,
  maxHeight: heightPropType,
  containerStyle: PropTypes.any,
};

list.defaultProps = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  }
};
