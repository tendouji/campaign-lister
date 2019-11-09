import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons/faArrowsAltH'
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { colors, layout, styles } from '../../constants/ui';
import { setSnackBarDisplay, setDateRange } from "../../actions";
import { DateRangeData, ReducerStateData, SnackBarData } from '../../models';

import "react-datepicker/dist/react-datepicker.css";


type DateSelectorProps = {
    [key:string]: any
}

export class DateSelector extends React.Component<DateSelectorProps, any> {
    constructor(props: DateSelectorProps) {
        super(props);

        this.setDate = this.setDate.bind(this);
        this.onClearDateRange = this.onClearDateRange.bind(this);
        this.onDateFilterClick = this.onDateFilterClick.bind(this);

        const dateNow: Date = new Date();

        this.state = {
            dateNow,
            startDate: dateNow,
            endDate: dateNow,
        };
    }

    componentDidUpdate(prevProps: any) {
        const { appState } = this.props;
        const { dateRange } = appState;

        if(prevProps.appState.dateRange.startDate !== dateRange.startDate) {
            if(!dateRange.startDate) {
                // NOTE: startDate is null
                this.onClearDateRange();
            }
        }
    }

    onDateFilterClick(e?: React.MouseEvent | undefined) {
        const { startDate, endDate } = this.state;

        if(startDate > endDate) {
            const { setSnackBarDisplay } = this.props;
            setSnackBarDisplay({
                show: true,
                message: 'Start date cannot be later than end date.'
            });
            return;
        }

        const { setDateRange } = this.props;
        setDateRange({
            startDate,
            endDate,
        });
    };

    setDate(dateVal: Date, type: string) {
        this.setState({ [type]: dateVal }, () => {
            const { startDate, endDate } = this.state;
            if(startDate > endDate) {
                this.setState({ endDate: startDate }, () => {
                    this.onDateFilterClick();
                });
            } else {
                this.onDateFilterClick();
            }
        });
    };

    onClearDateRange() {
        const { dateNow } = this.state;
        const { setDateRange } = this.props;
        setDateRange({ startDate: null, endDate: null });
        this.setState({
            startDate: dateNow,
            endDate: dateNow
        });
    };

    render() {
        const { startDate, endDate } = this.state;
        const { appState } = this.props;
        const { dateRange } = appState;

        return (
            <DateSelectorWrapper className="date-selector">
                <div className="date-area">
                    <div className="date-col start-date">
                        <div className="label">Start Date</div>
                        <DatePicker
                            id="startDatePicker"
                            selected={startDate}
                            onChange={(date: Date) => this.setDate(date, 'startDate')}
                            placeholderText='Select your start date'
                            popperPlacement="bottom"
                            todayButton="Today"
                            className="datepicker-input"
                        />
                    </div>
                    <div className="icon-range">
                        <FontAwesomeIcon icon={faArrowsAltH} />
                    </div>
                    <div className="date-col end-date">
                        <div className="label">End Date</div>
                        <DatePicker
                            id="endDatePicker"
                            selected={endDate < startDate ? startDate : endDate}
                            onChange={(date: Date) => this.setDate(date, 'endDate')}
                            minDate={startDate}
                            placeholderText='Select your end date'
                            popperPlacement="bottom"
                            todayButton="Today"
                            className="datepicker-input"
                        />
                    </div>
                </div>
                { !!dateRange.startDate || !!dateRange.endDate
                    ? <button id="clearDateRange" onClick={this.onClearDateRange}><FontAwesomeIcon icon={faTimes} /></button>
                    : <button id="goFilter" onClick={this.onDateFilterClick}><FontAwesomeIcon icon={faCalendarCheck} /></button>
                }
            </DateSelectorWrapper>
        );
    }
}

const mapStateToProps = (state: ReducerStateData) => {
    return ({ appState: state.appState })
};

const mapDispatchToProps = (dispatch: any) => ({
    setDateRange: (data: DateRangeData) => dispatch(setDateRange(data)),
    setSnackBarDisplay: (data: SnackBarData) => dispatch(setSnackBarDisplay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);



const DateSelectorWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    
    & .date-area {
        display: flex;
        width: calc(100% - ${layout.filterBarHeight});
        padding: 0 ${layout.largeGap};
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
    }
    
    & .date-col {
        box-sizing: border-box;
        font-size: ${layout.fontSizeStandard};
        
        & > .label {
            margin-bottom: ${layout.xSmallGap};
            font-size: ${layout.fontSizeSmall};
            font-weight: 500;
        }
    }
    
    & .icon-range {
        padding: 1.4rem 3px 0;
    }
    
    & > button {
        ${styles.filterBarButtonStyle};
    }
    
    & .react-datepicker__triangle {
        left: 50%;
    }
    
    & .react-datepicker__input-container {
        & > input[type="text"] {
            width: 6rem;
            padding: ${layout.xSmallGap} ${layout.smallGap};
            border: ${styles.lineStyle};
            font-size: ${layout.fontSizeStandard};
            text-align: center;
            background-color: ${colors.lightGray};
            box-sizing: border-box;
            
            &:focus {
                outline: none;
            }
        }
    }
`;