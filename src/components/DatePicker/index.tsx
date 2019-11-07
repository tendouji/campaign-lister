import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons/faArrowsAltH'
import { colors, layout, styles } from '../../constants/ui';
import { setSearchKey, setSnackBarDisplay } from "../../actions";
import { ReducerStateData, SnackBarData } from '../../models';

import "react-datepicker/dist/react-datepicker.css";


type DatePickerInputData = {
    [key:string]: any
}

class DatePickerInput extends React.PureComponent<DatePickerInputData> {
    render() {
        const { value, onClick } = this.props;
        return (
            <DatePickerInputWrapper className="date-input" onClick={onClick}>
                {value}
            </DatePickerInputWrapper>
        )
    }
}

const DatePickerInputWrapper = styled.button`
    width: 7rem;
    padding: ${layout.xSmallGap} ${layout.smallGap};
    border: ${styles.lineStyle};
    font-size: ${layout.fontSizeStandard};
    background-color: ${colors.lightGray};
    box-sizing: border-box;
`;


type DateSelectorProps = {
    [key:string]: any
}

class DateSelectorBase extends React.Component<DateSelectorProps, any> {
    // private searchKeyRef: React.RefObject<HTMLInputElement>;

    constructor(props: DateSelectorProps) {
        super(props);

        const dateNow: Date = new Date();

        this.state = {
            dateNow,
            startDate: dateNow,
            endDate: dateNow,
        };

        // this.searchKeyRef = React.createRef();
    }

    onDateFilterClick = (e: React.MouseEvent) => {
        const { startDate, endDate } = this.state;

        if(startDate > endDate) {
            const { setSnackBarDisplay } = this.props;
            setSnackBarDisplay({
                show: true,
                message: 'Start date cannot be earlier than end date.'
            });
            return;
        }



        /*const searchKeyElm = this.searchKeyRef.current;
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
        }*/
    };

    setDate = (dateVal: Date, type: string) => {
        this.setState({ [type]: dateVal });
    };

    render() {
        const { dateNow, startDate, endDate } = this.state;
        // console.log('searchKey:', this.props.appState.searchKey);
        return (
            <DateSelectorWrapper className="date-selector">
                <div className="date-area">
                    <div className="date-col start-date">
                        <div className="label">Start Date</div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => this.setDate(date, 'startDate')}
                            minDate={dateNow}
                            customInput={<DatePickerInput />}
                            placeholderText='Select your start date'
                            popperPlacement="bottom"
                        />
                    </div>
                    <div className="icon-range">
                        <FontAwesomeIcon icon={faArrowsAltH} />
                    </div>
                    <div className="date-col end-date">
                        <div className="label">End Date</div>
                        <DatePicker
                            selected={endDate < startDate ? startDate : endDate}
                            onChange={(date: Date) => this.setDate(date, 'endDate')}
                            minDate={startDate}
                            customInput={<DatePickerInput />}
                            placeholderText='Select your end date'
                            popperPlacement="bottom"
                        />
                    </div>
                </div>
                <button onClick={this.onDateFilterClick}><FontAwesomeIcon icon={faCalendarCheck} /></button>
            </DateSelectorWrapper>
        );
    }
}

const mapStateToProps = (state: ReducerStateData) => {
    return ({ appState: state.appState })
};

const mapDispatchToProps = (dispatch: any) => ({
    setSearchKey: (data: string) => dispatch(setSearchKey(data)),
    setSnackBarDisplay: (data: SnackBarData) => dispatch(setSnackBarDisplay(data)),
});

const DateSelector = connect(mapStateToProps, mapDispatchToProps)(DateSelectorBase);

export default DateSelector;


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
`;