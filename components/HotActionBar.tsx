import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const MainContainer = styled.div({
    display: 'flex',
    marginTop: '15px',
    width: '100%'
});

export interface HotActionBarProps {
    type: 'seller' | 'buyer';

    onNewRequirementRequest?: () => void;
    onSellPropertyRequest?: () => void;
    
    onNewPropertyRequest?: () => void;
    onNewProjectRequest?: () => void;
}
class HotActionBar extends React.Component<HotActionBarProps> {

    public static defaultProps = {
        type: 'buyer'
    }

    onCreateNewRequirement = () => {
        if (this.props.onNewRequirementRequest) {
            this.props.onNewRequirementRequest();
        }
    }

    onSellProperty = () => {
        if (this.props.onSellPropertyRequest) {
            this.props.onSellPropertyRequest();
        }
    }

    onCreateNewProperty = () => {
        if (this.props.onNewPropertyRequest) {
            this.props.onNewPropertyRequest();
        }
    }

    onCreateNewProject = () => {
        if (this.props.onNewProjectRequest) {
            this.props.onNewProjectRequest();
        }
    }


    render () {
        return (
        <MainContainer>
            {/* { this.props.type === 'buyer' ? (
                <> */}
                    <Button variant="contained" color="success" style={{ marginRight: 5 }} onClick={this.onCreateNewRequirement}>Create Requirement</Button>
                    <Button variant="contained" color="warning" onClick={this.onCreateNewProject}>Add Listing</Button>
                {/* </>)  : (
                <>
                    <Button variant="contained" color="primary" style={{ marginRight: 5, backgroundColor: '#ff5e5e' }} onClick={this.onCreateNewProperty}>Create Property</Button>
                    <Button variant="contained" color="secondary" onClick={this.onCreateNewProject}>Create Project</Button>
                </>) } */}
        </MainContainer>);
    }
}

export default HotActionBar;