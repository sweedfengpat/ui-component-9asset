import { Box, Button, Dialog, Divider, Grid, IconButton, InputAdornment, List, ListItemButton, ListItemText, MenuItem, Paper, Select, TextField, Typography, styled } from "@mui/material";
import { ContextMenu } from "./ContextMenuLayout";
import React, { useRef } from "react";
import { useState } from "react";
import { InfoCard } from "../components/InfoCard";
import { SearchOutlined } from "@mui/icons-material";
import { BuyerSearchModal } from "../components/BuyerSearchModal";


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
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const contentRef = useRef<HTMLIFrameElement|null>(null);

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

    const handleClosed = () => {
        setLevel(0);
        setMode(Mode.Default);
        setIsSearching(false);
        props.onClose?.();
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
        return mode !== Mode.Default
            ? <Paper
                elevation={0}
                sx={{ p: 0, width: '100%', height: '100%' }}
                component="iframe"
                src={getUrl()}
                ref={contentRef}
              ></Paper> 
            : <Box sx={{ p: 1}}><Paper elevation={0} sx={{ p: 2 }} >{ renderDefault() }</Paper></Box>
    }

    const getUrl = () => {
        switch(mode) {
            case Mode.AddRequirment:
                return `${process.env.NEXT_PUBLIC_BUYER_URL || 'https://my.9asset.com/buyer'}/requirement?isHeadlessMode=true`;
            case Mode.Requirements:
                return `${process.env.NEXT_PUBLIC_BUYER_URL || 'https://my.9asset.com/buyer'}/requirements?isHeadlessMode=true`;
            case Mode.Interested:
                return `${process.env.NEXT_PUBLIC_BUYER_URL || 'https://my.9asset.com/buyer'}/interested?isHeadlessMode=true`;
            case Mode.RecentlyView:
                return `${process.env.NEXT_PUBLIC_BUYER_URL || 'https://my.9asset.com/buyer'}/recently?isHeadlessMode=true`;
            case Mode.Appointment:
                return `${process.env.NEXT_PUBLIC_BUYER_URL || 'https://my.9asset.com/buyer'}/appointment?isHeadlessMode=true`;
            case Mode.Inquiry:
                return `${process.env.NEXT_PUBLIC_BUYER_URL || 'https://my.9asset.com/buyer'}/inquiry?isHeadlessMode=true`;
            case Mode.Default:
            default:
                return ""; // <Box sx={{ p: 1}}><Paper elevation={0} sx={{ p: 2 }} >{ renderDefault() }</Paper></Box>;
        }
    }

    const handleBackRequested = () => {
        setLevel(0);
        setMode(Mode.Default);
        setIsSearching(false);
    }

    const handleSearchRequested = () => {
        setIsSearching(true);
    }

    const handleSearchApplied = (payload: any) => {
        console.log(payload);
        contentRef?.current?.contentWindow?.postMessage({
            target: 'buyerApp',
            type: 'search-requested',
            payload
        }, '*');
        setIsSearching(false);
    }

    const getAdditionalButtons = () => {
        if (level === 0) {
            return <Button variant="text" sx={{ p: 0, textTransform: 'none', fontWeight: '600' }}>Seller Center</Button>;
        }
        return <IconButton color="primary" onClick={handleSearchRequested}><SearchOutlined /></IconButton>
    }

    return (<>
    <ContextMenu
        level={level}
        open={props.open}
        title={ level === 0 ?'Buyer' : 'My Requirement' }
        additionalAction={getAdditionalButtons()}
        onClose={handleClosed}
        onBackRequested={handleBackRequested}
    >
        { getMenuDetail() }
        
    </ContextMenu>
    <BuyerSearchModal
        open={isSearching}
        onSearchRequested={handleSearchApplied}
        onClose={() => setIsSearching(false) }
    />
    </>);
}