import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { CalendarMonthOutlined, ChatOutlined, NearMeOutlined, Person2Outlined, Phone } from "@mui/icons-material";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getUser } from "../../utils/utils";

type MenuKey = 'call' | 'appointment' | 'inquiry' | 'favorite' | 'navigate';

export interface ActivitiesButtomBarProps {
  onMeRequested?: () => void;
  onRequirementClicked?: () => void;
  onMenuClicked: (key: MenuKey, option?: any) => void;
}

export const ActivitiesBottomBar = (props: ActivitiesButtomBarProps) => {

  const [action, setAction] = useState<string|null>(null);

  const handleMenuClicked = (key: MenuKey, option?: any) => {
    props.onMenuClicked(key, option);
  }

  const handleLoggedIn = () => {
    window.removeEventListener('logged-in', handleLoggedIn);
    window.removeEventListener('login-cancelled', handleLoginCancelled);
    if (action === 'require') {
      props?.onRequirementClicked();
    } else if(action === 'call') {
      handleMenuClicked('call', { reload: true });
    } else if (action === 'navigate') {
      handleMenuClicked('navigate', { reload: true });
    }
  }

  const handleLoginCancelled = () => {
    setAction(null);
    window.removeEventListener('logged-in', handleLoggedIn);
    window.removeEventListener('login-cancelled', handleLoginCancelled);
  }

  return (<>
  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1001 }} elevation={6}>
    <BottomNavigation showLabels>
      <BottomNavigationAction
        // sx={{ pl: 4 }}
        label="Require"
        icon={<ChatOutlined />}
        onClick={() => {
          const user = getUser();
          if (!user?.id) {
            setAction('require');
            const loginRequested = new CustomEvent('loginrequested', { detail: { reload: false } });
            window.addEventListener('logged-in', handleLoggedIn);
            window.addEventListener('login-cancelled', handleLoginCancelled);
            window.dispatchEvent(loginRequested);
          } else {
            props?.onRequirementClicked();
          }
        }}
      />
      <BottomNavigationAction
        label={'Call'} 
        icon={
          <Phone />
        }
        onClick={() => {
          const user = getUser();
          if (!user?.id) {
            setAction('call');
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
      
        label={'Go'}
        icon={<NearMeOutlined />}
        onClick={() => {
          const user = getUser();
          if (!user?.id) {
            setAction('navigate');
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
        // sx={{ pr: 4 }}
        label="Me" icon={<Person2Outlined />}
        onClick={() => { props.onMeRequested?.(); }}
      />
    </BottomNavigation>
  </Paper>
  </>);
}