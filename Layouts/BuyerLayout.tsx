import { Box, Button, CssBaseline, Divider, Drawer, Grid, Toolbar, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router";
import { BuyerAppBar as AppBar } from "../components/AppBar/BuyerAppBar";
import ProfileCard from "../components/ProfileCard";
import DrawerMenu, { DrawerMenuItem } from "../components/Drawer/DrawerMenu";
import { EmailOutlined, EventNote, FolderSpecialOutlined, PageviewOutlined, History as HistoryIcon, AccountCircleOutlined } from "@mui/icons-material";

const LayoutRoot = styled(Box)({
  display: 'flex'
});

const MainContainer = styled('main')({
  backgroundColor: '#f4f6f8',
  minHeight: '100vh',
  paddingTop: 0,

  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

export interface BuyerLayoutProps {
  namespace?: string;
}

const drawerWidth = 255;
const locationMap = new Map([
  ['/', 'Buyer'],
  ['/requirements', 'My Requirements'],
  ['/requirement', 'Requirement'],
  ['/interested', 'Interested'],
  ['/inquiry', 'Inquiry'],
  ['/recently', 'Recently View'],
  ['/appointment', 'Appointments']
]);
const drawerMenu = [
  {
    key: 'requirement',
    title: 'myRequirement',
    icon: PageviewOutlined,
    link: '/requirements',
  },
  {
    key: 'interestedListing',
    title: 'interestedListing.title',
    icon: FolderSpecialOutlined,
    link: '/interested', 
  },
  {
    key: 'recentlyViews',
    title: 'recentlyViews.title',
    icon: HistoryIcon,
    link: '/recently',
  },
  {
    key: 'inquiry',
    title: 'inquiry.title',
    icon: EmailOutlined,
    link: '/inquiry',
  },
  {
    key: 'appointment',
    title: 'appointment.title',
    icon: EventNote,
    link: '/appointment',
  },
  {
    key: 'profile-update',
    title: 'myAccount',
    icon: AccountCircleOutlined,
    items: [
      {
        key: 'profile',
        title: 'profile',
        // icon: AssignmentIndOutlined,
        link: '/myprofile',
      },
      {
        key: 'logout',
        title: 'logout',
        // icon: ExitToApp,
        link: '/logout',
      },
    ]
  },
] as DrawerMenuItem[];

export const BuyerLayout = (props: BuyerLayoutProps) => {
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem(`9asset.userinfo`) || 'null');
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    return locationMap.get(location.pathname) || 'Buyer';
  }

  const handleClosed = () => {
    if (window.self !== window.top) {
      window.parent?.postMessage({
        source: 'buyer',
        type: 'close-window',
      }, '*');
    } else {
      window.location.href = `${process.env.REACT_APP_BASE_URL}`;
    }
  }

  const getAdditionalAction = () => {
    if (location.pathname === '/') {
      return (
      <Button
        variant="text"
        sx={{ p: 0, textTransform: 'none', fontWeight: '600' }}
        onClick={() => window.location.href = `${process.env.REACT_APP_BASE_SELLER_URL}` }
      >
        Seller Center
      </Button>
      );
    } else {
      return (<></>);
    }
  }

  const handleBackRequested = () => {
    navigate('/');
  }
  
  return (
  <LayoutRoot>
    <CssBaseline />
    <AppBar
      namespace={props.namespace || 'common'}
      title={getTitle()}
      additionalAction={getAdditionalAction()}
      isBackable={location.pathname !== '/'}
      onBackRequested={handleBackRequested}
      onClose={handleClosed}
    />
    
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
        display: { xs: 'none', sm: 'flex' },
        paddingTop: '106px'
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Grid container sx={{ height: '42px' }}>
      </Grid>
      <ProfileCard user={user}></ProfileCard>
      <Divider variant="middle"></Divider>
      <DrawerMenu menu={drawerMenu} />
    </Drawer>
    
    <MainContainer sx={{ p: { xs: 1, sm: 2 } }}>
      <Toolbar />
      <Grid container sx={{ height: '42px', display: { xs: 'none', sm: 'block' } }}></Grid>
      <Outlet />
    </MainContainer>
  </LayoutRoot>
  );
}

export default BuyerLayout;