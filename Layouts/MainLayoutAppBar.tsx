import {
    AppBar, Drawer, Toolbar, useScrollTrigger, Divider, Box, 
    Container, Grid, Button, Menu, MenuItem, Avatar, IconButton, Select, Badge,
    Paper, Autocomplete, TextField, Popover, List, ListSubheader, ListItem, ListItemButton, ListItemText, ListItemIcon, ListItemAvatar
} from "@mui/material";
import { KeyboardArrowDown, 
    Notifications,
    Apps,
    Home as HomeIcon,
    ThreeSixty,
    StarBorder,
    ChevronLeft,
    AccountBoxOutlined
 } from "@mui/icons-material";

import { 
    green,
    red,
    blue
} from '@mui/material/colors';
import React, {useEffect, useRef, useState} from "react";
import { HotMenu } from "./HotMenu";
import axios from 'axios';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import MainMenu from "./MainMenu";

const getFirstLetter = (user: any) => {
    const userInfo = user;
    if (userInfo) {
        if (userInfo.displayName) {
            return userInfo.displayName[0];
        } else if (userInfo.email) {
            return (userInfo.email as string)[0].toUpperCase();
        }
    }
    return undefined;
}

const Profile  = (props: any) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = React.useState<string>('default');

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = (e: any) => {
        setAnchorEl(null);
    }

    const handleProfileClicked = () => {
        // history.push('/myprofile');
        setAnchorEl(null);
        props.onProfileMenuItemClick && props.onProfileMenuItemClick('/myprofile');
    }

    const handleChangePassword = () => {
        // history.push('/changepassword');
        setAnchorEl(null);
        props.onProfileMenuItemClick && props.onProfileMenuItemClick('/changepassword');
    }

    const handleLogout = () => {
        // history.push('/logout');
        window.open('https://my.9asset.com/login/logout', '_self');
        setAnchorEl(null);
    }

    const handleLogin = () => {
        // history.push('/logout');
        props.handleLogin && props.handleLogin();
        setAnchorEl(null);
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = `https://my.9asset.com/login?redirect=${currentUrl}`;
    }

    const onChangeMenuRequested = (val: string) => {
        setMenuType(val);
    }

    const getUserName = () => {
        const username = getFirstLetter(props.user);
        if(username){
            return username;
        }

        return '9';
    }

    const renderCommonMenu = (<>
        <ListItem component="div" disablePadding onClick={(e: any) => onChangeMenuRequested('language')}>
            <ListItemButton>
                <ListItemText>Profile</ListItemText>
            </ListItemButton>
        </ListItem>
        <Divider variant="middle" />
        <ListItem component="div" disablePadding onClick={(e: any) => onChangeMenuRequested('language')}>
            <ListItemButton>
                <ListItemText>Launguage</ListItemText>
                <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>EN</ListItemIcon>
            </ListItemButton>
        </ListItem>
        <ListItem component="div" disablePadding onClick={(e: any) => onChangeMenuRequested('currency')}>
            <ListItemButton>
                <ListItemText>Price Display</ListItemText>
                <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>THB</ListItemIcon>
            </ListItemButton>
        </ListItem>
    </>);

    const renderMainMenu = () => {
        return (
            <MainMenu menu={props.menu} skipCommon={true} ></MainMenu>
        );
    }

    const renderNonAuthMenu = (
        <List
            sx={{
                width: '100%',
                minWidth: 300,
                maxWidth: 360,
                bgcolor: 'background.paper'
            }}
            subheader={<ListSubheader sx={{ lineHeight: '30px', marginTop: '10px' }}>My Account</ListSubheader>}
        >
            <ListItem component="div" disablePadding>
                <ListItemButton 
                    sx={{ textAlign: 'center' }}
                    // onClick={handleLogin}
                    component="a" href="/login"
                    >
                    <ListItemText
                        primary="Sign in"
                        primaryTypographyProps={{
                            color: 'primary',
                            fontWeight: 'medium',
                            variant: 'body1',
                        }}
                    />
                </ListItemButton>
                or
                <ListItemButton component="a" href="/login/register" sx={{ textAlign: 'center' }}>
                    <ListItemText
                        primary="Sign up"
                        primaryTypographyProps={{
                            color: 'primary',
                            fontWeight: 'medium',
                            variant: 'body1',
                        }}
                    />
                </ListItemButton>
            </ListItem>
            { renderCommonMenu }
        </List>
    );

    const renderAuthMenu = (
        <List
            sx={{
                width: '100%',
                minWidth: 300,
                maxWidth: 360,
                bgcolor: 'background.paper'
            }}
            subheader={<ListSubheader sx={{ lineHeight: '30px', marginTop: '10px' }}>My Account</ListSubheader>}
        >
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar><AccountBoxOutlined /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="9 Asset" secondary="admin@9asset.com"></ListItemText>
            </ListItem>
            { renderCommonMenu }
            <Divider variant="middle" />
            { renderMainMenu() }
        </List>
    );

    const renderLangMenu = (
        <List
            sx={{
                width: '100%',
                minWidth: 300,
                maxWidth: 360,
                bgcolor: 'background.paper'
            }}
        >
            
            <ListItem component="div" disablePadding onClick={(e: any) => onChangeMenuRequested('default')}>
                <ListItemButton>
                    <ListItemIcon><ChevronLeft /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{
                        color: 'default',
                        variant: 'subtitle2',
                    }}>Launguage</ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem component="div" disablePadding>
                <ListItemButton><ListItemText>English</ListItemText></ListItemButton>
            </ListItem>
            <ListItem component="div" disablePadding>
                <ListItemButton><ListItemText>Chinese</ListItemText></ListItemButton>
            </ListItem>
            <ListItem component="div" disablePadding>
                <ListItemButton><ListItemText>ภาษาไทย</ListItemText></ListItemButton>
            </ListItem>
        </List>
    );

    const renderCurrencyMenu = (
        <List
            sx={{
                width: '100%',
                minWidth: 300,
                maxWidth: 360,
                bgcolor: 'background.paper'
            }}
        >
            
            <ListItem component="div" disablePadding onClick={(e: any) => onChangeMenuRequested('default')}>
                <ListItemButton>
                    <ListItemIcon><ChevronLeft /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{
                        color: 'default',
                        variant: 'subtitle2',
                    }}>Price Display</ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem component="div" disablePadding>
                <ListItemButton><ListItemText>THB</ListItemText></ListItemButton>
            </ListItem>
            <ListItem component="div" disablePadding>
                <ListItemButton><ListItemText>USD</ListItemText></ListItemButton>
            </ListItem>
            <ListItem component="div" disablePadding>
                <ListItemButton><ListItemText>CNY</ListItemText></ListItemButton>
            </ListItem>
        </List>
    );

    const renderMenu = (
        
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isMenuOpen}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleMenuClose}
        >
            { 
                menuType === 'default' ? (false ? renderNonAuthMenu : renderAuthMenu) : 
                    ( menuType === 'language' ? (renderLangMenu) :
                        ( menuType === 'currency' ? (renderCurrencyMenu) : renderNonAuthMenu ) 
                    )
            }
            
            {/*   {
            //     props.isAuth === 'true' ?            
            //     [
            //       <MenuItem onClick={handleProfileClicked}>Profile</MenuItem>,
            //       <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>,
            //       <MenuItem onClick={handleLogout}>Logout</MenuItem>
            //     ]
            //   :
            //     <MenuItem onClick={handleLogin}>Login</MenuItem>
            //   } */}
        </Popover>
    );

    const userName = getUserName();

    return (<>
    <Avatar
        alt="9 Asset"
        style={{ height: '30px', width: '30px', margin: '12px' }}
        onClick={handleProfileMenuOpen}
    >{ userName }</Avatar>
    {renderMenu}
    </>
    );
}

