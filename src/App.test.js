/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

beforeAll(() => {
  window.getSelection = () => {
    return {
      removeAllRanges: () => {}
    };
  };
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
