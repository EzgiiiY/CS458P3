import React from 'react';
import { shallow, mount } from 'enzyme';
import CityLocator from '../CityLocator';
import { waitForState } from 'enzyme-async-helpers';


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

  it('checks when the valid coordinates are entered it gives the correct city', async() => {
    //text input un class-name i latitude olmalı
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 37.000000 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 35.321335 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data = container.state('city');
    expect(data).toEqual("Adana");

    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 39.9334 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 32.8597 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data = container.state('city');
    expect(data).toEqual("Ankara");

    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 39.6078 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 32.0837 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data = container.state('city');
    expect(data).toEqual("Ankara");
    
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 40.7485 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 40.2424 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data = container.state('city');
    expect(data).toEqual("Ankara");

    }); 
    
    //it checks when the invalid input is entered it gives error
    it('Invalid input test', () => {
      container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: "abc" } });
      container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 40.2424 } });
      container.find('.locate-city').first().simulate('click');

      await waitForState(container, state => state.loading === false);
      let data = container.state('validLat');
      expect(data).toEqual(false);

      expect(container.find("p").exists()).toBeTruthy();

    }); 
    
});


