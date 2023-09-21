import { AppBar, ThemeProvider, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DesktopToolbar } from '../Toolbar/Desktop';
import { ButtomMenuBar } from "../../Layouts/ButtomBar";
import { BuyerModal } from "../../Layouts/BuyerModal";
import { MobileToolbar } from "../Toolbar/Mobile";

import natheme from "../../theme";
import { FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginModal } from "../LoginModal";

export interface MainAppBarProps {
  logoPath: string;
  app: FirebaseApp;

  onRequirementClick?: (isOpen: boolean) => void;
}

export const MainAppBar = (props: MainAppBarProps) => {
  const theme = useTheme();
  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState<boolean>(false);
  const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
  const [loginModalMode, setLoginModalMode] = useState<'register'|'login'>('login');

  useEffect(() => {
    const unsub = getToken();
    window.addEventListener('loginrequested', loginRequested);
    return () => { 
      unsub && unsub();
      window.removeEventListener('loginrequested', loginRequested);
    };
  }, []);

  const getToken = () => {
    const auth = getAuth(props.app);
    return onAuthStateChanged(auth, async (user) => {

    });
  }

  const loginRequested = () => {
    setLoginModalMode('login');
    setIsLoginModalOpened(true);
  }

  const registerRequested = () => {
    setLoginModalMode('register');
    setIsLoginModalOpened(true);
  }

  const handleLoginClosed = (isLoggedIn?: boolean) => {
    setIsLoginModalOpened(false);
  }

  const handleMeMenuRequested = () => {
    setIsBuyerModalOpen(true)
  }

  const handleProfileMenuClicked = (type: string) => {
    switch (type) {
      case 'login':
        loginRequested();
        break;
      case 'register':
        registerRequested();
        break;
      default:
        break;
    }
  }

  const handleMenuClicked = (type: string) => {
    switch (type) {
      case 'login':
        loginRequested();
        break;
      case 'register':
        registerRequested();
        break;
      default:
        break;
    }
  }

  return (
  <ThemeProvider theme={natheme}>
    <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
      <DesktopToolbar
        namespace="common"
        logoPath={props.logoPath}
        onProfileMenuClick={handleProfileMenuClicked}
      />
      <MobileToolbar
        logoPath={props.logoPath}
        onMenuItemClicked={handleMenuClicked}
      />
    </AppBar>
    <BuyerModal open={isBuyerModalOpen} onClose={() => setIsBuyerModalOpen(false)} />
    <ButtomMenuBar onMeRequest={handleMeMenuRequested} onRequirementClick={props.onRequirementClick} />
    <LoginModal open={isLoginModalOpened} mode={loginModalMode} onLoginClosed={handleLoginClosed} />
  </ThemeProvider>
  );
}