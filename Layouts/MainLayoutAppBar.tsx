import {
    AppBar, Toolbar, Divider, Box, 
    Grid, Button, Slide, MenuItem, Avatar, IconButton,
    Popover, List, ListSubheader, ListItem, ListItemButton, ListItemText, ListItemIcon, ListItemAvatar, MenuList, styled, Dialog, Typography, useTheme, useMediaQuery, DialogTitle, DialogContent, ThemeProvider
} from "@mui/material";
import {
    Home as HomeIcon,
    ChevronLeft,
    Height,
    Close,
    Menu,
    Add,
    More,
    Search,
    AppsRounded,
    SearchOutlined,
 } from "@mui/icons-material";

import { 
    green,
    red,
    blue
} from '@mui/material/colors';
import React, { MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import { Item, MenuBarItem } from "./MenuBarItem";
import axios from 'axios';

// import ProfileMenu from "./ProfileMenu";
import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Profile } from "./Profile";

import { useTranslation } from "react-i18next";
import { TransitionProps } from "@mui/material/transitions";

import theme from "../theme";
import ProfileMenuItem from "./ProfileMenuItem";

export type MainMenuLanguage = 'th' | 'en' | 'cn' | string;

export type MenuBar = { text: string, link: string, items?: MenuBar }[];

export const AdvanceSearch = (props: any) => {
    const frameStyle = {
        width: '100%',
        // height: '100%',
        border: 'none'
      }
    
    const iframeEl = useRef(null);
    const [iframeHeight, setIframeHeight] = useState('auto');

    useEffect(() => {
      function bindEvent(element: any, eventName: any, eventHandler: any) {
          if (element.addEventListener){
              element.addEventListener(eventName, eventHandler, false);
          } else if (element.attachEvent) {
              element.attachEvent('on' + eventName, eventHandler);
          }
      }
      bindEvent(window, 'message', (e: any) => {
        const { target, type, value } = e.data;
        if( target !== '9assetApp') return;
        if(type === 'setheight') {
            // console.log('Header APP receive value: ', `${value}px`);
            //   frame.height = `${value}px` ; //height
            setIframeHeight(`${value}px`);
        }
      })
    }, [])
    
    return (
        <div style={{width: '100%', zIndex: 10, position: 'relative'}}>
            <iframe
                title="search-component"
                ref={iframeEl}
                src={`${ process.env.REACT_APP_DOMAIN
                    || process.env.NEXT_PUBLIC_DOMAIN
                    || 'https://my.9asset.com' }/search-component/${props.lang || 'th'}/`}
                style={frameStyle} 
                height={iframeHeight} />
        </div>
    )
}

interface ILayoutProps {
    userServiceUrl: string;
    useExternalLinkComponent?: boolean;
    homeUrl?: string;
    menubar: MenuBar;
    menuProfile: ProfileMenuItem[];

    app: FirebaseApp;
    
    // onAppChange?: (event: any) => void;
    onLangChanged?:  (event: any) => void;
    onMobileFilterClick:  (event: any) => void;
    onMobileSearchClick:  (event: any) => void;
    onMenuClick?: (type: 'project' | 'sell' | 'rent') => void;
    onProfileMenuClick?: (item: ProfileMenuItem) => void;
    onMenuBarItemClick?: (item: Item) => void;
    onRequirementClick?: (isOpen: boolean) => void;

    logoPath?: string;
    allowNoLoginAccessSite?: boolean | undefined;

    language: MainMenuLanguage;
    t: any; // To support next-i18next and react-i18next without project install both frameworks
}

interface IRecipeState {
    selectLang: string;
    isAuth: string;
    loginBasePath: string;
    homeUrl?: string;
    user?: any;
    menubar?: MenuBar;

    isLoginModalOpened: boolean;
    iFrameRef: RefObject<HTMLIFrameElement>;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
  });

  
