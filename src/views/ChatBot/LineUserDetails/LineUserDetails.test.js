import React from 'react';
import ReactDOM from 'react-dom';
import LineUserDetails from './LineUserDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tables />, div);
  ReactDOM.unmountComponentAtNode(div);
});
