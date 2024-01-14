import { Box, Typography } from "@mui/material";
import logo from '../../assets/images/9asset-logo.png';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
 
export const NotFound = () => {

  const navigate = useNavigate();
  const [countDown, setCountDown] = useState<number>(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = countDown - 1;
      setCountDown(current);
      
      if (current < 0) {
        navigate('/');
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
      
      paddingX: '20px'
    }}
  >
    <Box component={"img"} src={logo} sx={{ width: '100px' }} >
    </Box>
    <Box  sx={{ p: 2, textAlign: 'center' }} >
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        404 
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '16px' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Typography variant="caption"sx={{ textAlign: 'center' }} >
        { `This page will be redirected to default page in ${countDown}.` }
      </Typography>
    </Box>
    
      
  </Box>);
}

export default NotFound;