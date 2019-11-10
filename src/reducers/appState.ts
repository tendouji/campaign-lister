import {
    SET_SEARCH_KEY,
    SET_DATE_RANGE,
    SET_SNACKBAR_DISPLAY,
    SET_MODALPOPUP_DISPLAY,
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
    },
    modalPopupDisplay: {
        show: false,
        title: '',
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
        case SET_SNACKBAR_DISPLAY:
            return {
                ...state,
                snackBarDisplay: {
                    ...state.snackBarDisplay,
                    ...action.data
                }
            };
        case SET_MODALPOPUP_DISPLAY:
            return {
                ...state,
                modalPopupDisplay: {
                    ...state.modalPopupDisplay,
                    ...action.data
                }
            };
        default:
            return state;
    }
};