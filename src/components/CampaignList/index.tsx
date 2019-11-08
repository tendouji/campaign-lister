/*
* Todo:
* - increment id if existed
* - perhaps delete record
* - HOC perhaps?
* - hide module function if possible
* - minify public JS
* */

import React from 'react';
import {connect} from 'react-redux';
import styled, {css, StyledFunction} from "styled-components";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons/faDotCircle";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import {
    colors,
    layout,
    styles
} from '../../constants/ui';
import {
    setDateRange,
    setSearchKey,
    setSnackBarDisplay
} from "../../actions";
import {
    CampaignData,
    CampaignStatus,
    DateRangeData,
    ReducerStateData,
    SnackBarData
} from '../../models';
import { config } from "../../constants/config";
import { beautifyDate, convertToCurrency } from "../../helpers";


interface StatusDotProps {
    status: string,
}
const StatusDot: React.FC<StatusDotProps> = (props) => (
    <StatusDotWrapper className={`status-dot ${props.status}`}>
        <FontAwesomeIcon icon={faDotCircle} />
        <span>{props.status}</span>
    </StatusDotWrapper>
);

const StatusDotWrapper = styled.span`
    & > span { 
        display: none;
    }

    &.${CampaignStatus.Ongoing} {
        color: ${colors.green};
    }
    
    &.${CampaignStatus.Ended} {
        color: ${colors.red};
    }
    
    &.${CampaignStatus.Upcoming} {
        color: ${colors.yellow};
    }
    
    @media screen and (max-width: ${config.smallScreenWidth}) {
        & > span { 
            display: inline-block;
            margin-left: ${layout.xSmallGap};
            line-height: 1rem;
        }
    }    
`;


type CampaignListProps = {
    [key:string]: any
}

type CampaignListState = {
    curDate: Date,
    filteredCampaigns: CampaignData[],
    pageCount: number,
    curPage: number,
    curPageCampaigns: CampaignData[],
}

class CampaignListBase extends React.Component<CampaignListProps, CampaignListState> {
    constructor(props: CampaignListProps) {
        super(props);

        this.state = {
            filteredCampaigns: [],
            curDate: new Date(),
            pageCount: 0,
            curPage: 0,
            curPageCampaigns: [],
        };
    }

    componentDidUpdate(prevProps: any) {
        const { appState, campaigns } = this.props;
        const { dateRange } = appState;

        // NOTE: for adding campaigns
        if(prevProps.campaigns !== campaigns) {
            if(campaigns.length > 0) {
                this.setState({
                    filteredCampaigns: campaigns
                }, () => this.getPageCount());
            }
            return;
            // NOTE: if updates are due to campaign list change, no need to further continue
        }

        // NOTE: for searchKey results
        if(prevProps.appState.searchKey !== appState.searchKey) {
            if( appState.searchKey !== '') {
                const filtered = this.filterCampaignsBySearchKey(appState.searchKey);
                this.setState({
                    filteredCampaigns: filtered
                }, () => this.getPageCount());
            } else {
                // NOTE: searchKey is cleared
                if(!!dateRange.startDate && !!dateRange.endDate) {
                    const dateRangeFiltered = this.filterCampaignsByDateRange(dateRange.startDate, dateRange.endDate);
                    this.setState({
                        filteredCampaigns: dateRangeFiltered
                    }, () => this.getPageCount());
                } else {
                    this.setState({
                        filteredCampaigns: campaigns.length > 0 ? campaigns : []
                    }, () => this.getPageCount());
                }
            }
        }

        // NOTE: for dateRange results
        if( (prevProps.appState.dateRange.startDate !== dateRange.startDate) ||
            (prevProps.appState.dateRange.endDate !== dateRange.endDate)
        ) {
            // NOTE: either of the dates not equal, then should update result
            if(!!dateRange.startDate && !!dateRange.endDate) {
                const filtered = this.filterCampaignsByDateRange(dateRange.startDate, dateRange.endDate);
                this.setState({
                    filteredCampaigns: filtered
                }, () => this.getPageCount());
            } else {
                // NOTE: dateRange is cleared
                if(appState.searchKey !== '') {
                    const searchKeyFiltered = this.filterCampaignsBySearchKey(appState.searchKey);
                    this.setState({
                        filteredCampaigns: searchKeyFiltered
                    }, () => this.getPageCount());
                } else {
                    this.setState({
                        filteredCampaigns: campaigns.length > 0 ? campaigns : []
                    }, () => this.getPageCount());
                }
            }
        }
    }

