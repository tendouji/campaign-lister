import React from 'react';
import styled from 'styled-components';
import { layout, styles } from "../../constants/ui";
import SearchInput from "../SearchInput";
import DateSelector from "../DateSelector";
import { config } from "../../constants/config";


export const FilterBar = (): JSX.Element => (
    <FilterBarWrapper className="app-filter">
        <div className="column search-panel">
            <SearchInput />
        </div>
        <div className="column date-panel">
            <DateSelector />
        </div>
    </FilterBarWrapper>
);

const datePanelWidth: string = '23em';

const FilterBarWrapper = styled.div`
    display: flex;
    height: ${layout.filterBarHeight};
    border-bottom: ${styles.lineStyle};
    justify-content: space-between;
    align-items: center;
    
    & .column {
        box-sizing: border-box;
    }
    
    & .search-panel {
        width: calc(100% - ${datePanelWidth});
        border-right: ${styles.lineStyle};
    }
    
    & .date-panel {
        width: ${datePanelWidth};
    }
    
    @media screen and (max-width: ${config.mediumScreenWidth}) {
        display: block;
        height: auto;

        & .search-panel, 
        & .date-panel {
            width: 100%;
            padding: 0 10%;
            box-sizing: border-box;
        }
                
        & .search-panel {
            border-right: 0;
            border-bottom: ${styles.lineStyle};
        }
    }
    
    @media screen and (max-width: ${config.smallScreenWidth}) {
        & .search-panel, 
        & .date-panel {
            padding: 0;
        }
    }
`;