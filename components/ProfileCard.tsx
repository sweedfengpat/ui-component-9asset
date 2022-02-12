import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

import './ProfileCard.less';

export class ProfileCard extends React.Component {
    render() {
        return (
            <div className="profile-container">
                <Box sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    mt:1
                    }}
                >
                    <Avatar style={{ height: 75, width: 75, marginBottom: 10 }} >TS</Avatar>
                    <Typography color="textPrimary" variant="subtitle1" className="profile-text">Theeraphon Samathi</Typography>
                    <Typography color="textPrimary" variant="body2" className="profile-text">085 472 9223</Typography>
                    <Typography color="textPrimary" variant="body2" className="profile-text">theeraphon.sa@gmail.com</Typography>
                </Box>
            </div>
        );
    }
}

export default ProfileCard;