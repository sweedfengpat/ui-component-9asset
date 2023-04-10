import {
    AppBar, Toolbar, Divider, Box, 
    Grid, Button, Menu, MenuItem, Avatar, IconButton,
    Popover, List, ListSubheader, ListItem, ListItemButton, ListItemText, ListItemIcon, ListItemAvatar, MenuList, styled
} from "@mui/material";
import {
    Home as HomeIcon,
    ChevronLeft,
 } from "@mui/icons-material";

import { 
    green,
    red,
    blue
} from '@mui/material/colors';
import React, {useEffect, useRef, useState} from "react";
import { Item, MenuBarItem } from "./MenuBarItem";
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

// import ProfileMenu from "./ProfileMenu";
import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { IMenuItem } from "./DrawerMenu";
import { Profile } from "./Profile";
import { ProfileMenuItem } from "./ProfileMenu";
// import { TFunction as ReactI18NextTFunction } from "react-i18next";
// import { TFunction } from "next-i18next";

export type MainMenuLanguage = 'th' | 'en' | 'cn';

export type MenuBar = { text: string, link: string, items?: MenuBar }[];

interface IRecipeProps {
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
}

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

export class LayoutAppBar extends React.Component<IRecipeProps, IRecipeState> {
   
    menubar: MenuBar = [];
    logoPath: string = '';

    constructor(props: IRecipeProps) {
        super(props);
        const { logoPath } = props;
        if(logoPath) this.logoPath = logoPath;

        this.menubar = [...this.props.menubar];

        this.state = {
            selectLang: props.language ?? 'th',
            isAuth: 'false',
            user: null,
            menubar: [...this.props.menubar],
            loginBasePath: process.env.REACT_APP_DOMAIN 
                || process.env.NEXT_PUBLIC_DOMAIN
                || 'https://my.9asset.com'
        }
        console.log('layoutAppBar: ', this.state)
    }
   
    async componentDidMount () {
        const token = await this.getToken();
    }

    async getToken () {
        console.log('app: ', this.props.app);
        const auth = getAuth(this.props.app);
        

        onAuthStateChanged(auth, async (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User

                const token = await user.getIdToken();

                console.log('my token: ', token);
                if(this.props.userServiceUrl) {
                    try {

                        const user = (await axios.get(`${this.props.userServiceUrl}`, { headers: { 'Authorization': `token ${token}`} })).data;
                        localStorage && localStorage.setItem(`9asset.userinfo`, JSON.stringify(user));
                        // this.setState({ user: user });

                        console.log('Success get user', user);
                        this.setState({
                            ...this.state,
                            isAuth: 'true',
                            user: user
                        })
                    } catch (error) {
                        // localStorage && localStorage.clear();
                        this.setState({ user: null, isAuth: 'false' });

                        if(!this.props.allowNoLoginAccessSite && process.env.REACT_APP_NODE_ENV === 'production') {
                            const currentUrl = encodeURIComponent(window.location.href);
                            window.location.href = `${this.state.loginBasePath}/login?redirect=${currentUrl}`;
                        }
                    }
                }
            } else {
                // User is signed out
                console.log('User is signed out')
                this.setState({
                    ...this.state,
                    isAuth: 'false',
                    user: null
                })
                
                if(this.props.allowNoLoginAccessSite !== true 
                    && process.env.REACT_APP_NODE_ENV === 'production') {
                    const currentUrl = encodeURIComponent(window.location.href);
                    window.location.href = `${this.state.loginBasePath}/login?redirect=${currentUrl}`;
                }
            }
            console.log('onAuthStateChanged', this.state);
        });
          
