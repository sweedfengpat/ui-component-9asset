import { AppBar, useTheme } from "@mui/material";
import { DesktopToolbar } from "../Toolbar/Desktop";

import logoPath from '../../assets/images/9asset-logo.png';
import { SellerMobileToolBar as MobileToolbar } from "../Toolbar/SellerMobile";

export interface SellerAppBarProps {
  namespace: string;
  title: string;
}

export const SellerAppBar = (props: SellerAppBarProps) => {
  const theme = useTheme();

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar namespace={props.namespace} logoPath={logoPath} />
    <MobileToolbar
      title={props.title}
    />
  </AppBar>
  );
}