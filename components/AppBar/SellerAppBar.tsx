import { AppBar, IconButton, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { DesktopToolbar } from "../Toolbar/Desktop";

import logoPath from '../../assets/images/9asset-logo.png';
import { SellerMobileToolBar as MobileToolbar } from "../Toolbar/SellerMobile";
import { Auth, User, onAuthStateChanged } from "firebase/auth";

import { SellerBottomBar as BottomBar } from '../../Layouts/SellerButtomBar';
import { MeMenu } from "../../components/Menu/MeMenu";
import logo from '../../assets/images/9asset-logo.png';
import { Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { namespaces } from "../../../i18n/i18n.constants";
import { UserInfo } from "../../store/users/reducer";
import { i18n } from "../../../i18n/i18n";

export const menuItems = [
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
  auth: Auth;
  user: UserInfo | null;

  onSearchClicked?: () => void;
}

export const SellerAppBar = (props: SellerAppBarProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [user, setUser] = useState<User|null>(null);

  const [isMeMenuOpened, setIsMeMenuOpened] = useState<boolean>(false);

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

  const handleMeMenuRequested = () => {
    navigate('/');
    // if (user) {
    //   navigate('/');
    // } else {
    //   setIsMeMenuOpened(true);
    // }
  }

  const handleOnClose = () => {
    if (location.pathname === '/') {
      const language = i18n.language && i18n.language !== 'th' ? i18n.language : '';
      window.location.href = `${process.env.REACT_APP_DOMAIN}/${language}`;
    } else {
      navigate(`/`);
    }
  }

  const handleSearchClicked = () => {
    props.onSearchClicked?.();
  }

  const handleBackRequested = () => {
    navigate('/');
  }

  const getAdditionalActions = () => {
    if (['/listing', '/buyer-requirement'].includes(location.pathname)) {
      return (
      <IconButton onClick={handleSearchClicked}>
        <Search fontSize="large" color="primary" />
      </IconButton>
      );
    }
    return (<></>);
  }

  const getTitle = () => {
    const title = new Map([
      ['/buyer-requirement', 'menu.buyerRequirement'],
      ['/listing', 'menu.listing'],
      ['/prospect', 'menu.prospect.title'],
      ['/appointment', 'menu.appointment.title'],
      ['/inquiry', 'menu.inquiry.title']
    ]);
    if (location.pathname === '/property') {
      return t(query.has('id') ? 'header.edit' : 'header.new', { ns: namespaces.pages.property });
    }
    if (title.has(location.pathname)) {
      return t(title.get(location.pathname) as string)
    }
    return props.title;
  }

  return (<>
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>
    <DesktopToolbar
      namespace={props.namespace}
      logoPath={logoPath}

      menuItems={{
        auth: menuItems,
        nonauth: []
      }}

      user={user}
      userInfo={props.user}

      hideSellerCenter={true}
      onProfileMenuClick={handleProfileMenuClicked}
      onLanguageChanged={(lng) =>  { i18n.changeLanguage(lng); }}
    />
    <MobileToolbar
      title={getTitle()}
      logoPath={logoPath}
      isBackable={location.pathname !== '/'}
      additionalAction={getAdditionalActions()}
      onBackRequested={handleBackRequested}
      onClose={handleOnClose}
    />
  </AppBar>
  <BottomBar
    onMeRequest={handleMeMenuRequested}
  />
  <MeMenu
    user={user}
    userInfo={props.user}
    open={isMeMenuOpened}
    logo={logo}
    items={menuItems}
    onClose={() => { setIsMeMenuOpened(false); }}
  />
  </>);
}