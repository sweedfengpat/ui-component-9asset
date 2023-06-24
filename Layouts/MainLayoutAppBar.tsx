import {
    AppBar, Toolbar, Divider, Box, 
    Grid, Button, Slide, MenuItem, Avatar, IconButton,
    Popover, List, ListSubheader, ListItem, ListItemButton, ListItemText, ListItemIcon, ListItemAvatar, MenuList, styled, Dialog, Typography, useTheme, useMediaQuery, DialogTitle, DialogContent
} from "@mui/material";
import {
    Home as HomeIcon,
    ChevronLeft,
    Height,
    Close,
 } from "@mui/icons-material";

import { 
    green,
    red,
    blue
} from '@mui/material/colors';
import React, { MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import { Item, MenuBarItem } from "./MenuBarItem";
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

// import ProfileMenu from "./ProfileMenu";
import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { IMenuItem } from "./DrawerMenu";
import { Profile } from "./Profile";
import { ProfileMenuItem } from "./ProfileMenu";
import { useTranslation } from "react-i18next";
import { TransitionProps } from "@mui/material/transitions";
// import { TFunction as ReactI18NextTFunction } from "react-i18next";
// import { TFunction } from "next-i18next";

export type MainMenuLanguage = 'th' | 'en' | 'cn';

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

const UpTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RightTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
});

export const LayoutAppBar = (props: ILayoutProps) => {

    const loginBasePath = process.env.REACT_APP_DOMAIN || process.env.NEXT_PUBLIC_DOMAIN || 'https://my.9asset.com';

    const [user, setUser] = useState<any>(null);
    const [seletedLang, setSelectedLang] = useState<string>(props.language || 'th')
    const [logoPath, ] = useState<string|undefined>(props.logoPath);
    const [isAuth, setIsAuth] = useState<'true'|'false'>('false');
    const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(true);
    const [menubar, setMenuBar] = useState<MenuBar>(props.menubar || []);
    const iFrameRef = useRef<HTMLIFrameElement|null>(null);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!user) {
            if (typeof window !== "undefined") {
                const userVal = window.localStorage && JSON.parse(window.localStorage.getItem(`9asset.userinfo`) || 'null');
                setUser(userVal);
            }
        }
    }, []);

    const onLoginMessage = (e: MessageEvent) => {
        if (e.origin !== 'http://localhost:8080') {
            return;
        }

        if (e.data === 'loged-in') {
            setIsLoginModalOpened(false);
        } else {
            
        }
    }

    useEffect(() => {
        const unsub = getToken();
        return () => { unsub && unsub(); };
    }, []);

    useEffect(() => {
        window.addEventListener('message', onLoginMessage, false);
    }, []);

    useEffect(() => {
        if (iFrameRef.current) {
            iFrameRef.current.addEventListener('onload', (e) => {
                console.log(iFrameRef.current?.contentWindow);
            })
        }
    }, [iFrameRef?.current])

    const getToken = () => {
        console.log('app: ', props.app);
        const auth = getAuth(props.app);
        

        return onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User

                const token = await firebaseUser.getIdToken();
                isLoginModalOpened && setIsLoginModalOpened(false);
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

    const onLoginFrameLoaded = (obj: HTMLIFrameElement) => {
        console.log(obj.contentWindow?.document.body.scrollHeight);
    }


    const handelMenuClicked = (item: ProfileMenuItem) => {
        props.onProfileMenuClick && props.onProfileMenuClick(item);
    }

    const handleLoginRequested = () => {
        setIsLoginModalOpened(true);
    }


    const renderMenu = () => {
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

    const renderLoginModel = () => {
        return (
        <Dialog
            open={isLoginModalOpened}
            fullWidth={true}
            fullScreen={isMobile}
            sx={{
                '&': {
                    top: isMobile ? '0px' : '0px'
                },
            }}
            TransitionComponent={ isMobile ? RightTransition : UpTransition}
            maxWidth="xs"
        >
            {/* <DialogTitle sx={{ m: 0, p: 2 }}> */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={() => setIsLoginModalOpened(false)}
                    >
                    <Close />
                </IconButton>
            {/* </DialogTitle> */}
            {
            // <AppBar position="relative" color="default">
            //     <Toolbar sx={{ m: 0 }} >
            //         <Typography sx={{ flex: 1, margin: '0' }} variant="h6" component="div">
            //         Please login to continue
            //         </Typography>
            //         <IconButton
            //             edge="start"
            //             color="inherit"
            //             aria-label="close"
            //             >
            //             <Close />
            //         </IconButton>
            //     </Toolbar>
            // </AppBar>
            }
            <Box
                title="search-component"
                ref={iFrameRef}
                component="iframe"
                src={`${'http://localhost:8080'}/login?isHeadlessMode=true`}
                style={{ 
                    border: 'none',
                    height: isMobile ? '100%' : '570px',
                    width: isMobile ? '100%': '100%'
                }} 
            />
        </Dialog>
        );
    }

    return (<>
    <AppBar position="fixed" color={'inherit'} style={{ zIndex: 1000 }} >
        <Toolbar>
            <a href ={props.homeUrl || '/' }>
                <img src={logoPath} style={{ height: '40px' }} alt="'9Asset Logo'" />
            </a>
            
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
                <Profile
                    user={user}
                    t={props.t}
                    language={props.language}
                    isAuth={isAuth === 'true'}
                    menuItems={props.menuProfile}
                    onLangChanged={(ln: MainMenuLanguage) => { props.onLangChanged && props.onLangChanged(ln); }}
                    onMenuClicked={handelMenuClicked}
                    onLoginRequested={handleLoginRequested}
                />
            </div>
        </Toolbar>
        <Grid container direction={'row'} style={{ background: '#f4762a', height: '42px', color: '#fffff' }} 
            justifyContent='center' alignItems='center'   
        >
            <Grid item maxWidth={'900px'} sx={{display: { xs: 'none', sm: 'none', md: 'flex' } }} >
                { renderMenu() }
            </Grid>
            <Grid item width={"100%"} sx={{display: { xs: 'flex', sm: 'flex', md: 'none' } }} >
                <Grid container justifyContent="space-between" direction="row"  alignItems="center" >
                    <Grid item xs={12} md={12} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Button size="small" variant="outlined" startIcon={<SearchIcon />}
                            sx={{ width: '100%', bgcolor: 'white', color: 'black', textAlign: 'left',
                                justifyContent: 'left'
                            }}
                            onClick={onMobileSearchClick} 
                        >Search</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </AppBar>
    { renderLoginModel() }
    </>

    );
}