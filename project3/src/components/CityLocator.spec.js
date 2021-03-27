import React from 'react';
import { shallow } from 'enzyme';
import CityLocator from '../CityLocator';

describe('City Locator', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<CityLocator />));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it("should render instances of the CityLocatorButton component", () => {
    expect(container.find("CityLocatorButton").length).toEqual(1)
  })

});