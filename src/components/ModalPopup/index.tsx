import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, layout, styles } from "../../constants/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";


type ModalPopupProps = {
    show: boolean,
    title: string,
    content: string,
    close?: () => void
}

class ModalPopup extends Component<ModalPopupProps, {}> {
    constructor(props: ModalPopupProps) {
        super(props);
        this.closeHandler = this.closeHandler.bind(this);
    }

    closeHandler = () => {
        const { close } = this.props;
        if(!!close) close();
    };

    render() {
        const {
            show,
            title,
            content
        } = this.props;

        return (
            <ModalPopupWrapper
                className={[
                    'modal-popup',
                    !!show ? ` show` : '',
                ].join('')}
            >
                <div className="bg" />
                <div className="fg">
                    <div className="header">
                        <div className="title">{title}</div>
                        <div className="close" onClick={this.closeHandler}>
                            <FontAwesomeIcon icon={faTimes} size={'lg'} />
                        </div>
                    </div>
                    <div className="content">
                        <div dangerouslySetInnerHTML={{__html: content}} />
                    </div>
                </div>
            </ModalPopupWrapper>
        )
    }
}

export default ModalPopup;


const closeSize = '3rem';
const ModalPopupWrapper = styled.div`
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 5;
    
    & > .bg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
    }
    
    &.show {
        display: flex;
    }
    
    & > .fg {
        display: inline-block;
        position: relative;
        width: calc(100% - 2 * ${layout.standardGap});
        height: calc(100% - 2 * ${layout.standardGap});
        border: ${styles.lineStyle};
        border-radius: ${layout.borderRadius};
        box-sizing: border-box;
        background-color: ${colors.white};
        
        & > .header {
            display: flex;
            height: ${closeSize};
            border-bottom: ${styles.lineStyle};
            justify-content: space-between;
            align-items: center;
            
            & .title {
                width: calc(100% - ${closeSize});
                padding: 0 ${layout.standardGap} ;
                box-sizing: border-box;
                font-weight: 700;
                ${styles.textOverflowStyle}
            }
            
            & .close {
                ${styles.filterBarButtonStyle};
                display: flex;
                height: ${closeSize};
                width: ${closeSize};
                font-size: ${layout.fontSizeLarge};
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
        
        & .content {
            height: calc(100% - 3rem);
            padding: ${layout.standardGap};
            box-sizing: border-box;
            overflow-y: auto;
        }
    }
`;
