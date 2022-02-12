import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const MainContainer = styled.div({
    display: 'flex',
    width: '100%'
});

export interface HotActionBarProps {
    type: 'seller' | 'buyer';
    onNewRequirementRequest?: () => void;
    onNewPropertyRequest?: () => void;
}
class HotActionBar extends React.Component<HotActionBarProps> {

    public static defaultProps = {
        type: 'buyer'
    }

    onCreateNew = () => {
        if (this.props.onNewRequirementRequest) {
            this.props.onNewRequirementRequest();
        }

        if (this.props.onNewPropertyRequest) {
            this.props.onNewPropertyRequest();
        }
    }

    render () {
        return (
        <MainContainer>
            { this.props.type === 'buyer' ? (
                <>
                    <Button variant="contained" color="primary" style={{ marginRight: 5, backgroundColor: '#ff5e5e' }} onClick={this.onCreateNew}>Create Requirement</Button>
                    <Button variant="contained" color="secondary">Sell property/service</Button>
                </>)  : (
                <>
                    <Button variant="contained" color="primary" style={{ marginRight: 5, backgroundColor: '#ff5e5e' }} onClick={this.onCreateNew}>Create Property</Button>
                </>) }
        </MainContainer>);
    }
}

export default HotActionBar;