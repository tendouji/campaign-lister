import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors, layout } from "../../constants/ui";
import { logo } from "../../assets";


type HeaderProps = {
    title: string,
}

export const Header = ({ title }: HeaderProps): ReactElement => (
    <HeaderWrapper className="app-header">
        <div className="logo" />
        <h1>{ title }</h1>
    </HeaderWrapper>
);


const HeaderWrapper = styled.header`
    display: flex;
    height: ${layout.headerBarHeight};
    background: ${colors.primary}; 
    color: ${colors.white};
    
    & .logo {
        width: ${layout.headerBarHeight};
        height: ${layout.headerBarHeight};
        background: ${colors.black} url(${logo}) center / cover no-repeat;
    }
    
    & > h1 {
        padding: ${layout.largeGap};
        margin: 0;
    }
`;