import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors, layout } from "../../constants/ui";


type HeaderProps = {
    title: string,
}

export const Header = ({ title }: HeaderProps): ReactElement => (
    <HeaderWrapper className="app-header">
        <h1>{ title }</h1>
    </HeaderWrapper>
);


const HeaderWrapper = styled.header`
    padding: ${layout.largeGap};
    background: ${colors.primary}; 
    color: ${colors.white};
    
    & > h1 {
        margin: 0;
    }
`;