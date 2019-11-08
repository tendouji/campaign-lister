const colors = {
    primary: '#43cadb',
    white: '#fff',
    black: '#000',
    darkGray: '#666',
    gray: '#ddd',
    lightGray: '#f6f6f6',
    lightGray2: '#eee',
    green: '#4caf50',
    red: '#ff2717',
    yellow: '#ffc107',
    blue: '#03a9f4',
};

const layout = {
    xSmallGap: '0.3125rem',
    smallGap: '0.625rem',
    standardGap: '1rem',
    largeGap: '1.25rem',
    borderRadius: '4px',

    fontSizeSmall: '0.75rem',
    fontSizeStandard: '0.875rem',
    fontSizeMedium: '1rem',
    fontSizeLarge: '1.25rem',
    fontSizeXLarge: '1.5rem',

    filterBarHeight: '4.5rem',
};

const styles = {
    lineStyle: `1px solid ${colors.gray}`,
    textOverflowStyle: `
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    `,

    filterBarButtonStyle: `
        width: ${layout.filterBarHeight};
        height: ${layout.filterBarHeight};
        padding: 0;
        border: 0;
        font-size: ${layout.fontSizeXLarge};
        cursor: pointer;
        
        &:hover {
            background-color: ${colors.lightGray};
        }
        
        &:focus {
            outline: none;
        }
    `
};


export {
    colors,
    layout,
    styles,
}