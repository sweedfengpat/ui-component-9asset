import { Box, Typography } from "@mui/material";
import logo from '../../assets/images/9asset-logo.png';
 
export const NotFound = () => {
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
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        404 
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '16px' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
      
  </Box>);
}

export default NotFound;