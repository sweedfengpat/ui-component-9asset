import { Box, Button, Divider, Grid, List, ListItemButton, ListItemText, Paper, Typography, styled } from "@mui/material";
import { ContextMenu } from "./ContextMenuLayout";
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

export const BuyerMenu = (props: BuyerMenuProps) => {

    const [level, setLevel] = useState(0);

    const handleChangeTo = (item: number) => {
        setLevel(1);
    }

    const renderDefault = () => {
        return (<>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Button variant="contained" sx={{ textTransform: 'none', boxShadow: 0 }} onClick={() => handleChangeTo(1)}>
                    Add Requirement
                </Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
                <SectionLabel>Activities</SectionLabel>
            </Grid>
            <Grid item xs={4}>
                <InfoCard title="Requirements" value={1} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard title="Interested" value={10} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard title="Recently View" value={10} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard title="Appointment" value={10} />
            </Grid>
            <Grid item xs={4}>
                <InfoCard title="Inquiry" value={10} />
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
        if (level === 0) {
            return renderDefault();
        }
        return <Button variant="contained" onClick={() => handleChangeTo(1)}>B</Button>;
    }

    return (
    <ContextMenu
        level={level}
        open={props.open}
        title={ level === 0 ?'Buyer' : 'My Requirement' }
        additionalAction={<Button variant="text" sx={{ p: 0, textTransform: 'none', fontWeight: '600' }}>Seller Center</Button>}
        onClose={() => props.onClose?.() }
        onBackRequested={() => { setLevel(0); } }
    >
        <Paper elevation={0} sx={{ p: 2 }}>
            { getMenuDetail() }
        </Paper>
    </ContextMenu>
    );
}