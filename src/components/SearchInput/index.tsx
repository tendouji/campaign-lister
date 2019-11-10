import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { layout, styles} from '../../constants/ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { setSearchKey, setSnackBarDisplay } from "../../actions";
import { ReducerStateData, SnackBarData } from '../../models';
import { config } from "../../constants/config";
import { errorMessage, searchBarPlaceholder } from "../../constants/text";


type SearchInputState = {
    searchKeyValue: string
}

export class SearchInput extends React.Component<any, SearchInputState> {
    private searchKeyRef: React.RefObject<HTMLInputElement>;
    private searchKeyTimer: ReturnType<typeof setTimeout> = 0;

    constructor(props: any) {
        super(props);

        this.searchKeyRef = React.createRef();
        this.onSearchKeyChange = this.onSearchKeyChange.bind(this);
        this.onClearSearchKey = this.onClearSearchKey.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);

        this.state = {
            searchKeyValue: ''
        }
    }

    componentDidUpdate(prevProps: any) {
        const { appState } = this.props;

        if(!!prevProps.appState && !!appState) {
            if(prevProps.appState.searchKey !== appState.searchKey) {
                this.setState({ searchKeyValue: appState.searchKey });
            }
        }
    }

    onSearchClick(e?: React.MouseEvent | undefined) {
        const searchKeyElm = this.searchKeyRef.current;
        if(!!searchKeyElm) {
            const searchVal = searchKeyElm.value;

            if(searchVal.length < config.minSearchLength) {
                if(!!e) {
                    // NOTE: if e doesn't exist, it is called from onChange event
                    const { setSnackBarDisplay } = this.props;
                    setSnackBarDisplay({
                        show: true,
                        message: errorMessage.searchLengthShort(config.minSearchLength)
                    });
                }
                return;
            }

            const { setSearchKey } = this.props;
            setSearchKey(searchVal);
        }
    };

    onSearchKeyChange() {
        const searchKeyElm = this.searchKeyRef.current;
        if(!!searchKeyElm) {
            this.setState({searchKeyValue: searchKeyElm.value});

            if(searchKeyElm.value === '') {
                this.onClearSearchKey();
            }
        }

        clearTimeout(this.searchKeyTimer);
        this.searchKeyTimer = setTimeout(() => {
            this.onSearchClick();
        }, 500)
    };

    onClearSearchKey() {
        const { setSearchKey } = this.props;
        setSearchKey('');
    };

    render() {
        const { searchKeyValue } = this.state;
        const { appState } = this.props;

        return (
            <SearchWrapper className="search-input">
                <input type="text"
                    id="searchKey"
                    name="searchKey"
                    ref={this.searchKeyRef}
                    aria-label="Search Input"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={searchBarPlaceholder}
                    onChange={this.onSearchKeyChange}
                    value={searchKeyValue}
                />
                { !!appState && appState.searchKey !== ''
                    ? <button id="clearSearch" onClick={this.onClearSearchKey}><FontAwesomeIcon icon={faTimes} /></button>
                    : <button id="goSearch" onClick={this.onSearchClick}><FontAwesomeIcon icon={faSearch} /></button>
                }
            </SearchWrapper>
        )
    }
}

const mapStateToProps = (state: ReducerStateData) => {
    return ({ appState: state.appState })
};

const mapDispatchToProps = (dispatch: any) => ({
    setSearchKey: (data: string) => dispatch(setSearchKey(data)),
    setSnackBarDisplay: (data: SnackBarData) => dispatch(setSnackBarDisplay(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);



const SearchWrapper = styled.div`
    display: flex;
    width: 100%;
    align-item: center;
    
    & #searchKey {
        width: calc(100% - ${layout.filterBarHeight});
        padding: ${layout.largeGap};
        border: 0;
        font-size: ${layout.fontSizeStandard};
        
        &:focus {
            outline: none;
        }
    }
    
    & > button {
        ${styles.filterBarButtonStyle};
    }
`;