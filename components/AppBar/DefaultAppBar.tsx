import { AppBar, useTheme } from "@mui/material";
import { DesktopToolbar } from "../Toolbar/Desktop";
import logoPath from '../../assets/images/9asset-logo.png';

export const DefaultAppBar = () => {
  const theme = useTheme();

  return (
    <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
      <DesktopToolbar
        namespace={"common"}
        menuItems={{
          auth: [],
          nonauth: []
        }}
        logoPath={logoPath}
        user={null}
        userInfo={undefined}
      />

     
    </AppBar>
  );
}