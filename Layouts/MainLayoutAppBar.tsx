import { AppBar, Drawer, Toolbar, useScrollTrigger, Divider, Box, Container, Grid, Button, Menu, MenuItem, Avatar, IconButton, Select, Badge } from "@mui/material";
import { KeyboardArrowDown, Notifications } from "@mui/icons-material";
import React from "react";
import { HotMenu } from "./HotMenu";

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
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClicked}>Profile</MenuItem>
          <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
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

export class LayoutAppBar extends React.Component {
    
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
    }
   
    async componentDidMount () {
        const token = localStorage.getItem('9asset_token');
        console.log('component did mount: ', token);

        // const user = (await axios.get(`${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`, { headers: { 'Authorization': `token ${token}`} })).data;
        // localStorage.setItem(`9_asets.userinfo`, JSON.stringify(user));
    }

    renderMenu () {
        const menu = this.menubar.map((t, i) => <HotMenu text={t.text} items={t.items} />);
        menu.push( <HotMenu text={'...'} items={[]} /> );
        return menu;
    }

    render() {
        return (
            <AppBar position="fixed" color={'inherit'} style={{ zIndex: 1201 }} >
                <Toolbar>
                    <a href ={this.props.mainLink || '/' }>
                        <img src={this.logoPath} style={{ height: '40px' }} />
                    </a>
                    
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
                    {/* { this.renderSellerBuyerButtons() } */}
                    <Select variant="outlined" size="small" 
                        inputProps={{ margin: 'dense' }} value={'home'} 
                        onChange={this.props.onAppChange} >
                        <MenuItem value={'home'}>Home</MenuItem>
                        <MenuItem value={'buyer'}>Seller Center</MenuItem>
                        <MenuItem value={'seller'}>Buyer Center</MenuItem>
                    </Select>

                    <Select variant="outlined" size="small" 
                        inputProps={{ margin: 'dense' }} value={'en'} 
                        onChange={this.props.onLangChanged} >
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
                        <Profile {...this.props} />
                    </div>
                </Toolbar>
                <Grid container direction={'row'} style={{ background: '#f4762a', height: '42px', color: '#fffff' }} justifyContent='center' alignItems='center'>
                    <Grid item maxWidth={'900px'} >
                        { this.renderMenu() }
                    </Grid>
                </Grid>
            </AppBar>
        );
    }
} 