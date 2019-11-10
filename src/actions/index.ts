import {
    SET_SEARCH_KEY,
    SET_DATE_RANGE,
    STORE_CAMPAIGN_DATA,
    SET_SNACKBAR_DISPLAY,
    SET_MODALPOPUP_DISPLAY,
} from "../constants/actionType";
import {
    CampaignData,
    SnackBarData,
    DateRangeData,
    ModalPopupData
} from "../models";


export const storeCampaignData = (data: CampaignData[]) => ({ type: STORE_CAMPAIGN_DATA, data });
export const setSearchKey = (data: string) => ({ type: SET_SEARCH_KEY, data });
export const setDateRange = (data: DateRangeData) => ({ type: SET_DATE_RANGE, data });
export const setSnackBarDisplay = (data: SnackBarData) => ({ type: SET_SNACKBAR_DISPLAY, data });
export const setModalPopupDisplay = (data: ModalPopupData) => ({ type: SET_MODALPOPUP_DISPLAY, data });