interface IRecipeProps {
    userServiceUrl: string;
    useExternalLinkComponent: boolean;
    mainLink?: string;
    menubar: any;
    menu: any[];
    onAppChange?: (event: any) => void;
    onLangChanged?:  (event: any) => void;
    onMobileFilterClick:  (event: any) => void;
    onMobileSearchClick:  (event: any) => void;
    onMenuClick?: (id: number) => void;
    onSubMenuItemClick?: (id: number) => void;
    onProfileMenuItemClick?: (id: number) => void;
    logoPath?: string;
    allowNoLoginAccessSite?: boolean | undefined;
}

interface IRecipeState {
    appMenuEl: any;
    isAppMenuOpen: boolean;
    selectLang: string;
    isAuth: string;
    buyerUrl?: string;
    sellerUrl?: string;
    homeUrl?: string;
    user?: any;
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
            <iframe ref={iframeEl} src={`https://my.9asset.com/search-component/${props.lang || 'th'}/`}
                style={frameStyle} 
                height={iframeHeight} />
        </div>
    )
}

export class LayoutAppBar extends React.Component<IRecipeProps, IRecipeState> {
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
    menubar: any[] = [];
    menu: any[] = [];

    logoPath: any = '';

    constructor(props: any) {
        super(props);
        const { logoPath } = props;
        if(logoPath) this.logoPath = logoPath;

        this.menubar = [...this.props.menubar];
        this.menu = props.menu;

        this.state = {
            appMenuEl: null,
            isAppMenuOpen: false,
            selectLang: 'th',
            isAuth: 'false',
            user: null
        }
    }
   
