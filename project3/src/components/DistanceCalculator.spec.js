import React from "react"
import { shallow, mount } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
import DistanceCalculator from "../DistanceCalculator"


describe('Distance Calculator', () => {
  let container;

  beforeEach(() => container = shallow(<DistanceCalculator />));

  it('should render a <div />', () => {
    expect(container.find('div').length).toEqual(1);
  });

  it("should render instances of the DistanceCalculatorButton component", () => {
    expect(container.find("DistanceCalculatorButton").length).toEqual(2)
  })

  it("should render instances of the text input component", () => {
    expect(container.find('input[type="text"]').length).toEqual(2)
  });

  it('invokes change when the text input is modified.', () => {
    //text input un class-name i latitude olmalı
    container.find('.latitude-c').simulate('change', { target: { name: 'latitude', value: 39.9334 } });
    expect(container.state('latitude')).toEqual(39.9334);

    container.find('.longitude-c').simulate('change', { target: { name: 'longitude', value: 32.8597 } });
    expect(container.state('longitude')).toEqual(32.8597);
  });

});

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

const driver = new webdriver.Builder()
  .withCapabilities({ browserName: 'chrome', chromeOptions: { w3c: false } })
  .build();
const By = webdriver.By;
const until = webdriver.until;
const url = "http://localhost:3000";


describe('mounted Distance Calculator', () => {
  let container;
  jest.setTimeout(30000);
  beforeEach(() => {
    container = mount(<DistanceCalculator />);
  });


  it('invokes locateCity when the CityLocatar button is clicked', () => {
    const spy = jest.spyOn(container.instance(), 'calculateDistance');
    container.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    //cityLocatorButton butonunun className'i locate-city olmalı
    container.find('.calculate-manual').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('checks when the valid coordinates are entered it gives the correct distance', async () => {
    //text input un class-name i latitude olmalı
    container.find('.latitude-c').simulate('change', { target: { name: 'latitude', value: 37.000000 } });
    container.find('.longitude-c').simulate('change', { target: { name: 'longitude', value: 35.321335 } });
    container.find('.calculate-manual').first().simulate('click');
    await waitForState(container, state => state.loading === false);

    let data = container.find(".result-text-distance").text();;
    expect(data).toContain("6370.4"); //adana distance to center of earth

  });

  it('invokes locate when the Distance Calculator Automatic button is clicked', () => {
    const spy = jest.spyOn(container.instance(), 'locate');
    container.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    //DistanceCalculator butonunun className'i calculate-automatic olmalı
    container.find('.calculate-automatic').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

   //it checks when the invalid input is entered it gives error
   it('Invalid input test', async() => {
    container.find('.latitude-c').simulate('change', { target: { name: 'latitude', value: "abc" } });
    container.find('.longitude-c').simulate('change', { target: { name: 'longitude', value: 40.2424 } });
    container.find('.calculate-manual').first().simulate('click');

    await waitForState(container, state => state.loading === false);
    let data = container.state('validLat');
    expect(data).toEqual(false);
    expect(container.find(".error-lat-c").exists()).toBeTruthy();
    
    container.find('.latitude-c').simulate('change', { target: { name: 'latitude', value: "39.6078" } });
    container.find('.longitude-c').simulate('change', { target: { name: 'longitude', value: "&!" } });
    container.find('.calculate-manual').first().simulate('click');

    await waitForState(container, state => state.loading === false);
    let data2 = container.state('validLong');
    expect(data2).toEqual(false);
    expect(container.find(".error-long-c").exists()).toBeTruthy();

  }); 

  //SELENIUM
  it('Verifies that with a button click, true distance is calculated.', async () => {
    await driver.navigate().to(url)
      .then(() => driver.findElement(By.id("calculate-automatic")))
      .then(button => button.click())
      .then(() => driver.wait(until.elementLocated(By.className("latitude-auto"))))

    let text = await driver.findElement(By.className("latitude-auto"))
      .then(element => element.getText())
    expect(text).toContain("39.9");

    let text4 = await driver.findElement(By.className("longitude-auto"))
      .then(element => element.getText())
    expect(text4).toContain("32.8");

    let text5 = await driver.findElement(By.className("result-text-distance"))
      .then(element => element.getText())
    expect(text5).toContain("6364");
  });

  


}); 