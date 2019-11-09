import React, {ReactElement} from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { appReducer } from "../reducers";
import App from "../App";
import {render, shallow} from "enzyme";

const store = createStore(appReducer);

const testLabels = {
    ComponentMatchSnapshot: (componentName: string) => `render to match snapshot for ${componentName} component`,
    ComponentRenderWithoutCrash: (componentName: string) => `render without crashing for ${componentName} component`,
};

const testFunctions = {
    ComponentMatchSnapshot: (component: ReactElement, withStore: boolean | undefined = undefined): any => {
        const cloneComponent = React.cloneElement(component);

        let _cloneComponent: ReactElement = (!!withStore
            ? <Provider store={store}>{cloneComponent}</Provider>
            : cloneComponent);

        const Component = renderer.create(_cloneComponent).toJSON();
        expect(Component).toMatchSnapshot();
    },
    ComponentRenderWithoutCrash: (Component: ReactElement, withStore: boolean | undefined = undefined): any => {
        const wrapper = render(Component);

        expect(wrapper.html()).toContain('div');


        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}>
            { Component }
        </Provider>

        , div);
        ReactDOM.unmountComponentAtNode(div);
    }
};


export {
    testLabels,
    testFunctions,
}