    filterCampaignsBySearchKey = (searchKey: string) => {
        const { filteredCampaigns } = this.state;
        const { appState, campaigns } = this.props;
        let _campaigns: CampaignData[] = [];

        if(!!appState.dateRange.startDate || !!appState.dateRange.endDate) {
            // NOTE: search will filter based on dateRange results
            _campaigns = filteredCampaigns;
        } else {
            _campaigns = campaigns;
        }

        if(_campaigns.length === 0) {
            return this.noCampaign('searchKey');
        }

        return _campaigns.filter((item: CampaignData) => {
            const _name = item.name.toLowerCase();
            const _searchKey = searchKey.toLowerCase();
            return _name.includes(_searchKey);
        });
    };

    filterCampaignsByDateRange = (startDate: Date, endDate: Date) => {
        const { filteredCampaigns } = this.state;
        const { appState, campaigns } = this.props;
        let _campaigns: CampaignData[] = [];

        if(appState.searchKey !== '') {
            // NOTE: search will filter based on searchKey results
            _campaigns = filteredCampaigns;
        } else {
            _campaigns = campaigns;
        }

        if(_campaigns.length === 0) {
            return this.noCampaign('rateRange');
        }

        return _campaigns.filter((item: CampaignData) => {
            const _startDate = new Date(item.startDate);
            const _endDate = new Date(item.endDate);

            if(_endDate < startDate) { // NOTE: campaign already ended
                return false;
            } else {
                if(_startDate > endDate) { // NOTE: campaign haven't started
                    return false;
                }
            }
            return true;
        });
    };

    noCampaign = (type: string): [] => {
        const { setSearchKey, setDateRange } = this.props;
        if(type === 'searchKey') setSearchKey('');
        if(type === 'dateRange') setDateRange({ startDate: null, endDate: null });
        return [];
    };

    onNameClick = (nameStr: string) => {
        const { setSearchKey } = this.props;
        setSearchKey(nameStr.toLowerCase());
    };

    hasSearchKey = () => this.props.appState.searchKey !== '';

    hasDateRange = () => !!this.props.appState.dateRange.startDate;
    // NOTE: as long has startDate, the code will store endDate

    checkIsSearchResult = () => (this.hasSearchKey() || this.hasDateRange());

    generateHeaderDescription = () => {
        const { filteredCampaigns } = this.state;
        const { appState } = this.props;
        const { searchKey, dateRange } = appState;

        return 'Results for' + (
            this.checkIsSearchResult() ? [
                ` campaign's`,
                (this.hasSearchKey() ? ` name with "<span>${searchKey}</span>"` : ''),
                (this.hasSearchKey() && this.hasDateRange() ? ' and ' : ''),
                (this.hasDateRange()
                    ? ` period between <span>${beautifyDate(dateRange.startDate)} - ${beautifyDate(dateRange.endDate)}</span>`
                    : '')
            ].join('') : ' <span>all</span> campaigns') +
            ` (${filteredCampaigns.length} entr${filteredCampaigns.length > 1 ? 'ies' : 'y'})`;
    };

    getPageCount = () => {
        const { filteredCampaigns } = this.state;
        this.setState({
            pageCount: Math.ceil(filteredCampaigns.length / config.recordPerPage)
        }, () => this.getRecordByPage());
    };

    onPaginationClick = (data: any) => {
        this.setState({
            curPage: data.selected
        }, () => { this.getRecordByPage() });
    };

    getRecordByPage = () => {
        const { filteredCampaigns, curPage } = this.state;

        const startIndex = curPage * config.recordPerPage;
        let endIndex = ((curPage + 1) * config.recordPerPage);
        if(endIndex > filteredCampaigns.length) {
            endIndex = filteredCampaigns.length;
        }

        const curPageCampaigns = filteredCampaigns.slice(startIndex, endIndex);

        this.setState({ curPageCampaigns });
    };