    async componentDidMount () {
        const token = localStorage.getItem('9asset_token');
        // console.log('component did mount: ', token.split(':'));
        if(!token) {
            this.setState({
                ...this.state,
                isAuth: 'false'
            })

            if(this.props.allowNoLoginAccessSite !== true 
                && process.env.REACT_APP_NODE_ENV === 'production') {
                const currentUrl = encodeURIComponent(window.location.href);
                window.location.href = `https://my.9asset.com/login?redirect=${currentUrl}`;
            }
        } else {
            // const user = (await axios.get(`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`, { headers: { 'Authorization': `token ${token}`} })).data;
            if(this.props.userServiceUrl) {
                try {
                    const user = (await axios.get(`${this.props.userServiceUrl}`, { headers: { 'Authorization': `token ${token}`} })).data;
                    localStorage.setItem(`9_asets.userinfo`, JSON.stringify(user));
                    // this.setState({ user: user });

                    console.log('Success get user', user);
                    this.setState({
                        ...this.state,
                        isAuth: 'true',
                        user: user
                    })
                } catch (error) {
                    localStorage.clear();
                    this.setState({ user: null, isAuth: 'false' });

                    if(!this.props.allowNoLoginAccessSite && process.env.REACT_APP_NODE_ENV === 'production') {
                        const currentUrl = encodeURIComponent(window.location.href);
                        window.location.href = `https://my.9asset.com/login?redirect=${currentUrl}`;
                    }
                }
            }
        }
    }

    renderMenu () {
        const menu = this.menubar.map((t, i) => <HotMenu text={t.text} items={t.items} 
            useExternalLinkComponent={this.props.useExternalLinkComponent}
            onMenuItemClick={this.props.onSubMenuItemClick}
        />);
        
        menu.push( <HotMenu text={'...'} items={[]} 
            useExternalLinkComponent={this.props.useExternalLinkComponent} 
            onMenuItemClick={this.props.onSubMenuItemClick}
        /> );
        return menu;
    }

    handelMenuApps(event: any) {
        this.setState({ ...this.state,
            appMenuEl: event.currentTarget,
            isAppMenuOpen: true
        });
    }

