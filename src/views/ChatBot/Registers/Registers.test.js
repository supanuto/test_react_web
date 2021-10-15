import React from 'react';
import ReactDOM from 'react-dom';
import Registers from './Registers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Registers />, div);
  ReactDOM.unmountComponentAtNode(div);
});
