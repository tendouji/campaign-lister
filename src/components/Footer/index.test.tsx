import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { footerString } from "../../constants/text";
import { Footer } from './';


describe('<Footer />', () => {
    const wrapper = shallow(<Footer />);

    it('renders without crashing', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    it('renders without crashing', () => {
        const currentYear: number = (new Date()).getFullYear();
        expect(wrapper.text()).toEqual(footerString(currentYear));
    });
});


