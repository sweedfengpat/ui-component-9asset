import { Drawer, Toolbar, useScrollTrigger, Divider, Box, Container, Grid, Button, BottomNavigation, useMediaQuery, useTheme, BottomNavigationAction, Paper, Dialog, Slide, IconButton, CssBaseline } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { TFunction, WithTranslation } from "react-i18next";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";
import styled from "styled-components";

import { ProfileCard } from '../components/ProfileCard';
import DrawerMenuFunctionComponent, { IMenuItem, MenuSection } from "./DrawerMenuFunctionComponent";

import { Item, MenuBarItem } from "./MenuBarItem";
import Logo from '../assets/images/9asset-logo.png';
import { LayoutAppBar, MainMenuLanguage } from './MainLayoutAppBar';
import { FirebaseApp } from "firebase/app";
import { ProfileMenuItem } from "./ProfileMenu";
import { TransitionProps } from "@mui/material/transitions";
import { LoginModal } from "../components/LoginModal";
import { BuyerMenu } from "./BuyerMenu";
import { SellerMenu } from "./SellerMenu";
import { ButtomMenuBar } from './ButtomBar';

// const MainLayoutRoot = styled.div({
//     display: 'block',
//     height: '100%',
//     overflow: 'hidden',
//     width: '100%',
// });
const MainLayoutRoot = styled(Box)({
    display: 'flex'
});

const drawerWidth = 255;

const MainContainer = styled.div({
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    paddingTop: 0,

    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
});

export interface MainLayoutRouteProps extends RouteProps, WithTranslation {
    profilemenu: ProfileMenuItem[];
    drawermenu: IMenuItem[];
    type?: 'seller' | 'buyer' | 'none' | undefined;
    
    onDrawerMenuClicked?: (e: MouseEvent, item: IMenuItem) => void;
    onHotMenuClicked?: (type: 'project' | 'sell' | 'rent') => void;

    onLanguageChanged: (lang: string) => void;
    onProfileMenuItemClicked?: (menu: ProfileMenuItem) => void;
    onMenuBarItemClicked?: (item: Item) => void;

    app: FirebaseApp;
    language: MainMenuLanguage;
    t: TFunction<string, undefined> | TFunction<"translation">;
    menubar?: any[];

    isHeadlessMode?: boolean;
}

export class MainLayoutRoute extends Route<MainLayoutRouteProps> {

    menubar = [
        {
            text: this.props.t('condo'),
            items: [],
            link: `/${this.props.t('all')}/${this.props.t('condo')}`
        },
        {
            text: this.props.t('house'),
            link: `/${this.props.t('all')}/${this.props.t('house')}`
        },
        {
            text: this.props.t('townhouse'),
            link: `/${this.props.t('all')}/${this.props.t('townhouse')}`
        },
        {
            text: this.props.t('commercial'),
            link: `/${this.props.t('all')}/${this.props.t('commercial')}`
        },
        {
            text: this.props.t('homeoffice'),
            link: `/${this.props.t('all')}/${this.props.t('homeoffice')}`
        },
        {
            text: this.props.t('twinhome'),
            link: `/${this.props.t('all')}/${this.props.t('twinhome')}`
        },
        {
            text: this.props.t('apartment'),
            link: `/${this.props.t('all')}/${this.props.t('apartment')}`
        },
        {
            text: this.props.t('land'),
            link: `/${this.props.t('all')}/${this.props.t('land')}`
        }
    ];

    handleMouseOver (event: React.MouseEvent<HTMLElement>) {
        
    }

    onLangChanged = (lang: any) => {
        console.log('OnLangChanged: ', lang);
        this.props.i18n.changeLanguage(lang);
        this.props.onLanguageChanged(lang);

        this.menubar = [
            {
                text: this.props.t('condo'),
                link: `/${this.props.t('all')}/${this.props.t('condo')}`
            },
            {
                text: this.props.t('house'),
                link: `/${this.props.t('all')}/${this.props.t('house')}`
            },
            {
                text: this.props.t('townhouse'),
                link: `/${this.props.t('all')}/${this.props.t('townhouse')}`
            },
            {
                text: this.props.t('commercial'),
                link: `/${this.props.t('all')}/${this.props.t('commercial')}` },
            {
                text: this.props.t('homeoffice'),
                link: `/${this.props.t('all')}/${this.props.t('homeoffice')}`
            },
            {
                text: this.props.t('twinhome'),
                link: `/${this.props.t('all')}/${this.props.t('twinhome')}`
            },
            {
                text: this.props.t('apartment'),
                link: `/${this.props.t('all')}/${this.props.t('apartment')}`
            },
            {   
                text: this.props.t('land'),
                link: `/${this.props.t('all')}/${this.props.t('land')}`
            }
        ];
    }

