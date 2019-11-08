import {
    SET_SEARCH_KEY,
    SET_DATE_RANGE,
    SET_IS_LOADING,
    SET_SNACKBAR_DISPLAY,
} from '../constants/actionType';
import { ActionData, AppStateData } from "../models";


const defaultAppState: AppStateData = {
    isLoading: false,
    searchKey: '',
    dateRange: {
        startDate: null,
        endDate: null,
    },
    snackBarDisplay: {
        show: false,
        message: ''
    }
};

export const appStateReducer = (state = defaultAppState, action: ActionData) => {
    switch (action.type) {
        case SET_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.data
            };
        case SET_DATE_RANGE:
            return {
                ...state,
                dateRange: {
                    ...state.dateRange,
                    ...action.data
                }
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.data
            };
        case SET_SNACKBAR_DISPLAY:
            return {
                ...state,
                snackBarDisplay: {
                    ...state.snackBarDisplay,
                    ...action.data
                }
            };
        default:
            return state;
    }
};