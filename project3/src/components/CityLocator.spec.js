import React from 'react';
import { shallow } from 'enzyme';
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

});