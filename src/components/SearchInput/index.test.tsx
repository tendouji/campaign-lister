import React from 'react';
import { createStore } from "redux";
import {mount, shallow} from 'enzyme';
import toJson from "enzyme-to-json";
import { appReducer } from "../../reducers";
import { SearchInput } from './';



describe('<SearchInput />', () => {
    const store = createStore(appReducer);

    it('renders without crashing', () => {
        const wrapper = shallow(<SearchInput store={store} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('onSearchKeyChange is triggered when searchKey input change', () => {
        const searchKeyChangeFunc = jest.spyOn(SearchInput.prototype, 'onSearchKeyChange');

        const wrapper = mount(<SearchInput store={store} />);
        wrapper.setProps({ setSearchKey: () => null }, () => {
            const searchKeyInput = wrapper.find('#searchKey');
            searchKeyInput.simulate('change', {
                target: {
                    name: 'searchKey',
                    value: 'test'
                }
            });
            expect(searchKeyChangeFunc).toHaveBeenCalled();
        });
    });

    it('onClearSearchKey is triggered when clearSearch button is clicked', () => {
        const clearSearchKeyFunc = jest.spyOn(SearchInput.prototype, 'onClearSearchKey');

        const wrapper = mount(<SearchInput store={store} />);
        wrapper.setProps({
            setSearchKey: () => null,
            appState: { searchKey: 'Text' }}, () => {

            const clearSearchKeyInput = wrapper.find('#clearSearch');
            clearSearchKeyInput.simulate('click');
            expect(clearSearchKeyFunc).toHaveBeenCalled();
        });
    });
});