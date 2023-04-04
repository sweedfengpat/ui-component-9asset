import { Avatar, Dialog, DialogContent, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, MenuList, Popover, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { TFunction } from "react-i18next";
import { MenuDialogTitle } from "../components/MenuDialogTitle";
import { MainMenuLanguage } from "./MainLayoutAppBar";
import { getUserName } from "./Profile";
import { UserInfo } from "firebase/auth";
import { ChevronLeft } from "@mui/icons-material";
import React from "react";

type MenuType = 'default' | 'language' | 'currency';

export interface ProfileMenuItem {
    text: string;
    disabled?: boolean;
    appName?: string;

    items?: ProfileMenuItem[];
}

const MenuDialog = styled(Dialog)(({ theme }) => ({
    '.MuiPaper-root': {
        position: 'absolute',
        top: '10px',
        width: '96%',
        margin: '0'
    },
}));

const NMenuItem = styled(MenuItem)(({ theme }) => ({
    paddingY: '10px',

    '.MuiListItemText-primary': {
        fontSize: '1em',

        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1em',
        }
    }
    
}));

const NMenuSubItem = styled(MenuItem)(({ theme }) => ({
    '.MuiListItemText-primary': {
        fontSize: '1em',

        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1em',
        }
    }

}));

export interface HeaderMenuProps {
    t: TFunction<string, undefined>;
    language: MainMenuLanguage;
    items: ProfileMenuItem[];

    user: any;
    isAuth: boolean;
    
    isOpen: boolean;
    anchorElement: HTMLElement | null;

    onMenuClose: () => void;
    onLoginRequest?: () => void;
    onLangChanged?: (lang: MainMenuLanguage) => void;
    onMenuClicked?: (appName: string) => void;
}

