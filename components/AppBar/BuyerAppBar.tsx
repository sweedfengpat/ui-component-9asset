import { AppBar, styled, useTheme } from "@mui/material";
import Logo from '../assets/images/9asset-logo.png';
import { DesktopToolbar } from "../Toolbar/Desktop";
import { MobileToolbar } from "../Toolbar/Mobile";

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
    <DesktopToolbar namespace={props.namespace} />
    <MobileToolbar
      title={props.title}
      isBackable={props.isBackable}
      additionalAction={props.additionalAction}
      onBackRequested={props.onBackRequested}
      onClose={props.onClose}
    />
  </AppBar>
  );
}

export default BuyerAppBar;