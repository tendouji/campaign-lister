import React from 'react';
import { createStore } from "redux";
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { appReducer } from "../../reducers";
import { DateSelector } from './';


describe('<DateSelector />', () => {
    const store = createStore(appReducer);
    const curDate = new Date('2019-11-09');
    const props = {
        store,
        setDateRange: () => null,
        appState: {
            dateRange: {
                startDate: curDate,
                endDate: curDate
            }
        }
    };

    it('renders without crashing based on mock date redux', () => {
        const wrapper = mount(<DateSelector {...props} />);

        wrapper.setState({ startDate: curDate, endDate: curDate }, () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    it('setDate is triggered when DateSelector input change', () => {
        const setDateFunc = jest.spyOn(DateSelector.prototype, 'setDate');

        const wrapper = mount(<DateSelector {...props} />);
        const dateInput = wrapper.find('input[type="text"].datepicker-input');
        dateInput.at(0).simulate('change', {
            target: { value: '12/12/2000' }
        });
        expect(setDateFunc).toHaveBeenCalled();
    });

    it('onClearDateRange is triggered when clearDateRange button is clicked', () => {
        const clearDateRangeFunc = jest.spyOn(DateSelector.prototype, 'onClearDateRange');

        const wrapper = mount(<DateSelector {...props} />);
        const clearDateRangeInput = wrapper.find('#clearDateRange');
        clearDateRangeInput.simulate('click');
        expect(clearDateRangeFunc).toHaveBeenCalled();
    });
});