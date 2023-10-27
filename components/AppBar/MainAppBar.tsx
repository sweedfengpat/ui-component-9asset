import { AppBar, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import { MeMenu } from "../Menu/MeMenu";

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

export type LoginFor = 'appointment' | 'requirements' | 'interested' | 'recently' | null;

export const MainAppBar = (props: MainAppBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState<boolean>(false);
  const [isLoginModalOpened, setIsLoginModalOpened] = useState<boolean>(false);
  const [loginModalMode, setLoginModalMode] = useState<'register'|'login'>('login');
  const [userInfo, setUserInfo] = useLocalStorage<any>(`9asset.userinfo`);
  const [isMeMenuOpened, setIsMeMenuOpened] = useState<boolean>(false);
  

  const [loginFor, setLoginFor] = useState<string|undefined>(undefined);
  const loginForRef = useRef(loginFor);
  const [path, setPath] = useState<string|null>(null);
  
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
    console.log(loginFor)
    loginForRef.current = loginFor;
  }, [loginFor]);

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

  const isAuth = () => {
    return !!state.user;
  }

  const loginRequested = () => {
    setLoginFor(undefined);
    if (isMeMenuOpened) {
      setTimeout(() => {
        setLoginModalMode('login');
        setIsLoginModalOpened(true);
      }, 400);
      setIsMeMenuOpened(false);
    } else {
      setLoginModalMode('login');
      setIsLoginModalOpened(true);
    }
    
  }

  const registerRequested = () => {
    setLoginModalMode('register');
    setIsLoginModalOpened(true);
  }

  const handleLoginClosed = (isLoggedIn?: boolean) => {
    setIsLoginModalOpened(false);

    // if (isLoggedIn) {
    //   setIsBuyerModalOpen(true);
    // }
  }

  const handleMeMenuRequested = () => {
    if (state.user) {
      setIsBuyerModalOpen(true);
    } else {
      setIsMeMenuOpened(true);
      // setIsLoginModalOpened(true);
    }
  }

  const handleSearchClicked = () => {
    props.onMobileSearchClicked?.();
  }

  const onLoginMessage = (msgEvent: MessageEvent) => {
    
    const { source, type } = msgEvent.data;
    if (source !== 'login' || (type !== 'logged-in' && type !== 'registered')) {
      return;
    }
    console.log(loginForRef.current);
    console.log('app bar >>>> logged')
    window.removeEventListener('message', onLoginMessage);
    if (isMobile) {
      setPath(loginForRef.current || null);
      setIsBuyerModalOpen(true);
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_BUYER_URL}${loginForRef.current || ''}`
    }
    
  }

  const handleBuyerMenuClicked = (type: string, link?: string) => {
    const logged = isAuth();
    if (logged) {
      setPath(null);
      if (isMobile) {
        setIsBuyerModalOpen(true);
      } else {
        window.location.href = `${process.env.NEXT_PUBLIC_BUYER_URL}${link || ''}`
      }
      
    } else {
      setIsMeMenuOpened(false);

      setLoginModalMode('login');
      setIsLoginModalOpened(true);
      
      setLoginFor(link);
      window.addEventListener('message', onLoginMessage);
    }
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
        handleBuyerMenuClicked(type, link);
        break;
      case 'seller':
        window.location.href = `${process.env.NEXT_PUBLIC_SELLER_URL}`
        break;
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

  const handleRequirementClicked = () => {
    props.onRequirementClicked?.(true);
  }

  return (
  <ThemeProvider theme={natheme}>
    <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
      <DesktopToolbar
        namespace="common"
        logoPath={props.logoPath}
        user={state.user}
        userInfo={state.userInfo || userInfo}
        menuItems={{
          auth: loggedMenuItems,
          nonauth: loggedMenuItems,
        }}
        onProfileMenuClick={handleProfileMenuClicked}
        onLanguageChanged={props.onLanguageChanged}
      />
      <MobileToolbar
        logoPath={props.logoPath}
        user={state.user}
        userInfo={state.userInfo || userInfo}
       
        onMenuItemClicked={handleProfileMenuClicked}
        onLanguageChanged={props.onLanguageChanged}
        onSearchClicked={handleSearchClicked}
      />
    </AppBar>
    <ButtomMenuBar onMeRequest={handleMeMenuRequested} onRequirementClick={handleRequirementClicked} />
    <BuyerModal
      open={isBuyerModalOpen}
      path={path}
      onClose={() => { setIsBuyerModalOpen(false); setPath(null); }}
    />
    <LoginModal open={isLoginModalOpened} mode={loginModalMode} onLoginClosed={handleLoginClosed} />
    <MeMenu
      open={isMeMenuOpened}
      logo={props.logoPath}
      items={loggedMenuItems}
      onClose={() => setIsMeMenuOpened(false)}
      onMenuClicked={handleProfileMenuClicked}
    />
  </ThemeProvider>
  );
}