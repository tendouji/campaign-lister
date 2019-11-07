import { STORE_CAMPAIGN_DATA } from '../constants/actionType';
import { ActionData, CampaignData } from "../models";


const defaultCampaignState: CampaignData[] = [];

export const campaignReducer = (state = defaultCampaignState, action: ActionData) => {
    switch (action.type) {
        case STORE_CAMPAIGN_DATA:
            return [
                ...state,
                ...action.data
            ];
        default:
            return state;
    }
};