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

export const LoginModal = ({ open, onLoginClosed }: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const iFrameRef = useRef<HTMLIFrameElement|null>(null);

    const onLoginMessage = (e: MessageEvent) => {
        if (e.origin !== 'http://localhost:8080') {
            return;
        }

        if (e.data === 'loged-in') {
            onLoginClosed?.();
        } else {
            
        }
    }

    useEffect(() => {
        window.addEventListener('message', onLoginMessage, false);
    }, []);

    useEffect(() => {
        if (iFrameRef.current) {
            iFrameRef.current.addEventListener('onload', (e) => {
                console.log(iFrameRef.current?.contentWindow);
            })
        }
    }, [iFrameRef?.current])
    
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
                onClick={() => onLoginClosed?.()}
                >
                <Close />
            </IconButton>
            <Box
                title="search-component"
                ref={iFrameRef}
                component="iframe"
                src={`${'http://localhost:8080'}/login?isHeadlessMode=true`}
                style={{ 
                    border: 'none',
                    height: isMobile ? '100%' : '570px',
                    width: isMobile ? '100%': '100%'
                }} 
            />
        </Dialog>
    );
    
}