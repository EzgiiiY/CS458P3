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

  it("should render instances of the text input component", () => {
    expect(container.find('input[type="text"]').length).toEqual(2)
  });


  it('invokes change when the text input is modified.', () => {
    //text input un class-name i latitude olmalı
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 50 } });
    expect(container.state('latitude')).toEqual(50);

    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 100 } });
    expect(container.state('longitude')).toEqual(100);
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

  it('checks when the valid coordinates entered gives the correct city', () => {
    //text input un class-name i latitude olmalı
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 37.000000 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 35.321335 } });
    container.find('.locate-city').first().simulate('click');

    
    expect(container.state('city')).toEqual("Adana");
    
    });  
    
});
