import React from 'react';
import { Paper, styled, Typography } from '@mui/material';

export const CustomPaper = styled(Paper)({
    // minHeight: '200px',
    // marginTop: '15px',
    // marginBottom: '40px',
    padding: '20px 20px',
});

export interface NaPaperProps {
    label?: string;
    children?: React.ReactNode;
}

export default class NaPaper extends React.Component<NaPaperProps, any> {

    render() {
        return (
        <CustomPaper sx={{ flexGrow: 1, marginBottom: '15px' }}>
            { this.props.label ? (<Typography variant="h5" style={{ marginBottom: '15px' }} >{ this.props.label || '' }</Typography>) : (<></>) }
            { this.props.children }
        </CustomPaper>);
    }
}