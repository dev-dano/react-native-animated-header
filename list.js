import React from 'react';
import {
  Animated,
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';


export default class list extends React.PureComponent {
  constructor(props)  {
    super(props);  
    this.state = {
      animatedValue: new Animated.Value(0),
      enableSnapAnimation: true
    };
  }
  
  // Used to expand/collapse header
  _interpolatedValue = this.state.animatedValue.interpolate({
    inputRange: [0, props.maxHeight],
    outputRange: [props.minHeight, -props.maxHeight],
    extrapolate: 'clamp'
  });

  
  componentDidMount() {
    this.state.animatedValue.addListener(({ value }) => {
      this._scrollVal = value;
    });
  }
  
  componentWillUnmount()  {
    this.state.animatedValue.removeAllListeners();
  }


  /**
   * Disable snap animation unless content size is big enough to fill screen.
   */ 
  _verifyContentSize = ({ contentSize, layoutMeasurement: height }) => {
    const enableSnapAnimation = (contentSize.height > height) ? ture : false;
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
    
    if(this._scrollValue > 0 && this._scrollValue < maxHeight) {
      const toValue = (this._scrollValue < maxHeight/2) ? minHeight : maxHeight;

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
    
    
    const renderCollapsibleHeader = () => (
      <Animated.View
        style={[
          styles.collapsibleHeader,
          { transform: [{ translateY: this._interpolatedValue }] }
        ]}>
        {children}
      </Animated.View>
    );
    
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


list.PropTypes = {
  containerStyle: PropTypes.any,
  children: PropTypes.element,
};

list.defaultProps = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  }
};
