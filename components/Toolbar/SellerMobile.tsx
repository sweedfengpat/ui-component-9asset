import { Menu, NavigateBefore } from "@mui/icons-material";
import { Box, IconButton, Toolbar, styled } from "@mui/material";

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  '@media all': {
    minHeight: 48,
  },
}));

export interface SellerMobileToolBarProps {
  title: string;
  logoPath: string;
  isBackable?: boolean;
  additionalAction?: React.ReactNode;
  onBackRequested?: () => void;
  onClose?: () => void;
}

export const SellerMobileToolBar = (props: SellerMobileToolBarProps) => {
  const handleMenuClicked = () => {

  }

  return (
    <StyledToolbar
      sx={{ display: { xs:'flex', sm: 'none'},
      paddingLeft: { xs: '0px', sm:'16px' },
      paddingRight: props.onClose ? '50px' : '8px' }}
    >
      <Box
        component="div" 
        sx={{ 
          whiteSpace: 'nowrap', 
          display: 'flex', 
          alignItems: 'center', 
          verticalAlign: 'middle',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box component="div" sx={{ display: 'inline-flex', alignItems: 'center' }}>
          {
            props.isBackable ? (
            <IconButton 
              sx={{ }}
              color="primary"
              onClick={() => { props.onBackRequested?.() }}
            >
              <NavigateBefore />
            </IconButton>) : (
            <Box component={"img"} src={props.logoPath} sx={{ height: '40px', pl: 1 }} alt="'9Asset Logo'" />
            )
          }
          <Box component="span" sx={{ pl: 1, paddingTop: '0px', fontWeight: '600', color: 'black' }}>{props.title}</Box>
        </Box>

        <div style={{ flexGrow: 1 }}></div>
        <Box component={"div"} sx={{ display: { xs: 'flex', sm: 'none' }}}>
          <IconButton onClick={handleMenuClicked}>
            <Menu fontSize="large" color="primary" />
          </IconButton>
        </Box>
      </Box>
    </StyledToolbar>
  );
}