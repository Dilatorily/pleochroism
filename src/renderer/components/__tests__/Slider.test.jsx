import React from 'react';
import { shallow } from 'enzyme';

import Slider from '../Slider';

describe('Slider', () => {
  let onChange;
  let addEvents;
  let addEventListener;
  let removeEvents;
  let removeEventListener;

  beforeAll(() => {
    addEventListener = document.addEventListener;
    removeEventListener = document.removeEventListener;
  });

  beforeEach(() => {
    onChange = jest.fn();
    addEvents = {};
    removeEvents = {};
    document.addEventListener = jest.fn((event, callback) => {
      addEvents[event] = callback;
    });
    document.removeEventListener = jest.fn((event, callback) => {
      removeEvents[event] = callback;
    });
  });

  afterAll(() => {
    document.addEventListener = addEventListener;
    document.removeEventListener = removeEventListener;
  });

  it('should render without any errors', () => {
    expect(shallow(<Slider progress={0} />).is('.slider')).toBe(true);
  });

  describe('handleMouseDown', () => {
    it('should make the global document listen to mousemove events', () => {
      const component = shallow(<Slider progress={0} />);
      expect(addEvents.mousemove).toBeUndefined();

      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 0, offsetWidth: 1000 },
      };
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(addEvents.mousemove).toBeDefined();
    });

    it('should make the global document listen to mouseup events', () => {
      const component = shallow(<Slider progress={0} />);
      expect(addEvents.mouseup).toBeUndefined();

      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 0, offsetWidth: 1000 },
      };
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(addEvents.mouseup).toBeDefined();
    });

    it('should start dragging the slider', () => {
      const component = shallow(<Slider progress={0} />);
      expect(component.state('isDragging')).toBe(false);

      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 0, offsetWidth: 1000 },
      };
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(component.state('isDragging')).toBe(true);
    });

    it('should save the coordinates of the slider in the state', () => {
      const component = shallow(<Slider progress={0} />);
      expect(component.state('offsetLeft')).toBe(0);
      expect(component.state('offsetWidth')).toBe(0);

      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(component.state('offsetLeft')).toBe(200);
      expect(component.state('offsetWidth')).toBe(1000);
    });

    it('should not propagate the event', () => {
      const eventMouseDown = {
        preventDefault: jest.fn(),
        clientX: 0,
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      const component = shallow(<Slider progress={0} />);
      expect(eventMouseDown.preventDefault.mock.calls.length).toBe(0);

      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(eventMouseDown.preventDefault.mock.calls.length).toBe(1);
      expect(eventMouseDown.preventDefault.mock.calls[0]).toEqual([]);
    });

    it('should change the slider to 0 when it is located to the left of it', () => {
      const wrapper = shallow(<Slider onChange={onChange} progress={0} />);
      expect(onChange.mock.calls.length).toBe(0);

      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      wrapper.find('.slider').simulate('mousedown', eventMouseDown);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0]).toEqual([0]);
    });

    it('should change the slider to 100 when it is located to the right of it', () => {
      const wrapper = shallow(<Slider onChange={onChange} progress={0} />);
      expect(onChange.mock.calls.length).toBe(0);

      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 1400,
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      wrapper.find('.slider').simulate('mousedown', eventMouseDown);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0]).toEqual([100]);
    });

    it('should change the slider to the correct position when it is located somewhere on it', () => {
      const wrapper = shallow(<Slider onChange={onChange} progress={0} />);
      expect(onChange.mock.calls.length).toBe(0);

      const eventMouseDown = {
        preventDefault: () => {},
        clientX: Math.floor((Math.random() * 988) + 206),
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      wrapper.find('.slider').simulate('mousedown', eventMouseDown);
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange.mock.calls[0]).toEqual([100 * ((eventMouseDown.clientX - 206) / 988)]);
    });
  });

  describe('handleMouseUp', () => {
    it('should make the global document to stop listening to mousemove events', () => {
      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 0, offsetWidth: 1000 },
      };
      const component = shallow(<Slider progress={0} />);
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(removeEvents.mousemove).toBeUndefined();

      addEvents.mouseup();
      expect(removeEvents.mousemove).toBeDefined();
    });

    it('should make the global document to stop listening to mouseup events', () => {
      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 0, offsetWidth: 1000 },
      };
      const component = shallow(<Slider progress={0} />);
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(removeEvents.mouseup).toBeUndefined();

      addEvents.mouseup();
      expect(removeEvents.mouseup).toBeDefined();
    });

    it('should stop dragging the slider', () => {
      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 0, offsetWidth: 1000 },
      };
      const component = shallow(<Slider progress={0} />);
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(component.state('isDragging')).toBe(true);

      addEvents.mouseup();
      expect(component.state('isDragging')).toBe(false);
    });
  });

  describe('handleChange', () => {
    it('should not propagate the event', () => {
      const eventMouseDown = {
        preventDefault: jest.fn(),
        clientX: 0,
        currentTarget: { offsetLeft: 0, offsetWidth: 1000 },
      };
      const eventMouseMove = { preventDefault: jest.fn(), clientX: 0 };
      const component = shallow(<Slider onChange={onChange} progress={0} />);
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(eventMouseMove.preventDefault.mock.calls.length).toBe(0);

      addEvents.mousemove(eventMouseMove);
      expect(eventMouseMove.preventDefault.mock.calls.length).toBe(1);
      expect(eventMouseMove.preventDefault.mock.calls[0]).toEqual([]);
    });

    it('should change the slider to 0 when it is located to the left of it', () => {
      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      const component = shallow(<Slider onChange={onChange} progress={0} />);
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(onChange.mock.calls.length).toBe(1);

      const eventMouseMove = { preventDefault: () => {}, clientX: 0 };
      addEvents.mousemove(eventMouseMove);
      expect(onChange.mock.calls.length).toBe(2);
      expect(onChange.mock.calls[1]).toEqual([0]);
    });

    it('should change the slider to 100 when it is located to the right of it', () => {
      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      const component = shallow(<Slider onChange={onChange} progress={0} />);
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(onChange.mock.calls.length).toBe(1);

      const eventMouseMove = { preventDefault: () => {}, clientX: 1400 };
      addEvents.mousemove(eventMouseMove);
      expect(onChange.mock.calls.length).toBe(2);
      expect(onChange.mock.calls[1]).toEqual([100]);
    });

    it('should change the slider to the correct position when it is located somewhere on it', () => {
      const eventMouseDown = {
        preventDefault: () => {},
        clientX: 0,
        currentTarget: { offsetLeft: 200, offsetWidth: 1000 },
      };
      const component = shallow(<Slider onChange={onChange} progress={0} />);
      component.find('.slider').simulate('mousedown', eventMouseDown);
      expect(onChange.mock.calls.length).toBe(1);

      const eventMouseMove = {
        preventDefault: () => {},
        clientX: Math.floor((Math.random() * 988) + 206),
      };
      addEvents.mousemove(eventMouseMove);
      expect(onChange.mock.calls.length).toBe(2);
      expect(onChange.mock.calls[1]).toEqual([100 * ((eventMouseMove.clientX - 206) / 988)]);
    });
  });
});
