import { AppBar, ThemeProvider, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DesktopToolbar } from '../Toolbar/Desktop';
import { ButtomMenuBar } from "../../Layouts/ButtomBar";
import { BuyerModal } from "../../Layouts/BuyerModal";
import { BuyerMobileToolbar as MobileToolbar } from "../Toolbar/BuyerMobile";

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
    setIsLoginModalOpened(true);
  }

  const handleLoginClosed = (isLoggedIn: boolean) => {
    setIsLoginModalOpened(false);
  }

  const handleMeMenuRequested = () => {
    setIsBuyerModalOpen(true)
  }

  return (
  <ThemeProvider theme={natheme}>
    <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
      <DesktopToolbar namespace="common" logoPath={props.logoPath} />
      <MobileToolbar logoPath={props.logoPath} />
    </AppBar>
    <BuyerModal open={isBuyerModalOpen} onClose={() => setIsBuyerModalOpen(false)} />
    <ButtomMenuBar onMeRequest={handleMeMenuRequested} onRequirementClick={props.onRequirementClick} />
    <LoginModal open={isLoginModalOpened} onLoginClosed={handleLoginClosed} />
  </ThemeProvider>
  );
}