import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { FilterBar } from './';
import SearchInput from "../SearchInput";
import DatePicker from "../DatePicker";


describe('<FilterBar />', () => {
    const wrapper = shallow(<FilterBar />);

    it('renders without crashing', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders the correct child components', () => {
        expect(wrapper.find(SearchInput)).toHaveLength(1);
        expect(wrapper.find(DatePicker)).toHaveLength(1);
    });
});