    render() {
        const { appState } = this.props;
        const { curDate, curPageCampaigns } = this.state;
        const dataLabels: { [key:string]: string } = config.campaignDataLabels;

        return (
            <>
                <CampaignHeaderWrapper className="campaign-header">
                    <div className="title">
                        <h2>Campaign list</h2>
                        <div className="description"
                            dangerouslySetInnerHTML={{__html: this.generateHeaderDescription()}} />
                    </div>
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
                <CampaignTableWrapper
                    className="campaign-table"
                    dataLabels={dataLabels}
                >
                    <table>
                        <thead>
                            <tr>
                                { Object.keys(dataLabels).map((key: string) => <td key={key}>{dataLabels[key]}</td>) }
                            </tr>
                        </thead>
                        <tbody>
                            { !!curPageCampaigns && curPageCampaigns.length > 0 ? (<>
                                { curPageCampaigns.map((item, index) => {
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
                                                switch(key) {
                                                    case 'status':
                                                        return <td key={key}><StatusDot status={status} /></td>;
                                                    case 'name':
                                                        return <td key={key}>
                                                            <a title="Click to search for campaign with same name"
                                                                onClick={() => this.onNameClick(_item[key])}
                                                            >{_item[key]}</a>
                                                        </td>;
                                                    case 'startDate':
                                                    case 'endDate':
                                                        return <td key={key}>{beautifyDate(new Date(_item[key]))}</td>;
                                                    case 'budget':
                                                        return <td key={key}>{convertToCurrency(+_item[key])}</td>;
                                                    default:
                                                        return <td key={key}>{_item[key]}</td>;
                                                }
                                            }) }
                                        </tr>
                                    )
                                })}</>
                            ) : (
                                <tr className="no-result">
                                    <td colSpan={Object.keys(dataLabels).length}>
                                        { ( !!appState && (
                                            appState.searchKey !== '' || (
                                                !!appState.dateRange.startDate ||
                                                !!appState.dateRange.endDate
                                            )
                                        )) ? (<>
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

                { curPageCampaigns.length > 0 && (
                    <CampaignPaginationWrapper className="campaign-pagination">
                        <ReactPaginate
                            previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                            nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.onPaginationClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </CampaignPaginationWrapper>
                )}
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
    setDateRange: (data: DateRangeData) => dispatch(setDateRange(data)),
    setSearchKey: (data: string) => dispatch(setSearchKey(data)),
    setSnackBarDisplay: (data: SnackBarData) => dispatch(setSnackBarDisplay(data)),
});

const CampaignList = connect(mapStateToProps, mapDispatchToProps)(CampaignListBase);

export default CampaignList;



const indicatorPanelWidth = '10rem';
const CampaignHeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: ${layout.standardGap};
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    
    & .title {
        width: calc(100% - ${indicatorPanelWidth});
        
        & > h2 {
            margin: 0 0 ${layout.smallGap};
        }
        
        & .description {
            & > span {
                font-weight: 700;
                color: ${colors.primary};
            }
        }
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
    
    @media screen and (max-width: ${config.mediumScreenWidth}) {
        display: block;
        padding: ${layout.standardGap} ${layout.standardGap} ${layout.smallGap};
    
        & .title {
            width: 100%;
            margin-bottom: ${layout.largeGap};
        }
        
        & .legend {
            display: flex;
            margin: 0 auto;
            width: 14rem;
        
            & .legend-title {
                width: 3rem;
                margin-bottom: 0;
                margin-right: ${layout.xSmallGap};
            }
            
            & .legend-row {
                display: flex;
                width: calc(100% - 3rem);
                justify-content: space-between;
            }
        }
    }
    
    @media screen and (max-width: ${config.smallScreenWidth}) {        
        & .legend {
            display: none;
        }
    }
`;


interface CampaignTableWrapperProps {
    dataLabels: { [key:string]: string }
}

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
                background-color: ${colors.secondary};
                
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
                
                &:not(.no-result):hover {
                    background-color: ${colors.lightGray2};
                }
            }
        }
        
        & a {
            text-decoration: underline;
            cursor: pointer;
        }
        
        & .highlight {
            margin-bottom: ${layout.smallGap};
            color: ${colors.red};
            font-weight: 700;
        }
    }
    
    @media screen and (max-width: ${config.smallScreenWidth}) {
        padding: 0 ${layout.standardGap} calc(2 * ${layout.standardGap});
        
        & > table {
            & td {
                display: block;
                padding: ${layout.xSmallGap} 0;
                border: 0;
                text-align: left;
                
                ${(props: CampaignTableWrapperProps) => {
                    const d = props.dataLabels;
                    return Object.keys(d).map((key, id) => (css`
                        &:nth-child(${id+1}) {
                            &:before {
                                display: inline-block;
                                width: 7rem;
                                font-weight: 700;
                                content: '${d[key]}: ';
                            }
                        }
                    `));
                }}
            }
            
            & > thead {
                display: none;
            }
            
            & > tbody {
                & tr {
                    display: block;
                    padding: ${layout.standardGap};
                    border: ${styles.lineStyle};
                }
            }
        }
    }    
`;

const CampaignPaginationWrapper = styled.div`
    width: 100%;
    padding: 0 ${layout.standardGap} ${layout.standardGap};
    box-sizing: border-box;
    
    & > ul {
        display: flex;
        padding: 0;
        margin: 0;
        border-top: ${styles.lineStyle};
        border-bottom: ${styles.lineStyle};
        list-style: none;
        justify-content: center;
        
        & > li {
            width: 2.5rem;
            
            &:hover {
                background-color: ${colors.lightGray2};
            }
                
            & > a {
                display: block;
                width: 100%;
                padding: ${layout.smallGap} 0;
                text-align: center;
                cursor: pointer;
                color: ${colors.primary};
                outline: 0;
            }
                        
            &.active {
                background-color: ${colors.primary};
                
                & > a {
                    color: ${colors.white};
                }
            }
            
            &.disabled {
                cursor: auto;
                
                &:hover {
                    background-color: transparent;
                }
                
                & > a {
                    color: ${colors.lightGray2};
                }
            }
        }
    }
`;