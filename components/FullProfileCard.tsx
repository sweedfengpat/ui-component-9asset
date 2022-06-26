import { Avatar, Grid, Link, Paper, styled, Typography } from "@mui/material";
import React from "react"

const CustomPaper = styled(Paper)({
    minHeight: '10px',
    marginTop: '15px',
    marginBottom: '20px',
    padding: '20px 20px',
});

export interface FullProfileCardProps {
    title: string;
    user: any;
}

export const FullProfileCard: React.FC<FullProfileCardProps> = (props: FullProfileCardProps) => {

    const getFirstLetter = (user: any) => {
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

    const getAvatar = () => {
        const username = getFirstLetter(props.user);
        if(username){
            return username;
        }

        return '9';
    }

    const getDisplayName = () => {
        const userInfo = props.user;
        if (userInfo) {
            if (userInfo.displayName) {
                return userInfo.displayName;
            }
        }
        return '9ASSET MEMBER'; 
    }

    const getPoint = () => {
        return '15,000'
    }

    const getMoney = () => {
        return '12,000'
    }

    return (
    <CustomPaper>
        { props.title ? (<Typography variant="h5" style={{ marginBottom: '15px' }} >{ props.title || '' }</Typography>) : (<></>) }
        <Grid container alignItems="center">
            <Grid item xs={4} md={3} lg={2}>
                <Avatar sx={{ height: 80, width: 80, margin: '10px auto' }} >{getAvatar()}</Avatar>
            </Grid>
            <Grid item xs={8} md={9} lg={10} >
                <Typography color="textPrimary" variant="subtitle1" className="profile-text">{ getDisplayName()}</Typography>
                <Typography color="primary" variant="body2">
                    { getPoint() } <span style={{ color: 'grey' }}>Points = </span>{ getMoney() } <span style={{ color: 'grey' }}>THB</span>
                </Typography>
                <Link underline="hover" color="textPrimary" variant="body2" sx={{ lineHeight: '40px' }} href="/buyer">Profile</Link>
            </Grid>
        </Grid>
    </CustomPaper>
    );
}