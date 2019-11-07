import React, {ReactElement} from "react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";


const testLabels = {
    ComponentMatchSnapshot: (componentName: string) => `render to match snapshot for ${componentName} component`,
    ComponentRenderWithoutCrash: (componentName: string) => `render without crashing for ${componentName} component`,
};

const testFunctions = {
    ComponentMatchSnapshot: (component: ReactElement): any => {
        const cloneComponent = React.cloneElement(component);
        const Component = renderer.create(cloneComponent).toJSON();
        expect(Component).toMatchSnapshot();
    },
    ComponentRenderWithoutCrash: (component: ReactElement): any => {
        const div = document.createElement('div');
        ReactDOM.render(component, div);
        ReactDOM.unmountComponentAtNode(div);
    }
};


export {
    testLabels,
    testFunctions,
}