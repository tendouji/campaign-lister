import React from 'react';
import { connect } from "react-redux";
import {
    CampaignData,
    DateRangeData,
    ReducerStateData,
    SnackBarData
} from "./models";
import {
    setDateRange,
    setSearchKey,
    setSnackBarDisplay,
    storeCampaignData
} from "./actions";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import SnackBar from "./components/SnackBar";
import CampaignList from "./components/CampaignList";
import { Footer } from './components/Footer';


declare global {
    interface Window {
        EventQueue: any;
        AddCampaignsEventName: string;
    }
}

export class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.storeCampaigns = this.storeCampaigns.bind(this);
    }

    componentDidMount() {
        if(!!window && !!window.EventQueue) {
            window.EventQueue.subscribe(window.AddCampaignsEventName, this.storeCampaigns);
        }
    }

    storeCampaigns(data: CampaignData[]) {
        console.log('CR8 Campaign: Store campaigns data into redux');

        const {
            storeCampaignData,
            setSearchKey,
            setDateRange
        } = this.props;

        setSearchKey('');
        setDateRange({ startDate: null, endDate: null });
        storeCampaignData(data);
    };

    closeSnackBar = () => {
        const { setSnackBarDisplay } = this.props;
        setSnackBarDisplay({ show: false });
    };

    render() {
        const { appState, campaigns } = this.props;
        const { snackBarDisplay } = appState;

        return (
            <>
                <Header title={'CR8 Campaign'} />
                <FilterBar disabled={campaigns.length === 0} />
                <CampaignList />
                <Footer />

                <SnackBar
                    show={snackBarDisplay.show}
                    message={snackBarDisplay.message}
                    close={this.closeSnackBar}
                />
            </>
        );
    }
};


const mapStateToProps = (state: ReducerStateData) => {
    return ({
        appState: state.appState,
        campaigns: state.campaigns
    })
};

const mapDispatchToProps = (dispatch: any) => ({
    setSearchKey: (data: string) => dispatch(setSearchKey(data)),
    setDateRange: (data: DateRangeData) => dispatch(setDateRange(data)),
    storeCampaignData: (data: CampaignData[]) => dispatch(storeCampaignData(data)),
    setSnackBarDisplay: (data: SnackBarData) => dispatch(setSnackBarDisplay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

