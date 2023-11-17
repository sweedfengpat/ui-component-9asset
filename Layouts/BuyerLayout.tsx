import { Backdrop, Box, Button, CircularProgress, CssBaseline, Divider, Drawer, Grid, Toolbar, styled, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router";
import { BuyerAppBar as AppBar } from "../components/AppBar/BuyerAppBar";
import ProfileCard from "../components/ProfileCard";
import DrawerMenu, { DrawerMenuItem } from "../components/Drawer/DrawerMenu";
import { EmailOutlined, EventNote, FolderSpecialOutlined, PageviewOutlined, History as HistoryIcon, AccountCircleOutlined, DashboardOutlined } from "@mui/icons-material";
import { Auth } from "@firebase/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { LoginModal } from "../components/LoginModal";

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
  auth: Auth;
  namespace?: string;

  onCurrentMenuChanged?: (key: string) => void;
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
    key: 'dashboard',
    title: 'dashboard',
    icon: DashboardOutlined,
    link: '/',
  },
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
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useLocalStorage<any>(`9asset.userinfo`);
  const [currentMenu, setCurrentMenu] = useState<string|null>(null);

  const [firebaseUser, setFirebaseUser] = useState<User|null>(props.auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(process.env.NODE_ENV === 'development' || props.auth.currentUser !== null);

  useEffect(() => {
    setIsLoading(true);
    if (props.auth.currentUser) {
      setIsLoading(false);
    }
    const unsub = onAuthStateChanged(props.auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setTimeout(() => { setIsLoading(false) }, 500);
    });
    
    return () => { 
      unsub && unsub();
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(process.env.NODE_ENV === 'development' || firebaseUser !== null);
  }, [firebaseUser]);

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

  const handleDrawerMenuClicked = (key: string) => {
    setCurrentMenu(key);
  }

  const handleLoginClosed = () => {
    if (!isLoggedIn) {
      window.location.href = `${process.env.REACT_APP_BASE_URL}`;
    }
  }
  
  return (
  <LayoutRoot>
    <CssBaseline />
    <AppBar
      namespace={props.namespace || 'common'}
      auth={props.auth}
      title={getTitle()}
      additionalAction={getAdditionalAction()}
      isBackable={location.pathname !== '/'}
      onBackRequested={handleBackRequested}
      onClose={handleClosed}
    />
    
    { !isLoading && (
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
      { isLoggedIn && (
        <DrawerMenu
          menu={drawerMenu}
          multiActive={true}
          onMenuItemClick={handleDrawerMenuClicked}
        />)
      }
    </Drawer>) }
    
    <MainContainer sx={{ p: { xs: 1, sm: 2 } }}>
      <Toolbar />
      <Grid container sx={{ height: '42px', display: { xs: 'none', sm: 'block' } }}></Grid>
      { !isLoading &&  isLoggedIn && (<Outlet context={[currentMenu]} /> ) }
    </MainContainer>

    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
    <LoginModal
      open={!isLoading && !isLoggedIn && !firebaseUser}
      mode={"login"}
      onLoginClosed={handleLoginClosed}
    />
  </LayoutRoot>
  );
}

export default BuyerLayout;