    handleAppMenuClose() {
        this.setState({ ...this.state,
            appMenuEl: null,
            isAppMenuOpen: false
        }); 
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

    openApp(app: string) {
        if(app === 'home') {
            window.open(this.state.sellerUrl ? this.state.homeUrl: 'https://my.9asset.com/', '_blank');
        } else if(app === 'seller') {
            window.open(this.state.sellerUrl ? this.state.sellerUrl: 'https://my.9asset.com/seller/', '_blank');
        } else if(app === 'buyer') {
            window.open(this.state.sellerUrl ? this.state.buyerUrl: 'https://my.9asset.com/buyer/', '_blank')
        }
        this.handleAppMenuClose();
    }

    onMenuClick(id: number) {

        this.props.onMenuClick && this.props.onMenuClick(id);
    }

    getUserDisplayName() {
        return this.state.user 
            && this.state.user.displayName ? this.state.user.displayName : '' ;
    }

    render() {

        return (
            <AppBar position="fixed" color={'inherit'} style={{ zIndex: 1201 }} >
                <Toolbar>
                    <a href ={this.props.mainLink || '/' }>
                        <img src={this.logoPath} style={{ height: '40px' }} />
                    </a>
                    
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    
                    </Box> */}
                    {/* <Button
                        color="primary"
                        style={{ color: '#f4762a', marginLeft: '10px', textTransform: 'none' }}
                        endIcon={<KeyboardArrowDown />}
                    >
                        Thailand
                    </Button> */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                        <Button
                            color="info"
                            style={{ color: '#5e5e5e'}}
                            onClick={()=> this.onMenuClick(0)}
                        >
                            โครงการ
                        </Button>
                        <Button
                            color="primary"
                            style={{ color: '#5e5e5e' }}
                            onClick={()=> this.onMenuClick(1)}
                        >
                            ขาย
                        </Button>
                        <Button
                            color="primary"
                            style={{ color: '#5e5e5e' }}
                            onClick={()=> this.onMenuClick(2)}
                        >
                            เช่า
                        </Button>
                        <div style={{position: 'absolute', left: '250px', width: '450px'}}>
                            <AdvanceSearch />
                        </div>
                    </Box>
                    <div style={{ flexGrow: 1 }}></div>
                    {/* { this.renderSellerBuyerButtons() } */}
                    <div style={{marginRight: '10px'}}>
                        {  this.getUserDisplayName() }
                    </div>
                    {/* <Select variant="outlined" size="small" 
                        inputProps={{ margin: 'dense' }} value={this.state.selectLang} 
                        onChange={this.onLangChange.bind(this)} >
                        <MenuItem value={'en'}>EN</MenuItem>
                        <MenuItem value={'th'}>TH</MenuItem>
                        <MenuItem value={'cn'}>CN</MenuItem>
                    </Select> */}
                    <IconButton color="inherit" onClick={this.handelMenuApps.bind(this)} >
                        <Badge badgeContent={0} color="error">
                            <Apps />
                        </Badge>
                    </IconButton>
                    {/* <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton> */}
                    <div style={{ display: 'flex' }}>
                        <Profile {...this.props} isAuth={this.state.isAuth} user={this.state.user} 
                            onProfileMenuItemClick={this.props.onProfileMenuItemClick}
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
                            <Grid item xs={12} md={12} style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                <Button size="small" variant="outlined" startIcon={<SearchIcon />}
                                    sx={{width: '100%', bgcolor: 'white', color: 'black', textAlign: 'left',
                                        justifyContent: 'left'
                                    }}
                                    onClick={this.onMobileSearchClick.bind(this)} 
                                >Search</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.appMenuEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(this.state.isAppMenuOpen)}
                    onClose={this.handleAppMenuClose.bind(this)}
                >
                    <Grid container spacing={2} style={{paddingTop: '0px', paddingBottom: '0px'}}>
                        <Grid item xs={12}>
                            <Grid container >
                                <Grid key= {1} item style={{margin: '10px'}}>
                                    <IconButton aria-label="Home" >
                                        <HomeIcon fontSize="large" style={{ color: green[500] }}  
                                            onClick={ () => this.openApp('home') }/>
                                    </IconButton>
                                    <div style={{textAlign: 'center'}}>Home</div>
                                </Grid>
                                <Grid key= {2} item style={{margin: '10px'}}>
                                    <IconButton aria-label="buyer" >
                                        <HomeIcon fontSize="large" style={{ color: red[500] }}  
                                            onClick={ () => this.openApp('buyer') }/>
                                    </IconButton>
                                    <div style={{textAlign: 'center'}}>Buyer</div>
                                </Grid>
                                <Grid key= {3} item style={{margin: '10px'}}>
                                    <IconButton aria-label="seller" >
                                        <HomeIcon fontSize="large" style={{ color: blue[500] }} 
                                            onClick={ () => this.openApp('seller') } />
                                    </IconButton>
                                    <div style={{textAlign: 'center'}}>Seller</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Menu>
            </AppBar>
        );
    }
} 