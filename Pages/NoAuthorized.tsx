import { Box, Typography } from "@mui/material";
import logo from '../../assets/images/9asset-logo.png';
import { useEffect, useState } from "react";
 
export const NoAuthorized = () => {
  const [countDown, setCountDown] = useState<number>(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = countDown - 1;
      setCountDown(current);
      
      if (current < 0) {
        window.location.href = process.env.REACT_APP_LOGIN_BASE_URL || 'https://www.9asset.com';
      }
    }, 1000)

    return () => {
      clearInterval(interval);
    };
  });

  return (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      paddingX: '20px'
    }}
  >
    <Box component={"img"} src={logo} sx={{ width: '100px' }} >
    </Box>
    <Box  sx={{ p: 2}}>
      <Typography variant="h1" sx={{ textAlign: 'left' }}>
        403
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'left', fontSize: '16px' }}>
        Forbidden!, You are not allowed!
      </Typography>
      <Typography variant="caption"sx={{ textAlign: 'center' }} >
        { `This page will be redirected to default page in ${countDown}.` }
      </Typography>
    </Box>
      
  </Box>);
}

export default NoAuthorized;