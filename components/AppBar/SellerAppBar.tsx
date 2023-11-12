import { AppBar, useTheme } from "@mui/material";
import { DesktopToolbar } from "../Toolbar/Desktop";

import logoPath from '../../assets/images/9asset-logo.png';
import { SellerMobileToolBar as MobileToolbar } from "../Toolbar/SellerMobile";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router";

const menuItems = [
  {
    key: 'requirement',
    text: 'menu.requirement',
    link: '/buyer-requirement',
  },
  {
    key: 'listing',
    text: 'menu.listing',
    link: '/listing'
  },
  {
    key: 'lead',
    text: 'menu.lead.title',
    items: [
      {
        key: 'prospect',
        text: 'menu.prospect.title',
        link: '/prospect'
      },
      {
        key: 'inquiry',
        text: 'menu.inquiry.title',
        link: '/inquiry'
      },
      {
        key: 'appointment',
        text: 'menu.appointment.title',
        link: '/appointment'
      }
    ]
  },
  {
    key: 'package',
    text: 'menu.package',
    items: [
      {
        key: 'topup',
        text: 'menu.topup.title',
        link: '/topup'
      },
      {
        key: 'transfer-point',
        text: 'menu.transferPoint.title',
        link: '/transfer-point'
      },
      {
        key: 'my-package',
        text: 'menu.myPackage.title',
        link: '/my-package'
      }
    ]
  },
  {
    key: 'account',
    text: 'menu.myAccount',
    items: [
      {
        key: 'myprofile',
        text: 'menu.profile',
        link: '/myprofile'
      },
      {
        key: 'company-profile',
        text: 'menu.companyProfile',
        link: '/myprofile'
      },
      {
        key: 'affiliate-agent',
        text: 'menu.affiliateAgent',
        link: '/affiliate-agent'
      }
    ]
  }
];

export interface SellerAppBarProps {
  namespace: string;
  title: string;
  additionalAction?: React.ReactNode;
  auth: Auth;
}

export const SellerAppBar = (props: SellerAppBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

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
      case 'requirement':
      case 'listing':
      case 'prospect':
      case 'inquiry':
      case 'appointment':
      default:
        link && navigate(link);
        break;
    }
  }

  const handleOnClose = () => {
    window.location.href = `${process.env.REACT_APP_DOMAIN}`;
  }

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar
      namespace={props.namespace}
      logoPath={logoPath}

      menuItems={{
        auth: menuItems,
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
      onClose={handleOnClose}
    />
  </AppBar>
  );
}