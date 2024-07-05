import { AppBar, Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Fade, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Slide, Toolbar, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Close, Language, NavigateBefore } from "@mui/icons-material";
import logoImage from '../assets/images/9asset-logo.png';
import { useTranslation } from "react-i18next";
import { MenuItem as IMenuItem } from "../Toolbar";
import { User } from "firebase/auth";
import { getUserName } from "../../Layouts/Profile";

type MenuItem = IMenuItem & {
    onClick?: () => void;
    icon?: JSX.Element;
}

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

const MenuSubItem = styled(MenuItem)(({ theme }) => ({
    '.MuiListItemText-primary': {
        fontSize: '1em',
    
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1em',
        }
    }
}));


export interface MenuDialogTitleProps {
    logo?: string;
    menuType: MenuType;
    onClose?: () => void;
    onBackRequested?: () => void;
}


export const MenuDialogTitle = (props: MenuDialogTitleProps) => {
    const { t } = useTranslation();
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
                        9asset
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
                <Typography component="span" color="black">{t('Language')}</Typography>
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

    loggedInItems: IMenuItem[];
    user: User | null;
    userInfo: any | null;

    onMenuClicked?: (item: string, link?: string) => void;
    onLanguageChanged?: (ln: string) => void;
    onMenuClose?: () => void;
}

export const MainMenu = (props: MainMenuProps) => {
    const DisplayLanguage: { [index in 'th' | 'en' | 'cn' | string]: string} = {
        'en': 'English',
        'th': 'ไทย',
        'cn': '中文' 
    }

    const { logo, open, elementRef, onMenuClose } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t, i18n } = useTranslation();
    const [ menuType, setMenuType ] = useState<MenuType>(MenuType.Default);

    const getIsAuth = () => {
        return  props.user !== null;
    }

    const getName = () => {
        const currentLanguage = i18n.language || 'th';
        if (props.userInfo) {
            if(currentLanguage === 'en') {
                return `${props.userInfo.nameEn || '' } ${props.userInfo.lastnameEn || '' }`.trim();
            } else if(currentLanguage === 'cn') {
                return `${props.userInfo.nameCn || '' } ${props.userInfo.lastnameCn || '' }`.trim();
            } else {
                return `${props.userInfo.nameTh || '' } ${props.userInfo.lastnameTh || '' }`.trim();
            }
        }
        else {
            return props.user?.displayName || '';
        }
    }

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
        props.onLanguageChanged?.(language);
    }

    const generalMenu = [
        { key: 'sale', text: t('sell'), onClick: () => props.onMenuClicked?.('sale') },
        { key: 'rent', text: t('rent'), onClick: () => props.onMenuClicked?.('rent') },
        { key: 'mortgage', text: t('mortgageOrRedemption'), onClick: () => props.onMenuClicked?.('lease') },
        { key: 'project', text: t('project'), onClick: () => props.onMenuClicked?.('project') },
        { key: 'article', text: t('article'), onClick: () => props.onMenuClicked?.('article')  }
    ] as MenuItem[];

    const configurationMenu = [
        { key: 'language', text: t('Language'), icon: <Language />, onClick: onLanguageChangeRequested },
    ] as MenuItem[];

    const languagesMenu = [
        { text: 'ไทย', onClick: () => onLanguageChanged('th') },
        { text: 'English', onClick: () => onLanguageChanged('en') },
        { text: '中文', onClick: () => onLanguageChanged('cn') }
    ] as MenuItem[];

    const loginBasePath = process.env.REACT_APP_DOMAIN
        || process.env.NEXT_PUBLIC_DOMAIN
        || 'https://my.9asset.com';

    const generateMobileGenericMenu = (item: MenuItem, index: number) => {
        return (
        <ListItem disablePadding key={index} sx={{ paddingTop: '10px' }}>
            <ListItemButton sx={{ py: "2px" }} onClick={item.onClick}>
                <ListItemText 
                    primary={
                        <Typography component="span" color="text.primary" sx={{ fontSize: '1.1em' }}>{ item.text }</Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
        );
    }

    const getValue = (key: string) => {
        if (key === 'language') {
            return DisplayLanguage[(i18n.language || 'th')];
        } else if (key === 'country') {
            return 'ไทย'
        }
        return '';
    }

    const generateMobileConfigMenu = (item: MenuItem, index: number) => {
        return (
        <ListItem
            disablePadding
            key={index}
            sx={{ paddingTop: '10px' }}
        >
            <ListItemButton sx={{ py: "2px" }} onClick={item.onClick}>
                { item.icon && <ListItemIcon sx={{ width: '30px', minWidth: '30px' }}>{item.icon}</ListItemIcon>}
                <ListItemText 
                    primary={
                        <Typography component="span" color="text.primary" sx={{ fontSize: '1.1em' }}>{ item.text }</Typography>
                    }
                />
                <ListItemText sx={{ textAlign: 'right' }} primary={<Typography>{getValue(item.key)}</Typography>} />
            </ListItemButton>
        </ListItem>
        )
    }

    const renderAuthMenu = () => {
        return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar sx={{ }}>
                <Avatar>{ getUserName(props.user) }</Avatar>
            </ListItemAvatar>
            <ListItemText primary={getName()} secondary={props.user && props.user.email ? props.user.email : ''}></ListItemText>
        </ListItem>
        );
    }

    const renderNonAuthMenu = () => (
        <ListItem component="div" disablePadding>
          <ListItemButton 
            sx={{ textAlign: 'center', marginRight: '10px' }}
            onClick={() => props.onMenuClicked?.('login')}
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
            onClick={() => props.onMenuClicked?.('register')}
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

    const renderLoggedInMenu = () => {
        const items = (props.loggedInItems || []).map((item, index) => (
                <React.Fragment key={item.key || index}>
                    <MenuItem
                        disabled={!!item.items}
                        onClick={() => props.onMenuClicked?.(item.key, item.link)}
                    >
                        <ListItemText>{ t(item.text) }</ListItemText>
                    </MenuItem>
                    {
                        (item.items || []).map((s) => (
                            <MenuSubItem key={s.key} onClick={() => props.onMenuClicked?.(s.key, s.link)}>
                                <ListItemText inset>{ t(s.text) }</ListItemText>
                            </MenuSubItem>
                        ))
                    }
                </React.Fragment>
            ))

        return items.length > 0 ? <><Divider sx={{ my: 1 }} />{items}</> : <></>;
    }

    const renderMenuItems = () => {
        const isAuth = getIsAuth();
        if (isMobile) {
            if (menuType === MenuType.Default) {
                return (
                <List sx={{ paddingTop: '15px' }}>
                    {/* { isAuth ? renderAuthMenu() : renderNonAuthMenu()} */}
                    { generalMenu.map(generateMobileGenericMenu) }
                    { isAuth && renderLoggedInMenu() }
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