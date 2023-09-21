import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Fade, IconButton, List, ListItem, ListItemButton, ListItemText, MenuList, Popover, Slide, Toolbar, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Close, NavigateBefore } from "@mui/icons-material";
import logoImage from '../assets/images/9asset-logo.png'
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
});


export const MenuDialog = styled(Dialog)(({ theme }) => ({
    '.MuiPaper-root': {
        position: 'absolute',
        top: '0px',
        width: '100%',
        margin: '0'
    },
}));


export interface MenuDialogTitleProps {
    logo?: string;
    menuType: MenuType;
    onClose?: () => void;
    onBackRequested?: () => void;
}


export const MenuDialogTitle = (props: MenuDialogTitleProps) => {

    const closeButton = (
    <IconButton 
        sx={{ position: 'absolute', right: 4, color: (theme) => theme.palette.grey[500] }}
        onClick={() => { props.onClose && props.onClose() }}
    >
        <Close />
    </IconButton>);

    const getMenuHeader  = () => {
        if (props.menuType === MenuType.Default) {
            return (
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
                    <Box component="img" src={props.logo} sx={{ width: 25 }} />
                    <Box
                        component="div"
                        sx={{
                            alignSelf: 'center',
                            pl: 1,
                            paddingTop: '0px',
                            fontWeight: '600',
                            color: 'black'
                        }}>
                        9Asset
                    </Box>
                </Box>
            </Box>
            );
        } else {
            return (
            <Box
                component="div"
                sx={{ 
                    whiteSpace: 'nowrap', 
                    display: 'flex', 
                    alignItems: 'center', 
                    verticalAlign: 'middle',
                    justifyContent: 'start',
                    width: '100%',
                }}
            >
                <IconButton 
                    sx={{ }}
                    color="primary"
                    onClick={() => { props.onBackRequested?.() }}
                >
                    <NavigateBefore />
                </IconButton>
                <Typography component="span" color="black">Language</Typography>
            </Box>);
        }
    }

    return (
    <AppBar
        sx={{
            '&.MuiPaper-root': {
                position: 'relative'
            },
            bgcolor: 'white'
        }}
    >
        <Toolbar color="white" sx={{ pr: 1, pl: props.menuType === MenuType.Default ? 2 : 0 }}>
            { getMenuHeader() }
            { props.onClose ? closeButton : null }
        </Toolbar>
    </AppBar>
    );
}

enum MenuType {
    Default,
    Language,
    Currency,
    Country
}

export interface MainMenuProps {
    logo?: string;
    open: boolean;
    elementRef: HTMLElement | null;

    onMenuClicked?: (item: string) => void;
    onMenuClose?: () => void;
}

export const MainMenu = (props: MainMenuProps) => {
    const { logo, open, elementRef, onMenuClose } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t, i18n } = useTranslation();
    const [ menuType, setMenuType ] = useState<MenuType>(MenuType.Default);

    const handleMenuClose = () => {
        setMenuType(MenuType.Default);
        onMenuClose?.();
    }

    const onLanguageChangeRequested = () => {
        setMenuType(MenuType.Language);
    }

    const onLanguageChanged = (language: 'en' | 'th' | 'cn') => {
        i18n.changeLanguage(language);
        setMenuType(MenuType.Default);
        onMenuClose?.();
    }

    const generalMenu = [
        { label: "ซื้อ" },
        { label: "เช่า" },
        { label: "โครงการ" },
        { label: "เซ้ง" },
    ];

    const configurationMenu = [
        { key: 'language', label: 'ภาษา', onClick: onLanguageChangeRequested },
        { key: 'country', label: 'ประเทศ' }
    ];

    const languagesMenu = [
        { label: 'ภาษาไทย', onClick: () => onLanguageChanged('th') },
        { label: 'English', onClick: () => onLanguageChanged('en') },
        { label: '中文', onClick: () => onLanguageChanged('cn') }
    ];
    const loginBasePath = process.env.REACT_APP_DOMAIN
        || process.env.NEXT_PUBLIC_DOMAIN
        || 'https://my.9asset.com';

    const generateMobileGenericMenu = (item: any, index: number) => {
        return (
        <ListItem disablePadding key={index}>
            <ListItemButton sx={{ py: "2px" }} onClick={item.onClick}>
                <ListItemText 
                    primary={
                        <Typography component="span" color="text.primary" sx={{ fontSize: '1.1em' }}>{ item.label }</Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
        );
    }

    const getValue = (key: string) => {
        if (key === 'language') {
            return (i18n.language || 'th').toUpperCase();
        } else if (key === 'country') {
            return 'ไทย'
        }
        return '';
    }

    const generateMobileConfigMenu = (item: any, index: number) => {
        return (
        <ListItem
            disablePadding
            key={index}
            secondaryAction={
                <Typography>{getValue(item.key)}</Typography>
            }
        >
            <ListItemButton sx={{ py: "2px" }} onClick={item.onClick}>
                <ListItemText 
                    primary={
                        <Typography component="span" color="text.primary" sx={{ fontSize: '1.1em' }}>{ item.label }</Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
        )
    }

    const handleLogin = () => {
        props.onMenuClicked?.('login');
    }

    const renderNonAuthMenu = () => (
        <ListItem component="div" disablePadding>
          <ListItemButton 
            sx={{ textAlign: 'center', marginRight: '10px' }}
            onClick={handleLogin}
            component="a"
          >
            <ListItemText
              primary={t('Sign in')}
              primaryTypographyProps={{
                color: '#f4762a',
                fontWeight: 'medium',
                variant: 'body1',
              }}
            />
          </ListItemButton>
            { t('or') }
          <ListItemButton component="a" 
            href= {`${loginBasePath}/login/register`}
            sx={{ textAlign: 'center', marginLeft: '10px' }}
          >
            <ListItemText
              primary={t('Sign up')}
              primaryTypographyProps={{
                color: '#f4762a',
                fontWeight: 'medium',
                variant: 'body1',
              }}
            />
          </ListItemButton>
        </ListItem>
      );

    const renderMenuItems = () => {

        if (isMobile) {
            if (menuType === MenuType.Default) {
                return (
                <List>
                    {renderNonAuthMenu()}
                    { generalMenu.map(generateMobileGenericMenu) }
                    <Divider sx={{ my: 1 }} />
                    { configurationMenu.map(generateMobileConfigMenu) }
                </List>
                );
            } else if (menuType === MenuType.Language) {
                return (
                <List>
                    { languagesMenu.map(generateMobileGenericMenu) }
                </List>
                );
            }
        }
        return (<></>);
    }

    const renderMobileMenu = () => {
        return (
        <MenuDialog
            sx={{ m: 0 }}
            open={open}
            fullScreen={true}
            onClose={handleMenuClose}
            TransitionComponent={Transition}
        >
            <MenuDialogTitle
                logo={logo}
                menuType={menuType}
                onClose={handleMenuClose}
                onBackRequested={() => setMenuType(MenuType.Default)}
            />
            {/* <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                onClick={handleMenuClose}
                >
                <Close />
            </IconButton> */}
            
            <DialogContent sx={{ py: 0, px: 0 }}>
                { renderMenuItems() }
            </DialogContent>
        </MenuDialog>);
    }

    const renderPopoverMenu = () => {
        return (
        <Popover
            open={elementRef !== null && open}
            anchorEl={elementRef}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            onClose={handleMenuClose}
        >
            { renderMenuItems() }
        </Popover>);
    }
    
    return isMobile ? renderMobileMenu() : renderPopoverMenu();
}