import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Header } from './';


describe('<Header />', () => {
    it('renders without crashing with props', () => {
        const props = {
            title: 'Test Title',
        };

        const wrapper = shallow(<Header {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});


