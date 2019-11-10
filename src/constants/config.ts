import {campaignDataLabels} from "./text";

export const config = {
    minSearchLength: 3,
    recordPerPage: 5,

    snackBarLifeSpan: 5000,
    snackBarTransition: 250,

    mediumScreenWidth: '37.5rem',
    smallScreenWidth: '25rem',

    campaignDataLabels: {
        name: campaignDataLabels.name,
        startDate: campaignDataLabels.startDate,
        endDate: campaignDataLabels.endDate,
        budget: campaignDataLabels.budget,
        status: campaignDataLabels.status,
    }
};