import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ModalPopup from './';


describe('<ModalPopup />', () => {
    const props = {
        show: true,
        title: 'Test Title',
        content: 'Test Message',
    };

    it('renders without crashing with props', () => {
        const wrapper = shallow(<ModalPopup {...props} />);
        expect(wrapper.hasClass('show')).toEqual(true);
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    it('move out of screen when close button is clicked', () => {
        const wrapper = shallow(<ModalPopup {...props} />);
        wrapper.setProps({
            close: () => wrapper.setProps({ show: false })
        });

        const closeBtn = wrapper.find('.close');
        closeBtn.simulate('click');

        expect(wrapper.hasClass('show')).toEqual(false);
    });
});