import { Box, CssBaseline, Grid, Toolbar, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { DefaultAppBar as AppBar } from "../components/AppBar/DefaultAppBar";
import logoPath from '../../assets/images/9asset-logo.png';
import { Auth } from "firebase/auth";
import { auth } from "../../firebase";

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

export interface DefaultLayoutProps {
  module: 'seller' | 'buyer';
  auth: Auth;
}


export const DefaultLayout = (props: DefaultLayoutProps) => {

  return (
    <LayoutRoot>
      <CssBaseline />
      <AppBar
        
      />

      <MainContainer sx={{ p: { xs: 1, sm: 2 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <Toolbar />
      <Grid container sx={{ height: '42px', display: { xs: 'none', sm: 'block' } }}></Grid> */}
      <Outlet />
    </MainContainer>

    </LayoutRoot>
  )
}