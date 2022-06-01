import { AppBar, Drawer, Toolbar, useScrollTrigger, Divider, Box, Container, Grid, Button, Menu, MenuItem, Avatar, IconButton, Select, Badge } from "@mui/material";
import { KeyboardArrowDown, Notifications } from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Route, RouteComponentProps, RouteProps, useHistory } from "react-router-dom";
import styled from "styled-components";

import { useState } from 'react';

// import ProfileCard from '../../src/Components/Profile/ProfileCard';
import { ProfileCard } from '../components/ProfileCard';
import MainMenu from "./MainMenu";

import { HotMenu } from "./HotMenu";
import Logo from '../assets/images/9asset-logo.png';
import { withRouter, WithRouterProps } from "react-router";
import { LayoutAppBar } from './MainLayoutAppBar';


export interface MenuItem {
    key: string;
    title: string;
    icon: any;
    link?: string;
  
    items?: MenuItem[];
}

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
    menu: MenuItem[];
    type?: 'seller' | 'buyer' | 'none' | undefined;
    onLanguageChanged: (lang: string) => void;
}



export class MainLayoutRoute extends Route<MainLayoutRouteProps> {

    menubar = [
        { text: 'คอนโด', items: [
            { text: 'คอนโดโครงการ', link: '/โครงการ/คอนโด' },
            { text: 'ขายคอนโด', link: '/ขาย/คอนโด' },
            { text: 'เช่าคอนโด', link: '/เช่า/คอนโด' },
            { text: 'เซ้งคอนโด', link: '/เซ้ง/คอนโด' }
        ] },
        { text: 'บ้านเดี่ยว', items: [
            { text: 'คอนโดบ้านเดี่ยว', link: '/โครงการ/บ้านเดี่ยว' },
            { text: 'ขายบ้านเดี่ยว', link: '/ขาย/บ้านเดี่ยว' },
            { text: 'เช่าบ้านเดี่ยว', link: '/เช่า/บ้านเดี่ยว' },
            { text: 'เซ้งบ้านเดี่ยว', link: '/เซ้ง/บ้านเดี่ยว' }
        ] },
        { text: 'ทาวน์เฮาส์-โฮม', items: [] },
        { text: 'อาคารพาณิชย์', items: [] },
        { text: 'โฮมออฟฟิส', items: [] },
        { text: 'บ้านแฝด', items: [] },
        { text: 'อพาร์ทเมนท์', items: [] },
        { text: 'ที่ดิน', items: [] }
    ];

    handleMouseOver (event: React.MouseEvent<HTMLElement>) {
        
    }

    // async componentDidMount () {
    //     try {
    //         const token = localStorage.getItem('9asset_token');
    //         const user = (await axios.get(`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`, { headers: { 'Authorization': `token ${token}`} })).data;
    //         localStorage.setItem(`9_asets.userinfo`, JSON.stringify(user));
    //     } catch {
    //         console.log('error to load 9asset_token');
    //         // localStorage.clear();
    //     }
    // }

    onLangChanged = (event: any) => {
        this.props.i18n.changeLanguage(event.target.value);
        this.props.onLanguageChanged(event.target.value);
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

    renderMenu () {
        const menu = this.menubar.map((t, i) => <HotMenu text={t.text} items={t.items} />);
        menu.push( <HotMenu text={'...'} items={[]} /> );
        return menu;
    }

    render() {
        const menu = this.props.menu;
        const user = JSON.parse(localStorage.getItem(`9_asets.userinfo`) || '{}');
        const lang = this.props.i18n.language;
        const t = this.props.t;
        return (
            <Route render={(props: RouteComponentProps) => {
                if (this.props.component) {
                    props.match = (this.props as any).computedMatch;
                    const component = React.createElement(this.props.component, props);
                    return (
                        <MainLayoutRoot>
                            <ElevationScroll {...props}>
                                {/* <AppBar position="fixed" color={'inherit'} style={{ zIndex: 1201 }} >
                                    <Toolbar>
                                        <img src={Logo} style={{ height: '40px' }} />
                                        
                                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                        
                                        </Box>
                                        <Button
                                            color="primary"
                                            style={{ color: '#f4762a', marginLeft: '10px', textTransform: 'none' }}
                                            endIcon={<KeyboardArrowDown />}
                                        >
                                            Thailand
                                        </Button>
                                        <Button
                                            color="info"
                                            style={{ color: '#5e5e5e'}}
                                        >
                                            โครงการ
                                        </Button>
                                        <Button
                                            color="primary"
                                            style={{ color: '#5e5e5e' }}
                                        >
                                            ขาย
                                        </Button>
                                        <Button
                                            color="primary"
                                            style={{ color: '#5e5e5e' }}
                                        >
                                            เช่า
                                        </Button>
                                        <div style={{ flexGrow: 1 }}></div>
                                        { this.renderSellerBuyerButtons() }
                                        <Select variant="outlined" size="small" inputProps={{ margin: 'dense' }} value={'en'} className="swith-language-select" onChange={this.onLangChanged}>
                                            <MenuItem value={'en'}>EN</MenuItem>
                                            <MenuItem value={'th'}>TH</MenuItem>
                                            <MenuItem value={'cn'}>CN</MenuItem>
                                        </Select>
                                        <IconButton aria-label="show 17 new notifications" color="inherit">
                                            <Badge badgeContent={17} color="error">
                                                <Notifications />
                                            </Badge>
                                        </IconButton>
                                        <div style={{ display: 'flex' }}>
                                            <Profile user={user} />
                                        </div>
                                    </Toolbar>
                                    <Grid container direction={'row'} style={{ background: '#f4762a', height: '42px', color: '#fffff' }} justifyContent='center' alignItems='center'>
                                        <Grid item maxWidth={'900px'} >
                                            { this.renderMenu() }
                                        </Grid>
                                    </Grid>
                                </AppBar> */}
                                <LayoutAppBar 
                                    logoPath = {Logo}
                                    userServiceUrl={`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`}
                                    useExternalLinkComponent={false}
                                    menubar={this.menubar}
                                    onAppChange={(event)=> { console.log('onAppChange'); return {}}}
                                    onLangChanged={this.onLangChanged.bind(this)}
                                    onMobileFilterClick={(event)=> console.log('onMobileFilterClick')}
                                    onMobileSearchClick={(event)=> console.log('onMobileSearchClick')}
                                    onMenuClick={(id)=> console.log('onMenuClick')}
                                    onSubMenuItemClick={(id) => console.log('onSubMenuItemClick:', id)}
                                />
                            </ElevationScroll>
                            <CustomDrawer variant="permanent" classes={{ paper: 'drawer-menu' }} >
                                <Toolbar />
                                <Grid container style={{ height: '42px' }}>
                                </Grid>
                                <ProfileCard user={user}></ProfileCard>
                              
                                <Divider></Divider>
                                <MainMenu menu={menu} ></MainMenu>
                            </CustomDrawer>
                            <MainContainer>
                                <Box sx={{ minHeight: '100%', pt: 0 }} style={{ background: '#f4f6f8', width: '100%' }}>
                                    <Toolbar />
                                    <Grid container style={{ height: '42px' }}></Grid>
                                    <Container maxWidth={false} style={{ paddingTop: 5 }}>
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

export default withTranslation('common')(MainLayoutRoute);
// export default MainLayoutRoute;