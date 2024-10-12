import { AppBar, useTheme } from "@mui/material";
import logoPath from '../../assets/images/9asset-logo.png';
import { DesktopToolbar } from "../Toolbar/Desktop";
import { BuyerMobileToolbar as MobileToolbar } from "../Toolbar/BuyerMobile";
import { useEffect, useState } from "react";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { MenuItem } from "../Toolbar";
import { useNavigate } from "react-router";
import { UserInfo } from "../../store/users/reducer";

const loggedMenuItems = [
  {
    key: 'dashboard',
    text: 'menu.dashboard',
    link: '/',
  },
  {
    key: 'requirements',
    text: 'menu.myRequirement',
    link: '/requirements',
  },
  {
    key: 'interested',
    text: 'menu.interestedListing.title',
    link: '/interested',
  },
  {
    key: 'recently',
    text: 'menu.recentlyViews.title',
    link: '/recently',
  },
  {
    key: 'appointment',
    text: 'menu.appointment.title',
    link: '/appointment',
  },
  {
    key: 'inquiry',
    text: 'menu.inquiry.title',
    link: '/inquiry',
  },
] as MenuItem[];

export interface AppBarState {

}

export interface BuyerAppBarProps {
  namespace: string;
  title?: string;
  additionalAction?: React.ReactNode;
  isBackable?: boolean;
  auth?: Auth;
  user: UserInfo | null;

  onBackRequested?: () => void;
  onClose?: () => void;
  onLanguageChanged?: (lng: string) => void;
  onSearchClicked?: () => void;
}

export const BuyerAppBar = (props: BuyerAppBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    const unsub = getUser();
    return () => { 
      unsub && unsub();
    }
  }, []);

  const getUser = () => {
    if (props.auth) {
      setUser(props.auth.currentUser)
      return onAuthStateChanged(props.auth, (currentUser) => {
        setUser(currentUser)
      });
    }
    return null;
  }

  const handleProfileMenuClicked = (type: string, link?: string) => {
    switch (type) {
      case 'logout':
        window.location.href = `${process.env.REACT_APP_LOGIN_BASE_URL}/logout`
        break;
      case 'dashboard':
      case 'appointment':
      case 'requirements':
      case 'interested':
      case 'recently':
      case 'inquiry':
        link && navigate(link);
        break;
      default:
        break;
    }
  }

  const onLanguageChanged = (ln: string) => {
    props.onLanguageChanged?.(ln);
  }

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar
      namespace={props.namespace}
      logoPath={logoPath}
      
      user={user}
      userInfo={props.user}

      menuItems={{
        auth: loggedMenuItems,
        nonauth: []
      }}
      onProfileMenuClick={handleProfileMenuClicked}
      onLanguageChanged={onLanguageChanged}
    />
    <MobileToolbar
      title={props.title || '9asset'}
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