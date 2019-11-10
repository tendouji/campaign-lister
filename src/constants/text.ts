import {config} from "./config";
import React from "react";

const appTitle = 'CR8 Campaign';
const authorName = 'Chan Wan';
const footerString = (year: number): string => `© ${year} ${authorName} / ${appTitle}`;

const helpTitleString = 'How to add Campaigns?';
const noHelpContent = 'No content at the moment';

const campaignDataLabels = {
    name: 'Name',
    startDate: 'Start Date',
    endDate: 'End Date',
    budget: 'Budget (USD)',
    status: 'Status',
};

const searchBarPlaceholder = 'Search Campaign';
const startDateLabel = 'Start Date';
const endDateLabel = 'End Date';
const startDatePlaceholder = 'Select your start date';
const endDatePlaceholder = 'Select your end date';
const todayButtonText = 'Today';

const campaignResultTitle = 'Campaign list';
const legendTitle = 'Status Type';
const searchNoResult = 'No campaigns found!';
const searchNoResultInstruction = 'Please try again.';
const noResult = 'No campaigns available.';
const noResultInstruction = {
    beforeLink: 'Click ',
    afterLink: ' to learn how to add new campaigns via Web Development tools.',
    linkLabel: 'here',
};

const errorMessage = {
    searchLengthShort: (minLength: number) => `Search length is too short. Please enter at least ${minLength} characters`,
    startDateEarlier: 'Start date cannot be later than end date.'
};

export {
    appTitle,
    footerString,
    helpTitleString,
    noHelpContent,

    campaignDataLabels,
    searchBarPlaceholder,
    startDateLabel,
    endDateLabel,
    startDatePlaceholder,
    endDatePlaceholder,
    todayButtonText,

    campaignResultTitle,
    legendTitle,
    searchNoResult,
    searchNoResultInstruction,
    noResult,
    noResultInstruction,

    errorMessage,
}