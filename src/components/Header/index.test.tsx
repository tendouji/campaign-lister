import React from 'react';
import { mount } from 'enzyme';
import { Header } from './';
import { testLabels, testFunctions } from '../../constants/test';


const sampleText = 'Title';
const componentType = 'Header';

it( testLabels.ComponentMatchSnapshot(componentType),
    () => testFunctions.ComponentMatchSnapshot(<Header title={sampleText} />)
);

it( testLabels.ComponentRenderWithoutCrash(componentType),
    () => testFunctions.ComponentRenderWithoutCrash(<Header title={sampleText} />)
);

it('render component correctly with string props', () => {
    const props = { title: 'Campaign' },
        HeaderComponent = mount (<Header {...props} />);
    expect((HeaderComponent).prop('title')).toEqual(props.title);
});