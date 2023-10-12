import { AppBar, ThemeProvider, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DesktopToolbar } from '../Toolbar/Desktop';
import { ButtomMenuBar } from "../../Layouts/ButtomBar";
import { BuyerModal } from "../../Layouts/BuyerModal";
import { MobileToolbar } from "../Toolbar/Mobile";

import natheme from "../../theme";
import { FirebaseApp } from "firebase/app";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginModal } from "../LoginModal";
import { MenuItem } from "../Toolbar";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import axios from "axios";

const loggedMenuItems = [
  {
    key: 'requirements',
    text: 'menu.myRequirement',
    link: '/requirements',
  },
  {
    key: 'interested',
    text: 'menu.interested',
    link: '/interested',
  },
  {
    key: 'recently',
    text: 'menu.recently',
    link: '/recently',
  },
  {
    key: 'appointment',
    text: 'menu.appointment',
    link: '/appointment',
  },
  {
    key: 'inquiry',
    text: 'menu.inquiry',
    link: '/inquiry',
  },
  {
    key: 'seller',
    text: 'menu.sellerCenter',
    link: '/'
  }
] as MenuItem[];

export interface AppBarState {
  user: User | null;
  userInfo: any | null;
}

export interface MainAppBarProps {
  logoPath: string;
  app: FirebaseApp;

  auth: Auth;

  onLanguageChanged?: (ln: string) => void;
  onMenuClicked?: (type: string) => void;
  onMobileSearchClicked?: () => void;
  onRequirementClicked?: (isOpen: boolean) => void;
}

export const MainAppBar = (props: MainAppBarProps) => {
  const theme = useTheme();
  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState<boolean>(false);
  const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
  const [loginModalMode, setLoginModalMode] = useState<'register'|'login'>('login');
  const [userInfo, setUserInfo] = useLocalStorage<any>(`9asset.userinfo`);
  
  const [state, setState] = useState<AppBarState>({
    user: null,
    userInfo: userInfo
  });

  useEffect(() => {
    const unsub = getToken();
    window.addEventListener('loginrequested', loginRequested);
    return () => { 
      unsub && unsub();
      window.removeEventListener('loginrequested', loginRequested);
    };
  }, []);

  useEffect(() => {
    console.log(`User Info:`, userInfo);
    setState({ ...state, userInfo: userInfo });
  }, [userInfo]);

  const getToken = () => {
    setState({ ...state, user: props.auth.currentUser });
    return onAuthStateChanged(props.auth || getAuth(props.app), async (user: User | null) => {

      if (user) {
      //   const userInfo = JSON.parse(localStorage.getItem(`9asset.userinfo`) || 'null');
      //   if (userInfo && (state.user?.uid && userInfo.firebaseId === state.user?.uid)) {
        setState({ ...state, user: user });
        const token = await user.getIdToken();
        console.log('my token: ', token);
        const uInfo = (await axios.get(`${process.env.NEXT_PUBLIC_USER_SERVICE_API_BASE || process.env.REACT_APP_USER_SERVICE_API_BASE}/users`, { headers: { 'Authorization': `token ${token}`} })).data;
        console.log('user-info')
        setUserInfo(uInfo);
      //   } else {
      //     setState({ ...state, userInfo: null });
      //     console.log('set interval!')
      //     const interval = setInterval(() => {
      //       const userInfo = JSON.parse(localStorage.getItem(`9asset.userinfo`) || 'null');
      //       if (userInfo && (state.user?.uid && userInfo.firebaseId === state.user?.uid)) {
      //         setState({ ...state, userInfo: userInfo });
      //         clearInterval(interval);

      //         console.log('interval cleared!')
      //       }
      //     }, 500);
      //   }
      } else {
        setState({ ...state, user: null });
      }
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

    if (isLoggedIn) {
      setIsBuyerModalOpen(true);
    }
  }

  const handleMeMenuRequested = () => {
    if (state.user) {
      setIsBuyerModalOpen(true);
    } else {
      setIsLoginModalOpened(true);
    }
  }

  const handleSearchClicked = () => {
    props.onMobileSearchClicked?.();
  }

  const handleProfileMenuClicked = (type: string, link?: string) => {
    switch (type) {
      case 'login':
        loginRequested();
        break;
      case 'register':
        registerRequested();
        break;
      case 'logout':
        window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL_BASE}/logout`
        break;
      case 'appointment':
      case 'requirements':
      case 'interested':
      case 'recently':
        if (link) {
          window.location.href = `${process.env.NEXT_PUBLIC_BUYER_URL}${link}`
        }
        break;
      case 'seller':
      case 'company-profile':
      case 'affiliate-agent':
      case 'listing':
        if (link) {
          window.location.href = `${process.env.NEXT_PUBLIC_SELLER_URL}${link}`
        }
        break;
      case 'project':
      case 'sale':
      case 'rent':
        props.onMenuClicked?.(type);
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
        user={state.user}
        userInfo={state.userInfo || userInfo}
        menuItems={loggedMenuItems}
        onProfileMenuClick={handleProfileMenuClicked}
        onLanguageChanged={props.onLanguageChanged}
      />
      <MobileToolbar
        logoPath={props.logoPath}
        user={state.user}
        userInfo={state.userInfo || userInfo}
        menuItems={loggedMenuItems}
        onMenuItemClicked={handleProfileMenuClicked}
        onLanguageChanged={props.onLanguageChanged}
        onSearchClicked={handleSearchClicked}
      />
    </AppBar>
    <BuyerModal open={isBuyerModalOpen} onClose={() => setIsBuyerModalOpen(false)} />
    <ButtomMenuBar onMeRequest={handleMeMenuRequested} onRequirementClick={props.onRequirementClicked} />
    <LoginModal open={isLoginModalOpened} mode={loginModalMode} onLoginClosed={handleLoginClosed} />
  </ThemeProvider>
  );
}