        return auth.currentUser?.getIdToken();
    }

    renderMenu () {
        if(this.props.menubar) {
            return this.props.menubar.map((t: any, i: any) => <MenuBarItem text={t.text} items={t.items} link={t.link}  key={i}
                useExternalLinkComponent={this.props.useExternalLinkComponent || false}
                onMenuItemClick={(item) => this.props.onMenuBarItemClick && this.props.onMenuBarItemClick(item)}
            />);
        } 

        return this.menubar.map((t: any, i: any) => <MenuBarItem text={t.text} items={t.items} link={t.link}  key={i}
            useExternalLinkComponent={this.props.useExternalLinkComponent || false}
            onMenuItemClick={(item) => this.props.onMenuBarItemClick && this.props.onMenuBarItemClick(item)}
        />);
    }

    onLangChange(e: any) {

        this.setState({
            ...this.state,
            selectLang: e.target.value
        })
        
        if(this.props && this.props.onLangChanged) {
            this.props.onLangChanged(e);
        }
    }

    onMobileFilterClick(e: any) {
        if(this.props.onMobileFilterClick) {
            this.props.onMobileFilterClick(e);
        }
    }

    onMobileSearchClick(e: any) {
        if(this.props.onMobileSearchClick) {
            this.props.onMobileSearchClick(e);
        }
    }

    handelMenuClicked = (item: ProfileMenuItem) => {
        this.props.onProfileMenuClick && this.props.onProfileMenuClick(item);
    }

    onMenuClick(type: 'project' | 'sell' | 'rent') {
        this.props.onMenuClick && this.props.onMenuClick(type);
    }

    getUserDisplayName() {
        if(this.state.selectLang.toLowerCase() === 'en') {
            return this.state.user 
                && this.state.user.nameEn ? this.state.user.lastnameEn : '' ;
        } else if(this.state.selectLang.toLowerCase() === 'cn') {
            return this.state.user 
                && this.state.user.nameCn ? this.state.user.lastnameCn : '' ;
        } else if(this.state.selectLang.toLowerCase() === 'th') {
            return this.state.user 
                && this.state.user.nameTh ? this.state.user.lastnameTh : '' ;
        } else {
            return this.state.user 
                && this.state.user.displayName ? this.state.user.displayName : '' ;
        }
    }

    render() {
        let user = this.state.user;
        if (!user) {
            if (typeof window !== "undefined") {
                user = window.localStorage && JSON.parse(window.localStorage.getItem(`9asset.userinfo`) || 'null');
            }
        }
        
        return (
            <AppBar position="fixed" color={'inherit'} style={{ zIndex: 1201 }} >
                <Toolbar>
                    <a href ={this.props.homeUrl || '/' }>
                        <img src={this.logoPath} style={{ height: '40px' }} alt="'9Asset Logo'" />
                    </a>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                        <Button
                            color="info"
                            style={{ color: '#5e5e5e'}}
                            onClick={()=> this.onMenuClick('project')}
                        >
                            {`${this.props.t('project')}`}
                        </Button>
                        <Button
                            color="primary"
                            style={{ color: '#5e5e5e' }}
                            onClick={()=> this.onMenuClick('sell')}
                        >
                            {`${this.props.t('sell')}`}
                        </Button>
                        <Button
                            color="primary"
                            style={{ color: '#5e5e5e' }}
                            onClick={()=> this.onMenuClick('rent')}
                        >
                            {`${this.props.t('rent')}`}
                        </Button>
                        <div style={{position: 'absolute', left: '275px', width: '450px'}}>
                            <AdvanceSearch />
                        </div>
                    </Box>
                    <div style={{ flexGrow: 1 }}></div>
                    {/* { this.renderSellerBuyerButtons() } */}
                    <div style={{marginRight: '10px'}}>
                        {  this.getUserDisplayName() }
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Profile
                            user={user}
                            t={this.props.t}
                            language={this.props.language}
                            isAuth={this.state.isAuth === 'true'}
                            menuItems={this.props.menuProfile}
                            onLangChanged={(ln: MainMenuLanguage) => { this.props.onLangChanged && this.props.onLangChanged(ln); }}
                            onMenuClicked={this.handelMenuClicked}
                        />
                    </div>
                </Toolbar>
                <Grid container direction={'row'} style={{ background: '#f4762a', height: '42px', color: '#fffff' }} 
                    justifyContent='center' alignItems='center'   
                >
                    <Grid item maxWidth={'900px'} sx={{display: { xs: 'none', sm: 'none', md: 'flex' } }} >
                        { this.renderMenu() }
                    </Grid>
                    <Grid item width={"100%"} sx={{display: { xs: 'flex', sm: 'flex', md: 'none' } }} >
                        <Grid container justifyContent="space-between" direction="row"  alignItems="center" >
                            <Grid item xs={12} md={12} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <Button size="small" variant="outlined" startIcon={<SearchIcon />}
                                    sx={{ width: '100%', bgcolor: 'white', color: 'black', textAlign: 'left',
                                        justifyContent: 'left'
                                    }}
                                    onClick={this.onMobileSearchClick.bind(this)} 
                                >Search</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppBar>
        );
    }
} 