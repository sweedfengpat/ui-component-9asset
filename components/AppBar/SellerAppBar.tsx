import { AppBar, useTheme } from "@mui/material";
import { DesktopToolbar } from "../Toolbar/Desktop";

import logoPath from '../../assets/images/9asset-logo.png';
import { SellerMobileToolBar as MobileToolbar } from "../Toolbar/SellerMobile";

export interface SellerAppBarProps {
  namespace: string;
  title: string;

  additionalAction?: React.ReactNode;
}

export const SellerAppBar = (props: SellerAppBarProps) => {
  const theme = useTheme();

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar
      namespace={props.namespace}
      logoPath={logoPath}
      menuItems={{
        auth: [],
        nonauth: []
      }}
      user={null}
      userInfo={undefined}
    />
    <MobileToolbar
      title={props.title}
      logoPath={logoPath}
      additionalAction={props.additionalAction}
    />
  </AppBar>
  );
}