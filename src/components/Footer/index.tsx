import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors, layout, styles } from "../../constants/ui";
import { footerString } from "../../constants/text";


export const Footer = (): ReactElement => (<>
    <PadWrapper />
    <FooterWrapper className="footer">
        <span>{footerString((new Date()).getFullYear())}</span>
    </FooterWrapper>
</>);

const PadWrapper = styled.div`
    height: calc(${layout.standardGap} + ${layout.footerBarHeight});
`;

const FooterWrapper = styled.footer`
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    height: ${layout.footerBarHeight};
    font-size: ${layout.fontSizeStandard};
    text-align: center;
    line-height: ${layout.footerBarHeight};
    border-top: ${styles.lineStyle};
    background: ${colors.lightGray}; 
`;
