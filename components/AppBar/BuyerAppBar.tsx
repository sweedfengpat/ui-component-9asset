import { AppBar, useTheme } from "@mui/material";
import logoPath from '../../assets/images/9asset-logo.png';
import { DesktopToolbar } from "../Toolbar/Desktop";
import { BuyerMobileToolbar as MobileToolbar } from "../Toolbar/BuyerMobile";

export interface BuyerAppBarProps {
  namespace: string;
  title: string;
  additionalAction?: React.ReactNode;
  isBackable?: boolean;

  onBackRequested?: () => void;
  onClose?: () => void;
}

export const BuyerAppBar = (props: BuyerAppBarProps) => {
  const theme = useTheme();

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar namespace={props.namespace} logoPath={logoPath} />
    <MobileToolbar
      title={props.title}
      logoPath={logoPath}
      isBackable={props.isBackable}
      additionalAction={props.additionalAction}
      onBackRequested={props.onBackRequested}
      onClose={props.onClose}
    />
  </AppBar>
  );
}

export default BuyerAppBar;