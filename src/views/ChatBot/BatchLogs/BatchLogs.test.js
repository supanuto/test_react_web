import React from 'react';
import ReactDOM from 'react-dom';
import BatchLogs from './BatchLogs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BatchLogs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
