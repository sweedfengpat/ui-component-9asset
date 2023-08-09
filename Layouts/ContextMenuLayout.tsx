import { Close, NavigateBefore, Verified } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Slide, Stack, Toolbar, Typography, styled, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
// import logo from '../assets/images/9asset-logo.png'
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import theme from "../theme";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const ContextModal = styled(Dialog)(({ theme }) => ({

}));

interface ContextModalTitleWithProfileProps {
    title: React.ReactNode;
    additionalAction: React.ReactNode;
    onClose?: () => void;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    background: 'white',
    // alignItems: 'flex-start',
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
      minHeight: 48,
    },
}));

const ContextModalTitleWithProfile = (props: ContextModalTitleWithProfileProps) => {

    const closeButton = (
    <IconButton 
        sx={{ position: 'absolute', right: 4, color: (theme) => theme.palette.grey[500] }}
        onClick={() => { props.onClose && props.onClose() }}
    >
        <Close />
    </IconButton>
    );
    return (
    //<DialogTitle sx={{ py: 1, pl: 1, pr: 6 }}>
    <AppBar
        elevation={4}
        sx={{
            '&.MuiPaper-root': {
                position: 'relative'
            },
            bgcolor: 'white',
            
        }}
    >
        <StyledToolbar sx={{ pr: 6 }}>
            
            <Box
                component="div" 
                sx={{ 
                    whiteSpace: 'nowrap', 
                    display: 'flex', 
                    alignItems: 'center', 
                    verticalAlign: 'middle',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    {/* <Box component="img" src={logo} sx={{ width: 20, marginTop: '-2px' }} /> */}
                    <Box component="span" sx={{ pl: 1, paddingTop: '0px', fontWeight: '600', color: 'black' }}>{props.title}</Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                { props.additionalAction }
                </Box>
            </Box>
            { props.onClose ? closeButton : null } 
            
            
        </StyledToolbar>
    </AppBar>
    );
}

interface ContextModalTitleProps {
    title: React.ReactNode;
    additionalAction: React.ReactNode;
    onClose?: () => void;
    onBackRequested?: () => void;
}

const ContextModalTitle = (props: ContextModalTitleProps) => {

    const closeButton = (
    <IconButton 
        sx={{ position: 'absolute', right: 4, color: (theme) => theme.palette.grey[500] }}
        onClick={() => { props.onClose && props.onClose() }}
    >
        <Close />
    </IconButton>);

    return (
    <AppBar
        elevation={3}
        sx={{
            '&.MuiPaper-root': {
                position: 'relative'
            },
            bgcolor: 'white'
        }}
    >
        <StyledToolbar sx={{ pr: 6, pl: 1 }}>
            <Box
                component="div" 
                sx={{ 
                    whiteSpace: 'nowrap', 
                    display: 'flex', 
                    alignItems: 'center', 
                    verticalAlign: 'middle',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Box component="div" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <IconButton 
                        sx={{ }}
                        color="primary"
                        onClick={() => { props.onBackRequested?.() }}
                    >
                        <NavigateBefore />
                    </IconButton>
                    <Box component="span" sx={{ pl: 1, paddingTop: '0px', fontWeight: '600', color: 'black' }}>{props.title}</Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                { props.additionalAction }
                </Box>
            </Box>
            { props.onClose ? closeButton : null } 
        </StyledToolbar>
    </AppBar>
    );
}

interface ContextMenuProps {
    level: number;
    title: React.ReactNode;
    additionalAction: React.ReactNode;
    open: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    onBackRequested?: () => void;
}

export const ContextMenu = (props: ContextMenuProps) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [title, setTitle] = useState(props.title);
    const [user, setUser] = useState<any>(null);
    const userInfo = JSON.parse(localStorage.getItem(`9asset.userinfo`) || '{}');
    
    useEffect(() => {
        setUser(userInfo);
    }, []);
    useEffect(() => {
        setUser(userInfo);
    }, [userInfo]);
    
    useEffect(() => {
        window.addEventListener('message', onMessageReceived);
    }, []);

    const onMessageReceived = (e: MessageEvent) => {
        if (e.origin !== process.env.NEXT_PUBLIC_URL_BASE) {
            return;
        }
        
        try {
            const payload = e.data;
            if (payload) {
                if (payload.type === 'set-title') {
                    setTitle(payload.payload.title);
                }
            }
        } catch {

        }
    }

    const getName = () => {
        return user ? `${user.nameTh} ${user.lastnameTh}` : '';
    }

    const handleClose = () => {
        props.onClose?.();
    }

    const renderProfile = () => {
        return user ? (
        <Paper elevation={0}>
            <List sx={{ bgcolor: 'white', width: '100%', p: 0, mb: 1 }} >
                <ListItem alignItems="flex-start" sx={{ pt: 0 }}>
                    <ListItemAvatar sx={{ display: 'flex', alignSelf: 'center', m: 0 }}>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography sx={{ color: theme.palette.grey[800], fontWeight: '600', fontSize: '14px' }} variant="body1">{getName()}</Typography>}
                        secondary={
                        <Stack direction="column" sx={{ p: 0 }}>
                            <Box sx={{ display: 'inline-flex'}}>
                                <Typography sx={{ fontSize: '10px',  }}>{user?.email || '-'}</Typography>
                                <Typography sx={{ fontSize: '10px', pl: 1 }} color="green">{user?.emailVerified ? 'Verified' : '' }</Typography> 
                            </Box>
                            <Typography component="span" sx={{ fontSize: '10px' }} color="primary">150 Coins</Typography>
                        </Stack>
                        }
                    />
                </ListItem>
            </List>
        </Paper>) : (<></>);
    }

    return (
    <ContextModal
        open={props.open}
        fullScreen={isMobile}
        TransitionComponent={Transition}
        scroll="paper"
    >
        { props.level === 0 ? 
            <ContextModalTitleWithProfile
                title={props.title}
                additionalAction={props.additionalAction}
                onClose={handleClose}
            ></ContextModalTitleWithProfile> : 
            <ContextModalTitle
                title={title}
                additionalAction={props.additionalAction}
                onClose={handleClose}
                onBackRequested={props.onBackRequested}
            /> }
        <DialogContent dividers={true} sx={{ p: '0px', bgcolor: theme.palette.grey[100] }}>
            { props.level === 0 ? renderProfile() : <></>}
            { props.children }
        </DialogContent>
    </ContextModal>
    );
}