import { AppBar, useTheme } from "@mui/material";
import { DesktopToolbar } from "../Toolbar/Desktop";

import logoPath from '../../assets/images/9asset-logo.png';
import { SellerMobileToolBar as MobileToolbar } from "../Toolbar/SellerMobile";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export interface SellerAppBarProps {
  namespace: string;
  title: string;
  additionalAction?: React.ReactNode;
  auth: Auth;
}

export const SellerAppBar = (props: SellerAppBarProps) => {
  const theme = useTheme();

  const [user, setUser] = useState<User|null>(null);
  const [userInfo, setUserInfo] = useLocalStorage<any>(`9asset.userinfo`);

  useEffect(() => {
    const unsub = getUser();
    return () => { 
      unsub && unsub();
    }
  }, []);

  const getUser = () => {
    if (props.auth) {
      setUser(props.auth.currentUser)
      return onAuthStateChanged(props.auth, () => {
        setUser(props.auth.currentUser)
      });
    }
    return null;
  }

  const handleProfileMenuClicked = (type: string, link?: string) => {
    switch (type) {
      case 'logout':
        window.location.href = `${process.env.REACT_APP_LOGIN_BASE_URL}/logout`
        break;
      default:
        break;
    }
  }

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar
      namespace={props.namespace}
      logoPath={logoPath}

      menuItems={{
        auth: [],
        nonauth: []
      }}

      user={user}
      userInfo={userInfo}

      onProfileMenuClick={handleProfileMenuClicked}
    />
    <MobileToolbar
      title={props.title}
      logoPath={logoPath}
      additionalAction={props.additionalAction}
    />
  </AppBar>
  );
}