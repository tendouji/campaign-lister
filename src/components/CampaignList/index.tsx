/*
* Todo:
* - sorting
* - increment id if existed
* - perhaps delete record
* - pagination
* - total view per page?
* - HOC perhaps?
* - hide module function if possible
* - minify public JS
* */

import React from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDotCircle} from "@fortawesome/free-solid-svg-icons/faDotCircle";
import {colors, layout, styles} from '../../constants/ui';
import {setSearchKey, setSnackBarDisplay} from "../../actions";
import {CampaignData, CampaignStatus, ReducerStateData, SnackBarData} from '../../models';
import {config} from "../../constants/config";
import {compareObject, convertToCurrency} from "../../helpers";


interface StatusDotProps {
    status: string,
}
const StatusDot: React.FC<StatusDotProps> = (props) => (
    <StatusDotWrapper className={`status-dot ${props.status}`}>
        <FontAwesomeIcon icon={faDotCircle} />
    </StatusDotWrapper>
);

const StatusDotWrapper = styled.span`
    &.${CampaignStatus.Ongoing} {
        color: ${colors.green};
    }
    
    &.${CampaignStatus.Ended} {
        color: ${colors.red};
    }
    
    &.${CampaignStatus.Upcoming} {
        color: ${colors.yellow};
    }
`;


type CampaignListProps = {
    [key:string]: any
}

type CampaignListState = {
    campaigns: CampaignData[],
    curDate: Date,
}

class CampaignListBase extends React.Component<CampaignListProps, CampaignListState> {
    // private searchKeyRef: React.RefObject<HTMLInputElement>;

    constructor(props: CampaignListProps) {
        super(props);

        this.state = {
            campaigns: [],
            curDate: new Date(),
        };

        const x = {a: 1, b: 2};
        const y = {b: 2, a: 1};
        compareObject(x, y);

        // this.searchKeyRef = React.createRef();
    }

    componentDidUpdate(prevProps: any) {
        const { appState, campaigns } = this.props;
        if(prevProps.campaigns !== campaigns) {
            if(campaigns.length > 0) {
                this.setState({ campaigns });
            }
        }

        if(prevProps.appState.searchKey !== appState.searchKey) {
            if( appState.searchKey !== '') {
                const filtered = this.filterCampaigns(appState.searchKey);
                this.setState({ campaigns: filtered });
            } else {
                this.setState({
                    campaigns: campaigns.length > 0 ? campaigns : []
                });
            }
        }
    }

    filterCampaigns = (searchKey: string) => {
        const { campaigns } = this.state;

        if(campaigns.length === 0) {
            const { setSnackBarDisplay, setSearchKey } = this.props;
            setSnackBarDisplay({
                show: true,
                message: 'No records to search. Add some campaigns to begin!'
            });
            setSearchKey('');
            return [];
        }

        return campaigns.filter((item, key) => {
            const _name = item.name.toLowerCase();
            const _searchKey = searchKey.toLowerCase();
            return _name.includes(_searchKey);
        });
    };

    /*
    onSearchClick = (e: React.MouseEvent) => {
        const searchKeyElm = this.searchKeyRef.current;
        if(!!searchKeyElm) {
            const searchVal = searchKeyElm.value;

            if(searchVal.length < config.minSearchLength) {
                const { setSnackBarDisplay } = this.props;
                setSnackBarDisplay({
                    show: true,
                    message: 'Search length is too short.'
                });
                return;
            }

            const { setSearchKey } = this.props;
            setSearchKey(searchVal);
        }
    };
    */

