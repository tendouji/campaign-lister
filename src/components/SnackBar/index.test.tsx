import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import SnackBar from './';


describe('<SnackBar />', () => {
    const props = {
        show: true,
        message: 'Test Message',
    };

    it('renders without crashing with props', () => {
        const wrapper = shallow(<SnackBar {...props} />);
        expect(wrapper.hasClass('show')).toEqual(true);
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    it('move out of screen when close button is clicked', () => {
        const wrapper = shallow(<SnackBar {...props} />);
        wrapper.setProps({
            close: () => wrapper.setProps({ show: false })
        });

        const closeBtn = wrapper.find('.close');
        closeBtn.simulate('click');

        expect(wrapper.hasClass('show')).toEqual(false);
    });
});