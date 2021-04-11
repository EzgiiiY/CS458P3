import React from 'react';
import { shallow, mount } from 'enzyme';
import CityLocator from '../CityLocator';
import { waitForState } from 'enzyme-async-helpers';
import GeoLocator from '../GeoLocator';


describe('GeoLocator', () => {
    let container;

    beforeEach(() => container = shallow(<GeoLocator />));

    it('should render a <div />', () => {
        expect(container.find('div').length).toEqual(1);
    });

    it("should render instances of the CityLocatorButton component", () => {
        expect(container.find("GeoLocatorButton").length).toEqual(1)
    })

});

describe('mounted GeoLocator', () => {
    let container;

    beforeEach(() => (container = mount(<GeoLocator />)));


    it('invokes locateCity when the CityLocatar button is clicked', () => {
        const spy = jest.spyOn(container.instance(), 'locate');
        container.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        //cityLocatorButton butonunun className'i geo-locate olmalı
        container.find('.geo-locate').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

}); 