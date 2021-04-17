import React from 'react';
import { shallow, mount } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
import GeoLocator from '../GeoLocator';


describe('GeoLocator', () => {
    let container;

    beforeEach(() => container = shallow(<GeoLocator />));

    it('should render a <div />', () => {
        expect(container.find('div').length).toEqual(1);
    });

    it("should render instances of the GeoLocatorButton component", () => {
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

    it('invokes locate when the GeoLocator button is clicked', () => {
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

       let text = await driver.findElement(By.className("latitude-city"))
       .then(element=>element.getText())
        expect(text).toContain("39.9");
        let text2 = await driver.findElement(By.className("latitude-device"))
       .then(element=>element.getText())
        expect(text2).toContain("39.9");
        let text3 = await driver.findElement(By.className("longitude-city"))
       .then(element=>element.getText())
        expect(text3).toContain("32.9");
        let text4 = await driver.findElement(By.className("longitude-device"))
       .then(element=>element.getText())
        expect(text4).toContain("32.8");
        let text5 = await driver.findElement(By.className("result-text-geol"))
       .then(element=>element.getText())
        expect(text5).toContain("6.42");
    });
    

}); 