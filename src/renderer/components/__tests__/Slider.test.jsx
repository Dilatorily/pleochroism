import React from 'react';
import { shallow } from 'enzyme';

import Slider from '../Slider';

describe('Slider', () => {
  it('should render without any errors', () => {
    expect(shallow(<Slider />).is('.slider')).toBe(true);
  });
});
