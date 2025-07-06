import React, { useRef } from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useMediaQuery } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getUser } from "../utils";
import { useTranslation } from "react-i18next";
import HomeIcon from "../components/Icons/HomeIcon";
import ChatBubbleIcon from "../components/Icons/ChatBubbleIcon";
import PhoneCallIcon from "../components/Icons/PhoneCallIcon";
import NavigateIcon from "../components/Icons/NavigateIcon";
import UserProfileIcon from "../components/Icons/UserProfileIcon";


type MenuKey = 'call' | 'appointment' | 'inquiry' | 'favorite' | 'navigate';

export interface ActivitiesButtomBarProps {
  onMeRequested?: () => void;
  onRequirementClicked?: () => void;
  onMenuClicked: (key: MenuKey, option?: any) => void;
}

export const ActivitiesBottomBar = (props: ActivitiesButtomBarProps) => {
  const { t } = useTranslation();
  const isSmallMobile = useMediaQuery('(max-width: 374px)');

  // const [action, setAction] = useState<string|null>(null);
  const action = useRef<string|null>(null);
  const [userInfo] = useLocalStorage('9asset.userinfo');

  const handleMenuClicked = (key: MenuKey, option?: any) => {
    props.onMenuClicked(key, option);
  }

  const handleLoggedIn = () => {
    window.removeEventListener('logged-in', handleLoggedIn);
    window.removeEventListener('login-cancelled', handleLoginCancelled);
    if (action.current === 'require') {
      props?.onRequirementClicked?.();
    } else if(action.current === 'call') {
      handleMenuClicked('call', { reload: true });
    } else if (action.current === 'navigate') {
      handleMenuClicked('navigate', { reload: true });
    }
  }

  const handleLoginCancelled = () => {
    action.current = null;
    window.removeEventListener('logged-in', handleLoggedIn);
    window.removeEventListener('login-cancelled', handleLoginCancelled);
  }

  return (<>
  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1001 }} elevation={3}>
    <BottomNavigation showLabels>
      {!isSmallMobile && (
        <BottomNavigationAction
          label={t('bottomMenu.home')}
          sx={{
            color: 'common.black',
            '& .MuiBottomNavigationAction-label': {
              fontSize: 10,
              marginTop: 0.5
            },
          }}
          icon={<HomeIcon />}
          onClick={() => {
            window.location.href = '/';
          }}
        />
      )}
      <BottomNavigationAction
        label={t('bottomMenu.require')}
        sx={{
          color: 'common.black',
          '& .MuiBottomNavigationAction-label': {
            fontSize: 10,
            marginTop: 0.5
          },
        }}
        icon={<ChatBubbleIcon />}
        onClick={() => {
          const user = getUser();
          if (!user?.id) {
            action.current = 'require';
            const loginRequested = new CustomEvent('loginrequested', { detail: { reload: false } });
            window.addEventListener('logged-in', handleLoggedIn);
            window.addEventListener('login-cancelled', handleLoginCancelled);
            window.dispatchEvent(loginRequested);
          } else {
            props?.onRequirementClicked?.();
          }
        }}
      />
      <BottomNavigationAction
        label={t('bottomMenu.contact')}
        sx={{
          color: 'common.black',
          '& .MuiBottomNavigationAction-label': {
            fontSize: 10,
            marginTop: 0.5
          },
        }}
        icon={
          <PhoneCallIcon />
        }
        onClick={() => {
          const user = getUser();
          if (!user?.id) {
            action.current = 'call';
            const loginRequested = new CustomEvent('loginrequested', { detail: { reload: false } });
            window.addEventListener('logged-in', handleLoggedIn);
            window.addEventListener('login-cancelled', handleLoginCancelled);
            window.dispatchEvent(loginRequested);
          } else {
            handleMenuClicked('call');
          }
        }}
      />
      {/* <BottomNavigationAction
     
        label={'View'}
        icon={<CalendarMonthOutlined />}
        onClick={() => handleMenuClicked('appointment')}
      /> */}
      <BottomNavigationAction
        label={t('bottomMenu.go')}
        sx={{
          color: 'common.black',
          '& .MuiBottomNavigationAction-label': {
            fontSize: 10,
            marginTop: 0.5
          },
        }}
        icon={<NavigateIcon />}
        onClick={() => {
          const user = getUser();
          if (!user?.id) {
            action.current =  'navigate';
            const loginRequested = new CustomEvent('loginrequested', { detail: { reload: false } });
            window.addEventListener('logged-in', handleLoggedIn);
            window.addEventListener('login-cancelled', handleLoginCancelled);
            window.dispatchEvent(loginRequested);
          } else {
            handleMenuClicked('navigate');
          }
        }}
      />
      <BottomNavigationAction
        label={t('bottomMenu.me')}
        sx={{
          color: 'common.black',
          '& .MuiBottomNavigationAction-label': {
            fontSize: 10,
            marginTop: 0.5
          },
        }}
        icon={<UserProfileIcon />}
        onClick={() => { props.onMeRequested?.(); }}
      />
    </BottomNavigation>
  </Paper>
  </>);
}