import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { appReducer } from "./reducers";
import { App } from './App';


describe('<App />', () => {
    const store = createStore(appReducer);
    const props = {
        store,
        setDateRange: jest.fn(),
        setSearchKey: jest.fn(),
        storeCampaignData: jest.fn(),
        appState: {
            snackBarDisplay: {}
        }
    };

    it('renders without crashing', () => {
        const wrapper = shallow(<Provider store={store}><App /></Provider>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders children when passed in', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <App>
                    <div className="test-element" />
                </App>
            </Provider>
        );
        expect(wrapper.contains(<div className="test-element" />)).toEqual(true);
    });

    it('storeCampaignData will be triggered when storeCampaigns is called', () => {
        const wrapper = shallow(<App {...props} />);

        const instance = (wrapper.instance() as App);
        instance.storeCampaigns([]);

        expect(props.storeCampaignData.mock.calls.length).toBe(1);
    });
});

