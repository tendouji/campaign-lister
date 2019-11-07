import React from 'react';
import { connect } from "react-redux";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import SnackBar from "./components/SnackBar";
import { CampaignData, ReducerStateData, SnackBarData } from "./models";
import { setSnackBarDisplay, storeCampaignData } from "./actions";
import CampaignList from "./components/CampaignList";


declare global {
    interface Window {
        EventQueue: any;
        AddCampaignsEventName: string;
    }
}

class AppBase extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        window.EventQueue.subscribe(window.AddCampaignsEventName, this.storeCampaigns);
    }

    storeCampaigns = (data: CampaignData[]) => {
        console.log('Campaign App: Store campaigns data into redux');

        const { storeCampaignData } = this.props;
        storeCampaignData(data);
    };

    closeSnackBar = () => {
        const { setSnackBarDisplay } = this.props;
        setSnackBarDisplay({ show: false });
    };

    render() {
        const { appState } = this.props;
        const { snackBarDisplay } = appState;

        return (
            <>
                <Header title={'Campaign'} />
                <FilterBar />

                <CampaignList />

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
    return ({ appState: state.appState })
};

const mapDispatchToProps = (dispatch: any) => ({
    storeCampaignData: (data: CampaignData[]) => dispatch(storeCampaignData(data)),
    setSnackBarDisplay: (data: SnackBarData) => dispatch(setSnackBarDisplay(data)),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppBase);

export default App;
