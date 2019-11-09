import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { appReducer } from "./reducers";
import App from './App';


const store = createStore(appReducer);

describe('<App />', () => {
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
});

