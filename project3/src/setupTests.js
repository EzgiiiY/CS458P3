// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Enzyme from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//configure({ adapter: new Adapter() });
Enzyme.configure({ adapter: new Adapter() });

const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
        coords:{
            latitude: 39.8962167,
            longitude: 32.802122499999996
        }
        })))
};
global.navigator.geolocation = mockGeolocation;

global.navigator.permissions = {
    query: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ state: 'granted' })),
  };
