import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, layout, styles } from "../../constants/ui";
import { config } from "../../constants/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";


type SnackBarProps = {
    show: false,
    message: '',
    close: () => void,
}

class SnackBar extends Component<SnackBarProps, {}> {
    private snackBarTimer: ReturnType<typeof setTimeout> = 0;

    constructor(props: any) {
        super(props);
        this.closeHandler = this.closeHandler.bind(this);
    }

    closeHandler = () => {
        const { close } = this.props;
        close();
    };

    componentDidMount() { }

    componentDidUpdate(prevProps: SnackBarProps) {
        const { show } = this.props;

        if(prevProps.show !== show) {
            if(!!show) {
                if(!!this.snackBarTimer) {
                    clearTimeout(this.snackBarTimer);
                }
                this.snackBarTimer = setTimeout(() => {
                    this.closeHandler();
                }, config.snackBarLifeSpan);
            }
        }
    }

    render() {
        const { show, message } = this.props;

        return (
            <SnackBarWrapper
                className={[
                    'snackbar',
                    !!show ? ` show` : '',
                ].join('')}
            >
                <div className="content">{message}</div>
                <div className="close" onClick={this.closeHandler}>
                    <FontAwesomeIcon icon={faTimesCircle} size={'lg'} />
                </div>
            </SnackBarWrapper>
        )
    }
}


const closeSize = '20px';
const transitionTime = config.snackBarTransition;
const SnackBarWrapper = styled.div`
    display: flex;
    position: fixed;
    top: -200px;
    right: ${layout.standardGap};
    max-width: calc(100% - 2 * ${layout.standardGap});
    min-width: 300px;
    padding: ${layout.smallGap} ${layout.standardGap};
    border-radius: ${layout.borderRadius};
    box-sizing: border-box;
    color: ${colors.white};
    background-color: ${colors.black};
    justify-content: space-between;
    transition: top ${transitionTime * 2}ms;
    
    &.show {
        top: ${layout.standardGap};
        transition: top ${transitionTime}ms;
    }
    
    & > .content {
        width: calc(100% - ${closeSize});
        margin-right: ${layout.standardGap};
        line-height: ${closeSize};
        font-size: ${layout.fontSizeStandard};
        font-weight: 400;
        ${styles.textOverflowStyle}
    }
    
    & > .close {
        height: ${closeSize};
        width: ${closeSize};
        
        & * {
            cursor: pointer;
        }
    }
`;


export default SnackBar;
