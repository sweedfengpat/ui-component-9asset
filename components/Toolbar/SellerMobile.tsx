import { Close, Menu, NavigateBefore } from "@mui/icons-material";
import { Box, Dialog, IconButton, Slide, Toolbar, styled } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  '@media all': {
    minHeight: 48,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} timeout={300} />;
});

export interface SellerMobileToolBarProps {
  title: string;
  logoPath: string;
  isBackable?: boolean;
  additionalAction?: React.ReactNode;
  onBackRequested?: () => void;
  onClose?: () => void;
}

export const SellerMobileToolBar = (props: SellerMobileToolBarProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenuClicked = () => {
    setOpenMenu(true);
  }

  return (<>
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
    <Dialog
      open={openMenu}
      fullScreen
      TransitionComponent={Transition}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="close"
        sx={{
            position: 'absolute',
            right: 4,
            top: 4,
            color: (theme) => theme.palette.grey[500],
        }}
        onClick={() => setOpenMenu(false)}
        >
        <Close />
        </IconButton>
    </Dialog>
  </>);
}