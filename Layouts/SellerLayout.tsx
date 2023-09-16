import { Box, CssBaseline, Divider, Drawer, Grid, Toolbar, styled } from "@mui/material";
import { SellerAppBar as AppBar } from '../components/AppBar/SellerAppBar';
import ProfileCard from "../components/ProfileCard";
import DrawerMenu, { DrawerMenuItem } from "../components/Drawer/DrawerMenu";
import { SellerBottomBar as BottomBar } from '../Layouts/SellerButtomBar';
import { AccountCircleOutlined, AdsClickOutlined, LocalMallOutlined, PageviewOutlined, QueryStatsOutlined, ViewListOutlined } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const LayoutRoot = styled(Box)({
  display: 'flex'
});
const MainContainer = styled(Box)({
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
    key: 'prospect',
    title: 'prospect.title',
    icon: AdsClickOutlined,
    link: '/prospect',
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

export interface SellerLayoutProps {
  namespace?: string;
}

export const SellerLayout = (props: SellerLayoutProps) => {
  const user = JSON.parse(localStorage.getItem(`9asset.userinfo`) || 'null');

  const getTitle = () => {
    return 'Seller Center';
  }

  return (
    <LayoutRoot>
      <CssBaseline />
      <AppBar
        namespace={props.namespace || 'common'}
        title={getTitle()}
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
        <Grid container sx={{ height: '42px' }}></Grid>
        <ProfileCard user={user}></ProfileCard>
        <Divider variant="middle" />
        <DrawerMenu menu={drawerMenu} />
      </Drawer>

      <MainContainer component="main" sx={{ p: { xs: 1, sm: 2 } }}>
        <Toolbar />
        <Grid container sx={{ height: '42px', display: { xs: 'none', sm: 'block' } }}></Grid>
        <Outlet />
      </MainContainer>
      <BottomBar />
    </LayoutRoot>
  );
}

export default SellerLayout;