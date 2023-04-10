import { Drawer, Toolbar, useScrollTrigger, Divider, Box, Container, Grid, Button } from "@mui/material";
import React from "react";
import { TFunction, WithTranslation } from "react-i18next";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";
import styled from "styled-components";

import { ProfileCard } from '../components/ProfileCard';
import DrawerMenu, { IMenuItem, MenuSection } from "./DrawerMenu";

import { Item, MenuBarItem } from "./MenuBarItem";
import Logo from '../assets/images/9asset-logo.png';
import { LayoutAppBar, MainMenuLanguage } from './MainLayoutAppBar';
import { FirebaseApp } from "firebase/app";
import { ProfileMenuItem } from "./ProfileMenu";

const MainLayoutRoot = styled.div({
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
});

const drawerWidth = 255;
const CustomDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
});

const MainContainer = styled.div({
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    paddingTop: 0,

    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
});

interface ElevationScrollProps {
    window?: () => Window;
    children: React.ReactElement;
}

const ElevationScroll = (props: ElevationScrollProps) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

// const Profile  = (props: any) => {
//     const history = useHistory();
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const isMenuOpen = Boolean(anchorEl);

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     }

//     const handleProfileClicked = () => {
//         history.push('/myprofile');
//         setAnchorEl(null);
//     }

//     const handleChangePassword = () => {
//         history.push('/changepassword');
//         setAnchorEl(null);
//     }

//     const handleLogout = () => {
//         history.push('/logout');
//         setAnchorEl(null);
//     }

//     const getUserName = () => {
//         const userInfo = props.user;
//         if (userInfo) {
//             if (userInfo.displayName) {
//                 return userInfo.displayName[0];
//             } else if (userInfo.email) {
//                 return (userInfo.email as string)[0].toUpperCase();
//             }
//         }
//         return '9';
//     }

//     const renderMenu = (
//         <Menu
//           anchorEl={anchorEl}
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//           keepMounted
//           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           open={isMenuOpen}
//           onClose={handleMenuClose}
//         >
//           <MenuItem onClick={handleProfileClicked}>Profile</MenuItem>
//           <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>
//     );

//     const userName = getUserName();

//     console.log('xxxx: ', props.user.photoUrl);

//     return (
//     <>
//         {
//             props.user.photoUrl ?
//             <Avatar
//                 alt={`${userName}`}
//                 style={{ height: '30px', width: '30px', margin: '12px' }}
//                 onClick={handleProfileMenuOpen}
//                 src={props.user.photoUrl}
//                 />
//             :
//             <Avatar
//                 alt="9 Asset"
//                 style={{ height: '30px', width: '30px', margin: '12px' }}
//                 onClick={handleProfileMenuOpen}
//             >{ userName }
//             </Avatar>
//         }
//         {renderMenu}
//     </>
//     );
// }

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

    render() {
        const user = JSON.parse(localStorage.getItem(`9asset.userinfo`) || '{}');
        return (
            <Route render={(props: RouteComponentProps) => {
                if (this.props.component) {
                    props.match = (this.props as any).computedMatch;
                    const component = React.createElement(this.props.component, props);
                    return (
                        <MainLayoutRoot>
                            <ElevationScroll {...props}>
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
                            </ElevationScroll>
                            <CustomDrawer
                                variant="permanent"
                                classes={{ paper: 'drawer-menu' }}
                                sx={{
                                    display: { xs: 'none', sm: 'block' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                            >
                                <Toolbar />
                                <Grid container style={{ height: '42px' }}>
                                </Grid>
                                <ProfileCard user={user}></ProfileCard>
                              
                                <Divider variant="middle"></Divider>
                                <DrawerMenu
                                    menu={this.props.drawermenu}
                                    location={this.props.location}
                                    onMenuItemClick={this.handleDrawerMenuClicked}
                                    t={this.props.t}
                                    tReady={this.props.tReady}
                                    i18n={this.props.i18n}
                                />
                            </CustomDrawer>
                            <MainContainer>
                                <Box sx={{ minHeight: '100%', pt: 0 }} style={{ background: '#f4f6f8', width: '100%' }}>
                                    <Toolbar />
                                    <Grid container style={{ height: '42px' }}></Grid>
                                    <Container maxWidth={false} sx={{ paddingTop: '10px', paddingX: '5px' }}>
                                        {component}
                                    </Container>
                                </Box>
                            </MainContainer>

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