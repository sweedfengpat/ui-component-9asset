import { Backdrop, Box, CircularProgress, CssBaseline, Divider, Drawer, Grid, IconButton, Toolbar, styled, useTheme } from "@mui/material";
import { SellerAppBar as AppBar } from '../components/AppBar/SellerAppBar';
import ProfileCard from "../components/ProfileCard";
import DrawerMenu, { DrawerMenuItem } from "../components/Drawer/DrawerMenu";
import { AccountCircleOutlined, AdsClickOutlined, DashboardOutlined, LocalMallOutlined, PageviewOutlined, QueryStatsOutlined, Search, ViewListOutlined } from "@mui/icons-material";
import { Outlet, useLocation } from "react-router-dom";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { LoginModal } from "../components/LoginModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
const drawerWidth = 255;

const drawerMenu = [
  {
    key: 'dashboard',
    title: 'dashboard',
    icon: DashboardOutlined,
    link: '/',
  },
  {
    key: 'buyer-requirement',
    title: 'requirement',
    icon: PageviewOutlined,
    link: '/buyer-requirement',
  },
  {
    key: 'my-listing',
    title: 'listing',
    icon: ViewListOutlined,
    link: '/listing',
  },
  {
    key: 'lead',
    title: 'lead.title',
    icon: QueryStatsOutlined,
    items: [
      {
        key: 'prospect',
        title: 'prospect.title',
        link: '/prospect',
      },
      {
        key: 'inquiry',
        title: 'inquiry.title',
        link: '/inquiry',
      },
      {
        key: 'appointment',
        title: 'appointment.title',
        link: '/appointment',
      },
    ],
  },
  {
    key: 'package',
    title: 'package',
    icon: LocalMallOutlined,
    // link: '/topup',
    items: [
      {
        key: 'topup',
        title: 'topup.title',
        // icon: LocalOfferOutlined,
        link: '/topup',
      },
      {
        key: 'transfer',
        title: 'transferPoint.title',
        // icon: LocalOfferOutlined,
        link: '/transfer-point',
      },
      {
        key: 'myPackage',
        title: 'myPackage.title',
        // icon: LocalOfferOutlined,
        link: '/my-package',
      },
    ],
  },
  {
    key: 'profileupdate',
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
        key: 'companyprofile',
        title: 'companyProfile',
        // icon: LockOutlined,
        link: '/company-profile',
      },
      {
        key: 'affiliateagent',
        title: 'affiliateAgent',
        // icon: LockOutlined,
        link: '/affiliate-agent',
      },
      {
        key: 'logout',
        title: 'logout',
        // icon: ExitToApp,
        link: '/logout',
      },
    ],
  },
] as DrawerMenuItem[];

export interface SellerLayoutContext {
  openedModal: string | null;
  closeModal: () => void;
}

export interface SellerLayoutProps {
  auth: Auth;
  namespace?: string;
}

export const SellerLayout = (props: SellerLayoutProps) => {
  const theme = useTheme();

  const [user, setUser] = useLocalStorage<any>(`9asset.userinfo`);
  const [firebaseUser, setFirebaseUser] = useState<User|null>(props.auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(process.env.NODE_ENV === 'development' || props.auth.currentUser !== null);
  const [openedModal, setOpenedModal] = useState<string|null>(null);

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
    return 'Seller Center';
  }

  const handleSearchClicked = () => {
    setOpenedModal('search');
  }

  const handleLoginClosed = () => {
    if (!isLoggedIn) {
      window.location.href = `${process.env.REACT_APP_DOMAIN}`;
    }
  }

  const closeModal = () => {
    setOpenedModal(null);
  }

  return (
    <LayoutRoot>
      <CssBaseline />
      <AppBar
        namespace={props.namespace || 'common'}
        title={getTitle()}
        auth={props.auth}
        onSearchClicked={handleSearchClicked}
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
        <Grid container sx={{ height: '42px' }}></Grid>
        <ProfileCard user={user}></ProfileCard>
        <Divider variant="middle" />
        { isLoggedIn && (<DrawerMenu menu={drawerMenu} />) }
      </Drawer>) }

      <MainContainer sx={{ p: { xs: 1, sm: 2 }, paddingBottom: { xs: '70px' } }}>
        <Toolbar />
        <Grid container sx={{ height: '42px', display: { xs: 'none', sm: 'block' } }}></Grid>
        {
          !isLoading &&
          isLoggedIn &&
          <Outlet context={{openedModal, closeModal}} /> 
        }
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

export default SellerLayout;