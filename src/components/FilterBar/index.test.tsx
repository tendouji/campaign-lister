import React from 'react';
import { FilterBar } from './';
import { testFunctions, testLabels } from "../../constants/test";


const componentType = 'FilterBar';

it( testLabels.ComponentMatchSnapshot(componentType),
    () => testFunctions.ComponentMatchSnapshot(<FilterBar />)
);

it( testLabels.ComponentRenderWithoutCrash(componentType),
    () => testFunctions.ComponentRenderWithoutCrash(<FilterBar />)
);