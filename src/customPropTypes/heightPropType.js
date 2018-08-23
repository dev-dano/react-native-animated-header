const heightPropType = (props, propName, componentName) => {
  const prop = props[propName];
  
  const propSupplied = (prop !== undefined);
  const propIsNaN = isNaN(prop);
  const childrenSupplied = (props['children'] !== undefined);
  
  if (childrenSupplied && propSupplied) {
    if (propIsNaN)
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
  } else if (childrenSupplied)  {
      return new Error(
        '`' + propName + '` is required with prop `children`.'
      ); 
  } else if (propSupplied)  {
      return new Error(
        '`' + propName + '` is only required with prop `children` supplied.'
      );
  }
  
};

export default heightPropType;
