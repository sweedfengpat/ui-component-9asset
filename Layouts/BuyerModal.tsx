import { Box, Dialog, DialogContent, Slide, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { TransitionProps } from "@mui/material/transitions";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface BuyerMenuProps {
  open: boolean;
  path?: string | null;
  onClose?: () => void;
}



export const BuyerModal = (props: BuyerMenuProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onMessageReceived = (e: MessageEvent) => {
    const { source, type } = e.data;
    if (source === 'buyer' && type === 'close-window') {
      props.onClose?.();
    }
  };

  useEffect(() => {
    window.addEventListener('message', onMessageReceived);
    return () => {
      window.removeEventListener('message', onMessageReceived);
    }
  }, []);

  return (<>
  <Dialog
    open={props.open}
    fullScreen={isMobile}
    TransitionComponent={Transition}
    scroll="paper"
  >
    <Box
      component="iframe"
      src={`${process.env.NEXT_PUBLIC_BUYER_URL}${props.path || ''}`}
      sx={{ width: '100vw', height: '100vh', overflow: 'unset' }}
    />
  </Dialog>
  </>);
}