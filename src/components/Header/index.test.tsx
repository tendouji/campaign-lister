import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { Header } from './';


const props = {
    title: 'Test Title',
};

describe('<Header />', () => {
    it('renders without crashing with props', () => {
        const wrapper = shallow(<Header {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot()
    });
});


