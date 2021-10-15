import React from 'react';
import ReactDOM from 'react-dom';
import LineUserUnLocks from './LineUserUnLocks';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LineUserUnLocks />, div);
  ReactDOM.unmountComponentAtNode(div);
});
