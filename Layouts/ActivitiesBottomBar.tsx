import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { CalendarMonthOutlined, ChatOutlined, NearMeOutlined, Person2Outlined, Phone } from "@mui/icons-material";

type MenuKey = 'call' | 'appointment' | 'inquiry' | 'favorite' | 'navigate';

export interface ActivitiesButtomBarProps {
  onMeRequested?: () => void;
  onRequirementClicked?: () => void;
  onMenuClicked: (key: MenuKey) => void;
}

export const ActivitiesBottomBar = (props: ActivitiesButtomBarProps) => {

  const handleMenuClicked = (key: MenuKey) => {
    props.onMenuClicked(key);
  }

  return (<>
  <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 450 }} elevation={6}>
    <BottomNavigation showLabels>
      <BottomNavigationAction
        // sx={{ pl: 4 }}
        label="Require"
        icon={<ChatOutlined />}
        onClick={() => { props.onRequirementClicked?.() }}
      />
      <BottomNavigationAction
        label={'Call'} 
        icon={
          <Phone />
        }
        onClick={() => handleMenuClicked('call')}
      />
      {/* <BottomNavigationAction
     
        label={'View'}
        icon={<CalendarMonthOutlined />}
        onClick={() => handleMenuClicked('appointment')}
      /> */}
      <BottomNavigationAction
      
        label={'Go'}
        icon={<NearMeOutlined />}
        onClick={() => handleMenuClicked('navigate')}
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