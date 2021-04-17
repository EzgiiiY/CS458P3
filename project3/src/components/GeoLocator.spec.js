import React from 'react';
import { shallow, mount } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
import GeoLocator from '../GeoLocator';


describe('GeoLocator', () => {
    let container;

    beforeEach(() => container = shallow(<GeoLocator />));

    xit('should render a <div />', () => {
        expect(container.find('div').length).toEqual(1);
    });

    xit("should render instances of the GeoLocatorButton component", () => {
        expect(container.find("GeoLocatorButton").length).toEqual(1)
    })

});

var webdriver = require('selenium-webdriver');
        var chrome = require('selenium-webdriver/chrome');
        var path = require('chromedriver').path;

        const driver = new webdriver.Builder()
            .withCapabilities({ browserName: 'chrome', chromeOptions: { w3c: false } })
            .build();
        const By = webdriver.By;
        const until = webdriver.until;
        const loginURL = "http://localhost:3000";
        jest.setTimeout(30000);

describe('mounted GeoLocator', () => {
    let container;
    
    beforeEach(() => {
        container = mount(<GeoLocator />);
    });

    xit('invokes locate when the GeoLocator button is clicked', () => {
        const spy = jest.spyOn(container.instance(), 'locate');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        //cityLocatorButton butonunun className'i geo-locate olmalı
        container.find('.geo-locate').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('Verifies that with a button click, true distance is calculated.', async() => {
        await driver.navigate().to(loginURL)
        .then(()=> driver.findElement(By.id("geo-locate")))
        .then(button=>button.click())
        .then(()=>driver.wait(until.elementLocated(By.className("result-text-geol"))))
        //container.find('.geo-locate').first().simulate('click');
        
        /*await waitForState(driver, state => state.loading === false);

        let data = container.state('latitudeCity');
        expect(data).toEqual(39.9333635);
        
        let data2 = container.state('latitudeDevice');
        expect(data2).toEqual(39.8962392);

        let data3 = container.state('longitudeCity');
        expect(data3).toEqual(32.8597419);

        let data4 = container.state('longitudeDevice');
        expect(data4).toEqual(32.802122499999996);

        let data5 = container.state('distance');
        expect(data5).toEqual(6.42);

        expect(container.find(".result-text-geol").exists()).toBeTruthy();
        */
       let text = await driver.findElement(By.className("result-text-geol"))
       .then(element=>element.getText())
        expect(text).toContain("6.42");
    });
    

}); 