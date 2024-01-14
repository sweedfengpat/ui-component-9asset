import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

import './ProfileCard.less';
import { UserInfo } from "../store/users/reducer";

interface ProfileCardProps {
    user: UserInfo | null;
}

export class ProfileCard extends React.Component<ProfileCardProps, any> {

  getFirstLetter = (user: any) => {
    const userInfo = user;
    if (userInfo) {
      if (userInfo.displayName) {
        return userInfo.displayName[0];
      } else if (userInfo.email) {
        return (userInfo.email as string)[0].toUpperCase();
      }
    }
    return undefined;
  }

  getAvatar = () => {
    const username = this.getFirstLetter(this.props.user);
    if(username){
        return username;
    }

    return '9';
  }

  getPhoneNo = () => {
      
    if(this.props.user){
      return this.props.user?.phoneNumber || '';
    }

    return null;
  }

  render() {
    const avatar = this.getAvatar();
    const phoneNo = this.getPhoneNo();

    return (
    <div className="profile-container">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          mt: 3
        }}
      >
        <Avatar style={{ height: 60, width: 60, marginBottom: 10 }} >{avatar}</Avatar>
        <Typography color="textPrimary" variant="subtitle1" className="profile-text">{this.props.user?.displayName || '9asset User'}</Typography>
        { phoneNo ? <Typography color="textPrimary" variant="body2" className="profile-text">{phoneNo}</Typography> : <></> }
        <Typography color="textPrimary" variant="body2" className="profile-text">{this.props.user?.email || ''}</Typography>
      </Box>
    </div>
    );
  }
}

export default ProfileCard;