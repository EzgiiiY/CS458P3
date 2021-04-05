import React from 'react';
import { shallow, mount } from 'enzyme';
import CityLocator from '../CityLocator';

describe('City Locator', () => {
  let container;

  beforeEach(() => container = shallow(<CityLocator />));

  it('should render a <div />', () => {
    expect(container.find('div').length).toEqual(1);
  });

  it("should render instances of the CityLocatorButton component", () => {
    expect(container.find("CityLocatorButton").length).toEqual(1)
  })

  it("should render instances of the CityLocatorTextInput component", () => {
    expect(container.find("CityLocatorTextInput").length).toEqual(2)
  });

});

describe('mounted CityLocator', () => {
  let container;

  beforeEach(() => (container = mount(<CityLocator />)));

  it('invokes locateCity when the CityLocatar button is clicked', () => {
    const spy = jest.spyOn(container.instance(), 'locateCity');
    container.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    //cityLocatorButton butonunun className'i locate-city olmalı
    container.find('.locate-city').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  {/*
    it('invokes change when the CityLocatorTextInput is modified.', () => {
      //text input un class-name i latitude olmalı
      container.find('.latitude').simulate('change', { target: { name: 'width', value: 50 } });
      expect(container.find('.latitude').prop('value')).toEqual(50);
    });
  */}
});
