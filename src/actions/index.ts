import {
    SET_IS_LOADING,
    SET_SEARCH_KEY,
    STORE_CAMPAIGN_DATA,
    SET_SNACKBAR_DISPLAY,
} from "../constants/actionType";
import { CampaignData, SnackBarData } from "../models";


export const storeCampaignData = (data: CampaignData[]) => ({ type: STORE_CAMPAIGN_DATA, data });
export const setSearchKey = (data: string) => ({ type: SET_SEARCH_KEY, data });
export const setSnackBarDisplay = (data: SnackBarData) => ({ type: SET_SNACKBAR_DISPLAY, data });
export const setIsLoading = (data: boolean) => ({ type: SET_IS_LOADING, data });
