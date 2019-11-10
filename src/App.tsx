import React from 'react';
import { connect } from "react-redux";
import {
    appTitle,
    helpTitleString,
    noHelpContent
} from "./constants/text";
import {
    CampaignData,
    DateRangeData, ModalPopupData,
    ReducerStateData,
    SnackBarData
} from "./models";
import {
    setDateRange, setModalPopupDisplay,
    setSearchKey,
    setSnackBarDisplay,
    storeCampaignData
} from "./actions";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import SnackBar from "./components/SnackBar";
import CampaignList from "./components/CampaignList";
import { Footer } from './components/Footer';
import ModalPopup from "./components/ModalPopup";


declare global {
    interface Window {
        EventQueue: any;
        AddCampaignsEventName: string;
        GetHelp: any;
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
        console.log(`${appTitle}: Store campaigns data into redux`);

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

    closeModalPopup = () => {
        const { setModalPopupDisplay } = this.props;
        setModalPopupDisplay({ show: false });
    };

    render() {
        const { appState, campaigns } = this.props;
        const { snackBarDisplay, modalPopupDisplay } = appState;

        return (
            <>
                <Header title={appTitle} />
                <FilterBar disabled={!campaigns || campaigns.length === 0} />
                <CampaignList />
                <Footer />

                <ModalPopup
                    show={modalPopupDisplay.show}
                    title={helpTitleString}
                    content={!!window.GetHelp && typeof window.GetHelp === 'function'
                        ? window.GetHelp()
                        : noHelpContent
                    }
                    close={this.closeModalPopup}
                />

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
    setModalPopupDisplay: (data: ModalPopupData) => dispatch(setModalPopupDisplay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