export const HeaderMenu = (props: HeaderMenuProps) => {

    const { t, language } = props;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const loginBasePath = process.env.REACT_APP_DOMAIN
        || process.env.NEXT_PUBLIC_DOMAIN
        || 'https://my.9asset.com';

    const [menuType, setMenuType] = useState<MenuType>('default');
    const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

    const DisplayLanguage: { [index in MainMenuLanguage]: string} = {
        'en': 'English',
        'th': 'ไทย',
        'cn': 'Chinese' 
    }

    useEffect(() => {
        setElementRef(props.anchorElement);
    }, [props.anchorElement]);

    const getName = () => {
        const currentLanguage = props.language;
        if (props.user) {
            if(currentLanguage === 'en') {
                return `${props.user.nameEn || '' } ${props.user.lastnameEn || '' }`.trim();
            } else if(currentLanguage === 'cn') {
                return `${props.user.nameCn || '' } ${props.user.lastnameCn || '' }`.trim();
            } else {
                return `${props.user.nameTh || '' } ${props.user.lastnameTh || '' }`.trim();
            }
        }
        else {
            return '';
        }
    }

    const handleLogin = () => {
        props.onLoginRequest && props.onLoginRequest();
       
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = `${loginBasePath}/login?redirect=${currentUrl}`;
    }

    const handleChangeMenuRequested = (menuType: MenuType) => {
        setMenuType(menuType);
    }

    const handleChangeLanguage = (lang: MainMenuLanguage) => {
        props.onLangChanged && props.onLangChanged(lang); 
        handleChangeMenuRequested('default');
    }

    const handleLogout = () => {
        window.open(`${loginBasePath}/login/logout`, '_self');
    }

    const renderPopoverLangMenu = () => {
        return (
            <List
                sx={{
                    width: '100%',
                    minWidth: 300,
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                }}
            >
                
                <ListItem component="div" disablePadding onClick={(e: any) => handleChangeMenuRequested('default')}>
                    <ListItemButton>
                        <ListItemIcon><ChevronLeft /></ListItemIcon>
                        <ListItemText primaryTypographyProps={{
                            color: 'default',
                            variant: 'subtitle2',
                            fontSize: '1.1em'
                        }}>{t('Language')}</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem component="div" dense sx={{ py: 0 }}>
                    <ListItemButton onClick={() => handleChangeLanguage('en')} >
                        <ListItemText primaryTypographyProps={{ fontSize: '1em' }}>{DisplayLanguage['en']}</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem component="div" dense sx={{ py: 0 }}>
                    <ListItemButton onClick={() => handleChangeLanguage('cn')} >
                        <ListItemText primaryTypographyProps={{ fontSize: '1em' }}>{DisplayLanguage['cn']}</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem component="div" dense sx={{ py: 0 }}>
                    <ListItemButton onClick={() => handleChangeLanguage('th')} >
                        <ListItemText primaryTypographyProps={{ fontSize: '1em' }}>{DisplayLanguage['th']}</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        );
    }

    const renderPopoverMenuDetail = () => {
        const authMenu = (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>{ getUserName(props.user) }</Avatar>
            </ListItemAvatar>
            <ListItemText primary={getName()} secondary={props.user && props.user.email ? props.user.email : ''}></ListItemText>
        </ListItem>
        );

        const nonAuthMenu = (
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

        const currentLanguage = (props.language || 'th').toUpperCase();

        const commonMenu = (<>
        <Divider variant="middle" sx={{ mb: '8px' }} />
        <NMenuItem onClick={(e: any) => handleChangeMenuRequested('language')}>
            <ListItemText>{t('Language')}</ListItemText>
            <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>{currentLanguage}</ListItemIcon>
        </NMenuItem>
        </>);

        const logoutMenu = (<>
        <Divider variant="middle" />
        <NMenuItem onClick={handleLogout}>
            <ListItemText>{t('Logout')}</ListItemText>
        </NMenuItem>
        </>);

        if (menuType === 'default') {
            
            return (
            <List
                sx={{
                    width: '100%',
                    minWidth: 300,
                    maxWidth: 360,
                    bgcolor: 'background.paper'
                }}
                subheader={<ListSubheader sx={{ lineHeight: '30px', marginTop: '10px' }}>{t('My Account')}</ListSubheader>}
            >

                { props.isAuth ? authMenu : nonAuthMenu }
                { commonMenu }
                { props.isAuth && renderDialogMenuItems() }
                { props.isAuth && logoutMenu }
            </List>)
        } else if (menuType === 'language') {
            return renderPopoverLangMenu();
        }

        return (<></>);
    };

    const handleItemClick = (item: ProfileMenuItem) => {
        if (!item.items || item.items.length === 0) {
            props.onMenuClicked && props.onMenuClicked(item.appName || item.text);
        }
    }

    const renderDialogMenuItems = () => {
        return (<>
        {
            props.items.map((item, index) => (<React.Fragment key={index}>
                <NMenuItem
                    disabled={ item.disabled || false }
                    onClick={() => handleItemClick(item)}
                >
                    <ListItemText>{ t(item.text) }</ListItemText>
                </NMenuItem>
                { item.items && item.items.length > 0 ? 
                    (
                        item.items.map((s, j) => (
                        <NMenuSubItem key={`${index}-${j}`} disabled={ item.disabled || false } onClick={() => handleItemClick(s)}>
                            <ListItemText inset>{ t(s.text) }</ListItemText>
                        </NMenuSubItem>
                        ))
                    ): <></> }
            </React.Fragment>))
        }
        </>);
    }

    const renderDialogMenuDetail = () => {
        const currentLanguage = (props.language || 'th').toUpperCase();

        const commonMenu = (
        <NMenuItem onClick={(e: any) => handleChangeMenuRequested('language')}>
            <ListItemText>{t('Language')}</ListItemText>
            <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>{currentLanguage}</ListItemIcon>
        </NMenuItem>);

        const logoutMenu = (
        <NMenuItem onClick={handleLogout}>
            <ListItemText>{t('Logout')}</ListItemText>
        </NMenuItem>
        );

        const langMenu = (
        <MenuList>
            <MenuItem sx={{ px: 0 }} onClick={(e: any) => handleChangeMenuRequested('default')}>
                <ListItemButton sx={{ pl: 1 }}>
                    <ListItemIcon><ChevronLeft /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{
                        color: 'default',
                        variant: 'inherit',
                        fontWeight: 'bold',
                        fontSize: '1.1em'
                    }}>{t('Language')}</ListItemText>
                </ListItemButton>
            </MenuItem>
            <NMenuItem sx={{ py: 0 }} dense >
                <ListItemButton sx={{ py: 0 }}
                    onClick={() => handleChangeLanguage('en')}
                ><ListItemText>{DisplayLanguage['en']}</ListItemText></ListItemButton>
            </NMenuItem>
            <NMenuItem sx={{ py: 0 }} dense>
                <ListItemButton
                    onClick={() => handleChangeLanguage('cn')} 
                ><ListItemText>{DisplayLanguage['cn']}</ListItemText></ListItemButton>
            </NMenuItem>
            <NMenuItem sx={{ py: 0 }} dense>
                <ListItemButton
                    onClick={() => handleChangeLanguage('th')} 
                ><ListItemText>{DisplayLanguage['th']}</ListItemText></ListItemButton>
            </NMenuItem>
        </MenuList>);

        if (menuType === 'default') {
            return (
            <MenuList dense>
                { commonMenu }
                { props.isAuth && renderDialogMenuItems() }
                { props.isAuth && (<Divider variant="middle" />) }
                { props.isAuth && logoutMenu }
            </MenuList>);
        } else if (menuType === 'language') {
            return langMenu;
        } else {
            return (<></>);
        }
    }

    const handleDialogClose = () => {
        setElementRef(null);
        props.onMenuClose && props.onMenuClose();
    }

    const renderMobileMenu = () => {

        const authTitle = (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>{ getUserName(props.user) }</Avatar>
            </ListItemAvatar>
            <ListItemText primary={getName()} secondary={props.user && props.user.email ? props.user.email : ''}></ListItemText>
        </ListItem>
        );

        const nonAuthTitle = (
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

        return (
        <MenuDialog
            sx={{ m: 0 }}
            open={props.isOpen}
            onClose={handleDialogClose}
        >
            <MenuDialogTitle id={"menu-dialog"} onClose={handleDialogClose}>
                <Typography variant="subtitle2" component="p">{ t('My Account') }</Typography>
                { props.isAuth ? authTitle : nonAuthTitle }
            </MenuDialogTitle>
            <DialogContent dividers sx={{ py: 0, px: 0 }}>
                { renderDialogMenuDetail() }
            </DialogContent>
        </MenuDialog>);
    }

    const handlePopoverClose = () => {
        props.onMenuClose && props.onMenuClose();
    }

    const renderDesktopMenu = () => {
        return (<Popover
            open={elementRef !== null && props.isOpen}
            anchorEl={elementRef}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            onClose={handlePopoverClose}
        >
            { renderPopoverMenuDetail() }
        </Popover>);
    }

    return isMobile ? renderMobileMenu() : renderDesktopMenu();
};