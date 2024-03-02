import { Close } from "@mui/icons-material";
import { Box, Dialog, IconButton, Slide, useMediaQuery, useTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useRef } from "react";

const UpTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RightTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
  ) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export interface LoginModalProps {
  open: boolean;
  mode: 'login' | 'register';
  onLoginClosed?: (loggedIn?: boolean) => void;
}

export const LoginModal = ({ open, mode, onLoginClosed }: LoginModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const iFrameRef = useRef<HTMLIFrameElement|null>(null);

  const onLoginMessage = (e: MessageEvent) => {
    if (e.origin !== process.env.NEXT_PUBLIC_URL_BASE) {
      return;
    }
    
    try {
      console.log('login message');
      const payload = e.data;
      if (payload.source === 'login' && (payload.type === 'logged-in' || payload.type === 'registered')) {
        onLoginClosed?.(true);
      } else {
          
      }
    } catch {
        
    }
  }

    useEffect(() => {
      window.addEventListener('message', onLoginMessage);
    }, []);

    useEffect(() => {
      if (iFrameRef.current) {
        iFrameRef.current.addEventListener('onload', (e) => {
          console.log(iFrameRef.current?.contentWindow);
        })
      }
    }, [iFrameRef?.current]);

    const handleClose = () => {
      window.postMessage({
        source: 'login-modal',
        target: '9assetApp',
        type: 'cancelled'
      }, '*');
      window.dispatchEvent(new CustomEvent('login-cancelled'));
      onLoginClosed?.();
    }
    
    return ( 
    <Dialog
      open={open}
      fullWidth={true}
      fullScreen={isMobile}
      sx={{
        '&': {
          top: isMobile ? '0px' : '0px'
        },
      }}
      TransitionComponent={ isMobile ? RightTransition : UpTransition}
      maxWidth="xs"
    >
            
      <IconButton
        edge="start"
        color="inherit"
        aria-label="close"
        sx={{
          position: 'absolute',
          right: 4,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={handleClose}
      >
        <Close />
      </IconButton>
      <Box
        title="search-component"
        ref={iFrameRef}
        component="iframe"
        src={`${process.env.NEXT_PUBLIC_LOGIN_URL_BASE || process.env.REACT_APP_LOGIN_BASE_URL}${mode === 'register' ? '/register' : ''}?isHeadlessMode=true`}
        style={{ 
          border: 'none',
          height: isMobile ? '100%' : '590px',
          width: isMobile ? '100%': '100%'
        }} 
      />
        </Dialog>
    );
    
}