export const LayoutAppBar = (props: ILayoutProps) => {

    const loginBasePath = process.env.REACT_APP_DOMAIN || process.env.NEXT_PUBLIC_DOMAIN || 'https://my.9asset.com';
    const { t } = useTranslation();
    const [user, setUser] = useState<any>(null);
    const [seletedLang, setSelectedLang] = useState<string>(props.language || 'th')
    const [logoPath, ] = useState<string|undefined>(props.logoPath);
    const [isAuth, setIsAuth] = useState<'true'|'false'>('false');
    

    const [menubar, setMenuBar] = useState<MenuBar>(props.menubar || []);

    useEffect(() => {
        if (!user) {
            if (typeof window !== "undefined") {
                const userVal = window.localStorage && JSON.parse(window.localStorage.getItem(`9asset.userinfo`) || 'null');
                setUser(userVal);
            }
        }
    }, []);

    const getToken = () => {
        console.log('app: ', props.app);
        const auth = getAuth(props.app);
        

        return onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User

                const token = await firebaseUser.getIdToken();
                console.log('my token: ', token);
                if(props.userServiceUrl) {
                    try {

                        const userInfo = (await axios.get(`${props.userServiceUrl}`, { headers: { 'Authorization': `token ${token}`} })).data;
                        localStorage && localStorage.setItem(`9asset.userinfo`, JSON.stringify(userInfo));
                        // this.setState({ user: user });

                        console.log('Success get user', userInfo);
                        setIsAuth('true');
                        setUser(userInfo);

                    } catch (error) {
                        // localStorage && localStorage.clear();
                        setIsAuth('false');
                        setUser(null);

                        if(!props.allowNoLoginAccessSite && process.env.REACT_APP_NODE_ENV === 'production') {
                            const currentUrl = encodeURIComponent(window.location.href);
                            window.location.href = `${loginBasePath}/login?redirect=${currentUrl}`;
                        }
                    }
                }
            } else {
                // User is signed out
                console.log('User is signed out')
                setIsAuth('false');
                setUser(null);
                
                if(props.allowNoLoginAccessSite !== true 
                    && process.env.REACT_APP_NODE_ENV === 'production') {
                    const currentUrl = encodeURIComponent(window.location.href);
                    window.location.href = `${loginBasePath}/login?redirect=${currentUrl}`;
                }
            }
            console.log('onAuthStateChanged', firebaseUser);
        });
    }

    const getUserDisplayName = () => {
        if(seletedLang.toLowerCase() === 'en') {
            return user && user.nameEn ? user.lastnameEn : '' ;
        } else if(seletedLang.toLowerCase() === 'cn') {
            return user && user.nameCn ? user.lastnameCn : '' ;
        } else if(seletedLang.toLowerCase() === 'th') {
            return user && user.nameTh ? user.lastnameTh : '' ;
        } else {
            return user && user.displayName ? user.displayName : '' ;
        }
    }

    const onMenuClick = (type: 'project' | 'sell' | 'rent') => {
        props.onMenuClick && props.onMenuClick(type);
    }

    const onMobileSearchClick = (e: any) => {
        if(props.onMobileSearchClick) {
            props.onMobileSearchClick(e);
        }
    }


    const handeProfileMenuClicked = (item: ProfileMenuItem) => {
        props.onProfileMenuClick && props.onProfileMenuClick(item);
    }

    const handeMenuClicked = (e: any) => {
        // setElementRef(e.currentTarget as HTMLElement);
        // setIsMenuOpen(true);
    }

    const renderMenuBar = () => {
        if(props.menubar) {
            return props.menubar.map((t: any, i: any) => <MenuBarItem text={t.text} items={t.items} link={t.link}  key={i}
                useExternalLinkComponent={props.useExternalLinkComponent || false}
                onMenuItemClick={(item) => props.onMenuBarItemClick && props.onMenuBarItemClick(item)}
            />);
        } 

        return menubar.map((t: any, i: any) => <MenuBarItem text={t.text} items={t.items} link={t.link}  key={i}
            useExternalLinkComponent={props.useExternalLinkComponent || false}
            onMenuItemClick={(item) => props.onMenuBarItemClick && props.onMenuBarItemClick(item)}
        />);
    }

    return (
    <ThemeProvider theme={theme}>
    <>
        <AppBar position="fixed" color={'inherit'} style={{ zIndex: 1201 }} >
            <Toolbar>
                <a href ={props.homeUrl || '/' }>
                    <img src={logoPath} style={{ height: '40px', width: '34px'}} alt="'9asset Logo'" />
                </a>
                
                <Box sx={{ flexGrow: 1, pl: 4, display: { xs: 'flex', md: 'none' } }}>
                    <Button color="primary" variant="contained" disableElevation
                        sx={{ 
                            padding: '5px',
                            borderRadius: '20px',
                            minWidth: '24px',
                            width: '34px !important'
                        }}
                        onClick={onMobileSearchClick}
                    >
                        <SearchOutlined fontSize="medium" />
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                    <Button
                        color="info"
                        style={{ color: '#5e5e5e'}}
                        onClick={()=> onMenuClick('project')}
                    >
                        {`${props.t('project')}`}
                    </Button>
                    <Button
                        color="primary"
                        style={{ color: '#5e5e5e' }}
                        onClick={()=> onMenuClick('sell')}
                    >
                        {`${props.t('sell')}`}
                    </Button>
                    <Button
                        color="primary"
                        style={{ color: '#5e5e5e' }}
                        onClick={()=> onMenuClick('rent')}
                    >
                        {`${props.t('rent')}`}
                    </Button>
                    <div style={{position: 'absolute', left: '275px', width: '450px'}}>
                        <AdvanceSearch />
                    </div>
                </Box>
                <div style={{ flexGrow: 1 }}></div>
                {/* { this.renderSellerBuyerButtons() } */}
                <div style={{marginRight: '10px'}}>
                    { getUserDisplayName() }
                </div>
                <div style={{ display: 'flex' }}>
                    <IconButton onClick={handeMenuClicked}>
                        <AppsRounded fontSize="large"  />
                    </IconButton>
                </div>
                <div style={{ display: 'flex' }}>
                    {/* <Profile
                        user={user}
                        t={props.t}
                        language={props.language}
                        isAuth={isAuth === 'true'}
                        menuItems={props.menuProfile}
                        onLangChanged={(ln: MainMenuLanguage) => { props.onLangChanged && props.onLangChanged(ln); }}
                        onMenuClicked={handeProfileMenuClicked}
                        onLoginRequested={handleLoginRequested}
                    /> */}
                </div>
                <div style={{ display: 'flex' }}>
                    <IconButton onClick={handeMenuClicked}>
                        <Menu fontSize="large"  />
                    </IconButton>
                </div>
            </Toolbar>
            <Grid container 
                direction={'row'} 
                sx={{ 
                    background: '#f4762a',
                    height: '42px',
                    color: '#fffff',
                    display: { xs: 'none', sm: 'none', md: 'flex' } 
                }} 
                justifyContent='center'
                alignItems='center'   
            >
                <Grid item maxWidth={'900px'}>
                    { renderMenuBar() }
                </Grid>
            </Grid>
        </AppBar>
    </>
    </ThemeProvider>
    );
}