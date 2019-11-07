import { combineReducers } from 'redux';
import { campaignReducer } from './campaign';
import { appStateReducer } from './appState';


export const appReducer = combineReducers({
    appState: appStateReducer,
    campaigns: campaignReducer,
});