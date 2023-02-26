import { Drawer, Toolbar, useScrollTrigger, Divider, Box, Container, Grid, Button } from "@mui/material";
import React from "react";
import { WithTranslation } from "react-i18next";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";
import styled from "styled-components";

import { ProfileCard } from '../components/ProfileCard';
import MainMenu, { IMenuItem, MenuSection } from "./MainMenu";

import { HotMenu } from "./HotMenu";
import Logo from '../assets/images/9asset-logo.png';
import { LayoutAppBar, MainMenuLanguage } from './MainLayoutAppBar';
import { FirebaseApp } from "firebase/app";

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
    profilemenu: MenuSection[];
    mainmenu: IMenuItem[];
    onLanguageChanged: (lang: string) => void;
    type?: 'seller' | 'buyer' | 'none' | undefined;
    onProfileMenuItemClick?: (e: any) => void;

    onMainMenuClick?: (e: MouseEvent, item: IMenuItem) => void;
    
    app: FirebaseApp;
    language: MainMenuLanguage;
    t: any;
    menubar?: any[];
    onMenuHeaderClick?: (item: any) => void;
}



export class MainLayoutRoute extends Route<MainLayoutRouteProps> {

    // menubar = [
    //     { text: 'คอนโด', items: [
    //         { text: 'คอนโดโครงการ', link: '/โครงการ/คอนโด' },
    //         { text: 'ขายคอนโด', link: '/ขาย/คอนโด' },
    //         { text: 'เช่าคอนโด', link: '/เช่า/คอนโด' },
    //         { text: 'เซ้งคอนโด', link: '/เซ้ง/คอนโด' }
    //     ] },
    //     { text: 'บ้านเดี่ยว', items: [
    //         { text: 'คอนโดบ้านเดี่ยว', link: '/โครงการ/บ้านเดี่ยว' },
    //         { text: 'ขายบ้านเดี่ยว', link: '/ขาย/บ้านเดี่ยว' },
    //         { text: 'เช่าบ้านเดี่ยว', link: '/เช่า/บ้านเดี่ยว' },
    //         { text: 'เซ้งบ้านเดี่ยว', link: '/เซ้ง/บ้านเดี่ยว' }
    //     ] },
    //     { text: 'ทาวน์เฮาส์-โฮม', items: [] },
    //     { text: 'อาคารพาณิชย์', items: [] },
    //     { text: 'โฮมออฟฟิส', items: [] },
    //     { text: 'บ้านแฝด', items: [] },
    //     { text: 'อพาร์ทเมนท์', items: [] },
    //     { text: 'ที่ดิน', items: [] }
    // ];

    menubar = [
        { text: this.props.t('condo'), items: [
        ], link: `/${this.props.t('all')}/${this.props.t('condo')}`},
        { text: this.props.t('house'), items: [
        ], link: `/${this.props.t('all')}/${this.props.t('house')}`},
        { text: this.props.t('townhouse'), items: [],  link: `/${this.props.t('all')}/${this.props.t('townhouse')}` },
        { text: this.props.t('commercial'), items: [],  link: `/${this.props.t('all')}/${this.props.t('commercial')}` },
        { text: this.props.t('homeoffice'), items: [], link: `/${this.props.t('all')}/${this.props.t('homeoffice')}` },
        { text: this.props.t('twinhome'), items: [],  link: `/${this.props.t('all')}/${this.props.t('twinhome')}` },
        { text: this.props.t('apartment'), items: [], link: `/${this.props.t('all')}/${this.props.t('apartment')}` },
        { text: this.props.t('land'), items: [], link: `/${this.props.t('all')}/${this.props.t('land')}` }
    ];
      

    handleMouseOver (event: React.MouseEvent<HTMLElement>) {
        
    }

    // async componentDidMount () {
    //     try {
    //         const token = localStorage.getItem('9asset_token');
    //         const user = (await axios.get(`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`, { headers: { 'Authorization': `token ${token}`} })).data;
    //         localStorage.setItem(`9asset.userinfo`, JSON.stringify(user));
    //     } catch {
    //         console.log('error to load 9asset_token');
    //         // localStorage.clear();
    //     }
    // }

    onLangChanged = (lang: any) => {
        console.log('OnLangChanged: ', lang);
        this.props.i18n.changeLanguage(lang);
        this.props.onLanguageChanged(lang);

        this.menubar = [
            { text: this.props.t('condo'), items: [
            ], link: `/${this.props.t('all')}/${this.props.t('condo')}`},
            { text: this.props.t('house'), items: [
            ], link: `/${this.props.t('all')}/${this.props.t('house')}`},
            { text: this.props.t('townhouse'), items: [],  link: `/${this.props.t('all')}/${this.props.t('townhouse')}` },
            { text: this.props.t('commercial'), items: [],  link: `/${this.props.t('all')}/${this.props.t('commercial')}` },
            { text: this.props.t('homeoffice'), items: [], link: `/${this.props.t('all')}/${this.props.t('homeoffice')}` },
            { text: this.props.t('twinhome'), items: [],  link: `/${this.props.t('all')}/${this.props.t('twinhome')}` },
            { text: this.props.t('apartment'), items: [], link: `/${this.props.t('all')}/${this.props.t('apartment')}` },
            { text: this.props.t('land'), items: [], link: `/${this.props.t('all')}/${this.props.t('land')}` }
        ];
    }

    onMainMenuClicked = (e: MouseEvent, item: IMenuItem) => {
        this.props.onMainMenuClick && this.props.onMainMenuClick(e, item);
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

    onProfileMenuItemClick(e: any){
        if(this.props.onProfileMenuItemClick) {
            this.props.onProfileMenuItemClick(e);
        }
    }

    onMenuHeaderClick(id: any) {
        if(this.props.onMenuHeaderClick) {
            this.props.onMenuHeaderClick(id)
        }
    }

    render() {
        const mainmenu = this.props.mainmenu;
        const profilemenu = this.props.profilemenu;
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
                                    logoPath = {Logo}
                                    userServiceUrl={`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`}
                                    useExternalLinkComponent={false}
                                    menubar={this.props.menubar ? this.props.menubar: this.menubar}
                                    mainmenu={mainmenu}
                                    profilemenu={profilemenu}
                                    app={this.props.app}
                                    onAppChange={(event)=> { console.log('onAppChange'); return {}}}
                                    onLangChanged={this.onLangChanged.bind(this)}
                                    onMobileFilterClick={(event)=> console.log('onMobileFilterClick')}
                                    onMobileSearchClick={(event)=> console.log('onMobileSearchClick')}
                                    onMenuClick={(id)=> console.log('onMenuClick')}
                                    onMenuHeaderClick={this.onMenuHeaderClick.bind(this)}
                                    onProfileMenuItemClick={this.onProfileMenuItemClick.bind(this)}
                                    allowNoLoginAccessSite={false}
                                    location={this.props.location}
                                    language={this.props.language}
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
                                <MainMenu
                                    menu={mainmenu}
                                    location={this.props.location}
                                    onMenuItemClick={this.onMainMenuClicked}
                                    t={this.props.t}
                                    tReady={this.props.tReady}
                                    i18n={this.props.i18n}
                                />
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

export default MainLayoutRoute;
// export default MainLayoutRoute;