import React from 'react';
import { ListItem } from 'react-native-elements';

// Use PureComponent to avoid unnecessary render.
export default class contactListItem extends React.PureComponent {
  render()  {
    return <ListItem {...this.props} />;
  }
}
