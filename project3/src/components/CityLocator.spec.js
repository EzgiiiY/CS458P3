import React from 'react';
import { shallow, mount } from 'enzyme';
import CityLocator from '../CityLocator';
import { waitForState } from 'enzyme-async-helpers';


describe('City Locator', () => {
  let container;

  beforeEach(() => container = shallow(<CityLocator />));

  xit('should render a <div />', () => {
    expect(container.find('div').length).toEqual(1);
  });

  xit("should render instances of the CityLocatorButton component", () => {
    expect(container.find("CityLocatorButton").length).toEqual(1)
  })

  xit("should render instances of the text input component", () => {
    expect(container.find('input[type="text"]').length).toEqual(2)
  });


  xit('invokes change when the text input is modified.', () => {
    //text input un class-name i latitude olmalı
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 39.9334 } });
    expect(container.state('latitude')).toEqual(39.9334);

    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 32.8597 } });
    expect(container.state('longitude')).toEqual(32.8597);
    });  

});

describe('mounted CityLocator', () => {
  let container;

  beforeEach(() => (container = mount(<CityLocator />)));
  

  xit('invokes locateCity when the CityLocatar button is clicked', () => {
    const spy = jest.spyOn(container.instance(), 'locateCity');
    container.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    //cityLocatorButton butonunun className'i locate-city olmalı
    container.find('.locate-city').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  }); 

  xit('checks when the valid coordinates are entered it gives the correct city', async() => {
    //text input un class-name i latitude olmalı
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 37.000000 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 35.321335 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data = container.state('city');
    expect(data).toEqual("Adana");
    //expect(container.find(".result-text-geoc").text()).toContain("Adana");

    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 39.9334 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 32.8597 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data1 = container.state('city');
    expect(data1).toEqual("Ankara");
    expect(container.find(".result-text-geoc").text()).toContain("Ankara");

    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 39.6078 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 32.0837 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data2 = container.state('city');
    expect(data2).toEqual("Ankara");
    
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: 40.7485 } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 40.2424 } });
    container.find('.locate-city').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data3 = container.state('city');
    expect(data3).toEqual("Trabzon");
    expect(container.find(".result-text-geoc").text()).toContain("Trabzon");

    }); 
    
  //it checks when the invalid input is entered it gives error
  xit('Invalid input test', async() => {
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: "abc" } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: 40.2424 } });
    container.find('.locate-city').first().simulate('click');

    await waitForState(container, state => state.loading === false);
    let data = container.state('validLat');
    expect(data).toEqual(false);
    expect(container.find(".error-lat").exists()).toBeTruthy();
    
    container.find('input[type="text"]').first().simulate('change', { target: { name: 'latitude', value: "39.6078" } });
    container.find('.longitude').simulate('change', { target: { name: 'longitude', value: "&!" } });
    container.find('.locate-city').first().simulate('click');

    await waitForState(container, state => state.loading === false);
    let data2 = container.state('validLong');
    expect(data2).toEqual(false);
    expect(container.find(".error-long").exists()).toBeTruthy();

  }); 
    
});


