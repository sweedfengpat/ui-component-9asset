import { AppBar, Drawer, Toolbar, useScrollTrigger, Divider, Box, 
    Container, Grid, Button, Menu, MenuItem, Avatar, IconButton, Select, Badge,
    Paper, Autocomplete, TextField
} from "@mui/material";
import { KeyboardArrowDown, 
    Notifications,
    Apps,
    Home as HomeIcon
 } from "@mui/icons-material";

import { 
    green,
    red,
    blue
} from '@mui/material/colors';
import React from "react";
import { HotMenu } from "./HotMenu";
import axios from 'axios';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

const Profile  = (props: any) => {
    // const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleProfileClicked = () => {
        // history.push('/myprofile');
        setAnchorEl(null);
    }

    const handleChangePassword = () => {
        // history.push('/changepassword');
        setAnchorEl(null);
    }

    const handleLogout = () => {
        // history.push('/logout');
        setAnchorEl(null);
    }

    const handleLogin = () => {
        // history.push('/logout');
        props.handleLogin && props.handleLogin();
        setAnchorEl(null);
    }

    const getUserName = () => {
        const userInfo = props.user;
        if (userInfo) {
            if (userInfo.displayName) {
                return userInfo.displayName[0];
            } else if (userInfo.email) {
                return (userInfo.email as string)[0].toUpperCase();
            }
        }
        return '9';
    }

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {

            props.isAuth === 'true' ?            
            [
              <MenuItem onClick={handleProfileClicked}>Profile</MenuItem>,
              <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>,
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ]
          :
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          }
        </Menu>
    );

    const userName = getUserName();

    return (<>
    <Avatar
        alt="9 Asset"
        style={{ height: '30px', width: '30px', margin: '12px' }}
        onClick={handleProfileMenuOpen}
    >{ userName }</Avatar>
    {renderMenu}</>
    );
}

interface IRecipeProps {
    userServiceUrl: string;
    mainLink?: string;
    onAppChange?: (event: any) => { };
    onLangChanged?:  (event: any) => { };
    onMobileFilterClick:  (event: any) => { };
    onMobileSearchClick:  (event: any) => { };
}

interface IRecipeState {
    appMenuEl: any;
    isAppMenuOpen: boolean;
    selectLang: string;
    isAuth: boolean;
}

export class LayoutAppBar extends React.Component<IRecipeProps, IRecipeState> {
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

    logoPath: any = '';

    constructor(props: any) {
        super(props);
        const { logoPath, menu } = props;
        if(logoPath) this.logoPath = logoPath;

        if(menu) this.menubar = menu;

        this.state = {
            appMenuEl: null,
            isAppMenuOpen: false,
            selectLang: 'th',
            isAuth: false
        }
    }
   
    async componentDidMount () {
        const token = localStorage.getItem('9asset_token');
        console.log('component did mount: ', token);
        if(!token) {
            this.setState({
                ...this.state,
                isAuth: false
            })
        } else {
            // const user = (await axios.get(`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`, { headers: { 'Authorization': `token ${token}`} })).data;
            // const user = (await axios.get(`${this.props.userServiceUrl}`, { headers: { 'Authorization': `token ${token}`} })).data;
            // localStorage.setItem(`9_asets.userinfo`, JSON.stringify(user));
            this.setState({
                ...this.state,
                isAuth: true
            })
        }
    }

    renderMenu () {
        const menu = this.menubar.map((t, i) => <HotMenu text={t.text} items={t.items} />);
        menu.push( <HotMenu text={'...'} items={[]} /> );
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

    render() {

        return (
            <AppBar position="fixed" color={'inherit'} style={{ zIndex: 1201 }} >
                <Toolbar>
                    <a href ={this.props.mainLink || '/' }>
                        <img src={this.logoPath} style={{ height: '40px' }} />
                    </a>
                    
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    
                    </Box> */}
                    <Button
                        color="primary"
                        style={{ color: '#f4762a', marginLeft: '10px', textTransform: 'none' }}
                        endIcon={<KeyboardArrowDown />}
                    >
                        Thailand
                    </Button>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
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
                    </Box>
                    <div style={{ flexGrow: 1 }}></div>
                    {/* { this.renderSellerBuyerButtons() } */}
                    <Select variant="outlined" size="small" 
                        inputProps={{ margin: 'dense' }} value={this.state.selectLang} 
                        onChange={this.onLangChange.bind(this)} >
                        <MenuItem value={'en'}>EN</MenuItem>
                        <MenuItem value={'th'}>TH</MenuItem>
                        <MenuItem value={'cn'}>CN</MenuItem>
                    </Select>
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
                        <Profile {...this.props} isAuth={this.state.isAuth} />
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
                                        <HomeIcon fontSize="large" style={{ color: green[500] }}/>
                                    </IconButton>
                                    <div style={{textAlign: 'center'}}>Home</div>
                                </Grid>
                                <Grid key= {2} item style={{margin: '10px'}}>
                                    <IconButton aria-label="buyer" >
                                        <HomeIcon fontSize="large" style={{ color: red[500] }}/>
                                    </IconButton>
                                    <div style={{textAlign: 'center'}}>Buyer</div>
                                </Grid>
                                <Grid key= {3} item style={{margin: '10px'}}>
                                    <IconButton aria-label="seller" >
                                        <HomeIcon fontSize="large" style={{ color: blue[500] }}/>
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