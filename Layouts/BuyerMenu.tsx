import { Box, Button, Divider, Grid, List, ListItemButton, ListItemText, Paper, Typography, styled } from "@mui/material";
import { ContextMenu } from "./ContextMenuLayout";
import React, { useRef } from "react";
import { useState } from "react";
import { InfoCard } from "../components/InfoCard";


const SectionLabel = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    fontSize: '16px'
}));

interface BuyerMenuProps {
    open: boolean;
    // children: React.ReactNode;
    changeToSellerRequested?: () => void;
    onClose?: () => void;
}

enum Mode {
    Default,
    AddRequirment,
    Requirements,
    Interested,
    RecentlyView,
    Appointment,
    Inquiry
}

export const BuyerMenu = (props: BuyerMenuProps) => {

    const [level, setLevel] = useState(0);
    const [mode, setMode] = useState<Mode>(Mode.Default);

    const handleChangeTo = (item: number) => {
        setLevel(1);
    }

    const onAddRequirementRequested = () => {
        setLevel(1);
        setMode(Mode.AddRequirment);
    }

    const handleInfoCardClicked = (key: string) => {
        if (key === 'requirement') {
            setLevel(1);
            setMode(Mode.Requirements);
        } else if (key === 'interested') {
            setLevel(1);
            setMode(Mode.Interested);
        } else if (key === 'recently') {
            setLevel(1);
            setMode(Mode.RecentlyView);
        } else if (key === 'appointment') {
            setLevel(1);
            setMode(Mode.Appointment);
        } else if (key === 'inquiry') {
            setLevel(1);
            setMode(Mode.Inquiry);
        }
    }

    const renderDefault = () => {
        return (<>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Button variant="contained" sx={{ textTransform: 'none', boxShadow: 0 }} onClick={onAddRequirementRequested}>
                    Add Requirement
                </Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
                <SectionLabel>Activities</SectionLabel>
            </Grid>
            <Grid item xs={4}>
                <InfoCard data="requirement" title="Requirements" value={1} onClick={handleInfoCardClicked} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard data="interested" title="Interested" value={10} onClick={handleInfoCardClicked} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard data="recently" title="Recently View" value={10} onClick={handleInfoCardClicked} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard data="appointment" title="Appointment" value={10} onClick={handleInfoCardClicked} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard data="inquiry" title="Inquiry" value={10} onClick={handleInfoCardClicked} />
            </Grid>
        </Grid>
        
        <Grid container spacing={1} sx={{ mt: 4 }}>
            <Grid item xs={12}>
                <SectionLabel>Package</SectionLabel>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Top up</Button>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Transfer</Button>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Button variant="outlined" color="info" sx={{ textTransform: 'none' }}>Report</Button>
            </Grid>
        </Grid>
        
        <Grid container spacing={1} sx={{ mt: 4 }}>
            <Grid item xs={12}>
                <SectionLabel>Account</SectionLabel>
            </Grid>
            <Grid item xs={12}>
                <List sx={{ }}>
                    <ListItemButton>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    
                </List>
                <List>
                <ListItemButton>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                    </List>
            </Grid>
        </Grid>
        </>);
    }

    const getMenuDetail = () => {
        switch(mode) {
            case Mode.AddRequirment:
                return <Paper elevation={0} sx={{ p: 0, width: '100%', height: '100%' }} component="iframe" src="http://localhost:3000/buyer/requirement?isHeadlessMode=true"></Paper>;
            case Mode.Requirements:
                return <Paper elevation={0} sx={{ p: 0, width: '100%', height: '100%' }} component="iframe" src="http://localhost:3000/buyer/requirements?isHeadlessMode=true"></Paper>;
            case Mode.Interested:
                return <Paper elevation={0} sx={{ p: 0, width: '100%', height: '100%' }} component="iframe" src="https://my.9asset.com/buyer/interested?isHeadlessMode=true"></Paper>;
            case Mode.RecentlyView:
                return <Paper elevation={0} sx={{ p: 0, width: '100%', height: '100%' }} component="iframe" src="https://my.9asset.com/buyer/recently?isHeadlessMode=true"></Paper>;
            case Mode.Appointment:
                return <Paper elevation={0} sx={{ p: 0, width: '100%', height: '100%' }} component="iframe" src="https://my.9asset.com/buyer/appointment?isHeadlessMode=true"></Paper>;
            case Mode.Inquiry:
                return <Paper elevation={0} sx={{ p: 0, width: '100%', height: '100%' }} component="iframe" src="https://my.9asset.com/buyer/inquiry?isHeadlessMode=true"></Paper>;
            case Mode.Default:
            default:
                return <Paper elevation={0} sx={{ p: 2 }} >{ renderDefault() }</Paper>;
        }
    }

    const handleBackRequested = () => {
        setLevel(0);
        setMode(Mode.Default);
    }

    return (
    <ContextMenu
        level={level}
        open={props.open}
        title={ level === 0 ?'Buyer' : 'My Requirement' }
        additionalAction={<Button variant="text" sx={{ p: 0, textTransform: 'none', fontWeight: '600' }}>Seller Center</Button>}
        onClose={() => props.onClose?.() }
        onBackRequested={handleBackRequested}
    >
        { getMenuDetail() }
    </ContextMenu>
    );
}