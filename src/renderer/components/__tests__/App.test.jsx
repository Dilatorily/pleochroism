import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('<App />', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).contains(<h1>Hello, World with hot reloading?!</h1>)).toBe(true);
  });
});