    render() {
        const { appState } = this.props;
        const { campaigns, curDate } = this.state;
        const dataLabels: { [key:string]: string } = config.campaignDataLabels;

        return (
            <>
                <CampaignHeaderWrapper className="campaign-header">
                    <h2 className="title">All Campaigns</h2>
                    <div className="legend">
                        <div className="legend-title">Status Type</div>
                        <div className="legend-row">
                            <div className="col">
                                <div className="label">{ CampaignStatus.Ongoing }</div>
                                <StatusDot status={CampaignStatus.Ongoing} />
                            </div>
                            <div className="col">
                                <div className="label">{ CampaignStatus.Ended }</div>
                                <StatusDot status={CampaignStatus.Ended} />
                            </div>
                            <div className="col">
                                <div className="label">{ CampaignStatus.Upcoming }</div>
                                <StatusDot status={CampaignStatus.Upcoming} />
                            </div>
                        </div>
                    </div>
                </CampaignHeaderWrapper>
                <CampaignTableWrapper className="campaign-table">
                    <table>
                        <thead>
                            <tr>
                                { Object.keys(dataLabels).map((key: string) => <td key={key}>{dataLabels[key]}</td>) }
                            </tr>
                        </thead>
                        <tbody>
                            { !!campaigns && campaigns.length > 0 ? (<>
                                { campaigns.map((item, index) => {
                                    const _item: any = item;
                                    const campaignStartDateRaw = new Date(_item.startDate);
                                    const campaignEndDateRaw = new Date(_item.endDate);

                                    let status: string = campaignStartDateRaw > curDate
                                        ? CampaignStatus.Upcoming
                                        : campaignEndDateRaw < curDate
                                            ? CampaignStatus.Ended
                                            : CampaignStatus.Ongoing;

                                    return (
                                        <tr key={index}>
                                            { Object.keys(dataLabels).map((key: string) => {
                                                if(key === 'status') {
                                                    return <td key={key}>
                                                        <StatusDot status={status} />
                                                    </td>
                                                }
                                                if(key === 'name') {
                                                    return <td key={key}>
                                                        <a href="#">{_item[key]}</a>
                                                    </td>
                                                }
                                                if(key === 'budget' ) {
                                                    return <td key={key}>
                                                        <a href="#">{convertToCurrency(+_item[key])}</a>
                                                    </td>
                                                }

                                                return <td key={key}>{_item[key]}</td>
                                            }) }
                                        </tr>
                                    )
                                })}</>
                            ) : (
                                <tr>
                                    <td colSpan={Object.keys(dataLabels).length}>
                                        { !!appState && appState.searchKey !== '' ? (<>
                                            <div className="highlight">No campaigns found!</div>
                                            Please try again.</>
                                        ) : (<>
                                            <div className="highlight">No campaigns available.</div>
                                            Click <a href="#">here</a> to learn how to add new campaigns via Web Development tools.</>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CampaignTableWrapper>
            </>
        )
    }
}

const mapStateToProps = (state: ReducerStateData) => {
    return ({
        appState: state.appState,
        campaigns: state.campaigns
    })
};

const mapDispatchToProps = (dispatch: any) => ({
    setSearchKey: (data: string) => dispatch(setSearchKey(data)),
    setSnackBarDisplay: (data: SnackBarData) => dispatch(setSnackBarDisplay(data)),
});

const CampaignList = connect(mapStateToProps, mapDispatchToProps)(CampaignListBase);

export default CampaignList;



const indicatorPanelWidth = '13rem';
const CampaignHeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: ${layout.standardGap};
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    
    & .title {
        width: calc(100% - ${indicatorPanelWidth});
        margin: 0;
    }
    
    & .legend {
        width: ${indicatorPanelWidth};
        padding: ${layout.smallGap};
        border: ${styles.lineStyle};
        box-sizing: border-box;
        text-align: center;
        font-size: ${layout.fontSizeSmall};
        font-weight: 500;
        color: ${colors.darkGray};
        
        & .legend-title {
            margin-bottom: ${layout.xSmallGap};
            font-weight: 700;
            text-transform: uppercase;
        }
        
        & .legend-row {
            display: flex;
            justify-content: space-between;
            
            & .col {
                & .label { }
            }
        }
    }
`;

const CampaignTableWrapper = styled.div`
    width: 100%;
    padding: 0 ${layout.standardGap} ${layout.standardGap};
    box-sizing: border-box;
    
    & > table {
        border: 0;
        width: 100%;
        border-collapse: collapse;
        
        & td {
            padding: ${layout.smallGap};
            border-top: ${styles.lineStyle};
            border-bottom: ${styles.lineStyle};
            text-align: center;
        }
        
        & > thead {
            & tr {
                background-color: ${colors.primary};
                
                & td {
                    color: ${colors.white};
                    font-weight: 700;
                }
            }
        }
        
        
        & > tbody {
            & tr {
                &:nth-child(odd) {
                    background-color: ${colors.lightGray};
                }
            }
        }
        
        & .highlight {
            margin-bottom: ${layout.smallGap};
            color: ${colors.red};
            font-weight: 700;
        }
    }
`;