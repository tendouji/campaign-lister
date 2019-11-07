export interface CampaignData {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    budget: number;
}

export type SnackBarData = {
    show: boolean;
    message?: string;
}

export type AppStateData = {
    [key: string]: any
};

export type ActionData = {
    type: string;
    data: any;
}

export type ReducerStateData = {
    campaigns: CampaignData[];
    appState: AppStateData;
}

export enum CampaignStatus {
    Ongoing = 'ongoing',
    Ended = 'ended',
    Upcoming = 'upcoming',
}