    handleDrawerMenuClicked = (e: MouseEvent, item: IMenuItem) => {
        this.props.onDrawerMenuClicked && this.props.onDrawerMenuClicked(e, item);
    }

    renderSellerBuyerButtons () {
        if (this.props.type === 'buyer') {
            return <Button variant="text" size="small" style={{ color: '#f4762a', marginRight: '15px', textTransform: 'capitalize' }} href="/seller">Seller Center</Button>
        } else if (this.props.type === 'seller') {
            return <Button variant="text" size="small" style={{ color: '#f4762a', marginRight: '15px', textTransform: 'capitalize' }} href="/buyer">Buyer Center</Button>
        } else {
            return (<></>);
        }
    }

    handleProfileMenuItemClicked (item: ProfileMenuItem) {
        this.props.onProfileMenuItemClicked && this.props.onProfileMenuItemClicked(item);
    }

    handleMenuBarItemClicked (item: Item) {
        this.props.onMenuBarItemClicked && this.props.onMenuBarItemClicked(item);
    } 

    handleHotMenuClicked (type: 'project' | 'sell' | 'rent') {
        this.props.onHotMenuClicked && this.props.onHotMenuClicked(type);
    }

    renderBottomMenu () {
        return (<ButtomMenuBar />);
    }

    render() {
        const user = JSON.parse(localStorage.getItem(`9asset.userinfo`) || '{}');
        return (
            <Route render={(props: RouteComponentProps) => {
                if (this.props.component) {
                    props.match = (this.props as any).computedMatch;
                    const component = React.createElement(this.props.component, props);
                    return  this.props.isHeadlessMode ? (<MainLayoutRoot>{component}</MainLayoutRoot>):
                    (
                        <MainLayoutRoot>
                            <CssBaseline />
                            <LayoutAppBar 
                                app={this.props.app}
                                logoPath = {Logo}
                                // mainLink
                                menubar={this.props.menubar ? this.props.menubar: this.menubar}
                                menuProfile={this.props.profilemenu}
                                // useExternalLinkComponent={false}
                                // onSubMenuItemClick
                                // onAppChange={(event)=> { console.log('onAppChange'); return {}; }}
                                allowNoLoginAccessSite={false}
                                userServiceUrl={`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`}
                                onLangChanged={this.onLangChanged}


                                //mainmenu={mainmenu}

                                
                                onMobileFilterClick={(event)=> console.log('onMobileFilterClick')}
                                onMobileSearchClick={(event)=> console.log('onMobileSearchClick')}

                                onMenuClick={this.handleHotMenuClicked.bind(this)}
                                onProfileMenuClick={this.handleProfileMenuItemClicked.bind(this)}
                                onMenuBarItemClick={this.handleMenuBarItemClicked.bind(this)}

                                language={this.props.i18n.language as MainMenuLanguage}
                                t={this.props.t}
                            />

                            <Drawer
                                sx={{
                                    width: drawerWidth,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                        width: drawerWidth,
                                        boxSizing: 'border-box',
                                    },
                                    display: { xs: 'none', sm: 'flex' }
                                }}
                                variant="permanent"
                                anchor="left"
                            >
                                <Toolbar />
                                <Grid container style={{ height: '42px' }}>
                                </Grid>
                                <ProfileCard user={user}></ProfileCard>
                                <Divider variant="middle"></Divider>
                                <DrawerMenuFunctionComponent
                                    menu={this.props.drawermenu}
                                    location={this.props.location}
                                    onMenuItemClick={this.handleDrawerMenuClicked}
                                    t={this.props.t}
                                    tReady={this.props.tReady}
                                    i18n={this.props.i18n}
                                />
                            </Drawer>
                            <MainContainer>
                                <Box sx={{ minHeight: '100%', pt: 0, background: '#f4f6f8', width: '100%', flexFlow: 1 }}>
                                    <Toolbar />
                                    <Grid container style={{ height: '42px' }}></Grid>
                                    <Container maxWidth={false} sx={{ paddingTop: { xs: '10px', sm:'25px' }, paddingX: '5px' }}>
                                        {component}
                                    </Container>
                                </Box>
                            </MainContainer>
                            { this.renderBottomMenu() }
                        </MainLayoutRoot>
                    );
                }

                if (this.props.render) {
                    return this.props.render(props);
                }

            }} />);
    }
}

export default MainLayoutRoute;
// export default MainLayoutRoute;