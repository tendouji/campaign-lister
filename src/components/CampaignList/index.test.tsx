import React from 'react';
import { createStore } from "redux";
import { mount, shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { appReducer } from "../../reducers";
import { CampaignList } from './';
import {DateSelector} from "../DateSelector";
import {App} from "../../App";


describe('<DateSelector />', () => {
    const store = createStore(appReducer);
    const mockData = [
        {"id":1,"name":"Campaign AAA 1","startDate":"1/1/2018","endDate":"12/31/2018","budget":999999},
        {"id":2,"name":"Campaign AAA 2","startDate":"1/1/2019","endDate":"12/31/2020", "budget":999999},
        {"id":3,"name":"Campaign BBB","startDate":"1/1/2019","endDate":"12/31/2020","budget":999999},
    ];
    const mockSearchKey = 'AAA';
    const mockStartDate = new Date('1/1/2019');
    const mockEndDate = new Date('12/31/2019');

    const props = {
        store,
        campaigns: mockData,
        appState: {
            searchKey: '',
            dateRange: { }
        }
    };

    it('renders without crashing', () => {
        const wrapper = mount(<CampaignList {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('filter campaigns correctly based on searchKey', () => {
        const wrapper = mount(<CampaignList {...props} />);
        const instance = (wrapper.instance() as CampaignList);

        const result = instance.filterCampaignsBySearchKey(mockSearchKey);
        expect(result.length).toEqual(2);
    });

    it('filter campaigns correctly based on dateRange', () => {
        const wrapper = mount(<CampaignList {...props} />);
        const instance = (wrapper.instance() as CampaignList);

        const result = instance.filterCampaignsByDateRange(mockStartDate, mockEndDate);
        expect(result.length).toEqual(2);
    });

    it('filter campaigns correctly based on searchKey and dateRange', () => {
        const wrapper = mount(<CampaignList {...props} />);

        const instance = (wrapper.instance() as CampaignList);
        const dateRangeResult = instance.filterCampaignsByDateRange(mockStartDate, mockEndDate);
        wrapper.setProps({
            ...props,
            appState: {
                ...props.appState,
                dateRange: {
                    startDate: mockStartDate,
                    endDate: mockEndDate
                }
            }
        }, () => {
            wrapper.setState({ filteredCampaigns: dateRangeResult }, () => {
                const result = instance.filterCampaignsBySearchKey('AAA');
                expect(result.length).toEqual(1);
            });
        });
    });
});