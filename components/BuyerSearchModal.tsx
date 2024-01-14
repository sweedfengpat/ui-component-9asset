import { Close, SearchOutlined } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Slide, TextField, styled, useTheme } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect } from "react"

const DownTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} timeout={300} />;
});

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
    //     // borderColor: theme.palette.primary.main,
    //     background: '#f8e8de',
    }
}));

export interface BuyerSearchModalProps {
    open: boolean;
    onSearchRequested?: (payload: any) => void;
    onClose?: () => void;
}


export const BuyerSearchModal = ({ open, onSearchRequested, onClose }: BuyerSearchModalProps) => {
    const theme = useTheme();

    useEffect(() => {
        window.addEventListener('message', onMessageReceived, false);
        return () => {
            window.removeEventListener('message', onMessageReceived);
        }
    }, []);

    const onMessageReceived = (e: MessageEvent) => {
        // if (e.origin !== "https://my.9asset.com") {
        //     return;
        // }
        
        try {
            const { target, type, payload } = e.data;
            if (target === 'buyerSearchModal') {
                if (type === 'mobileSearch-goto') {
                    onSearchRequested?.(payload);
                }
                if (type === 'mobileSearch-goto-close') {
                    onClose?.();
                }
            }
        } catch {

        }
    }

    return (
    <Dialog
        open={open}
        fullScreen
        TransitionComponent={DownTransition}
    >

        <Box
            component={"iframe"}
            src={`${process.env.NEXT_PUBLIC_SEARCH_URL_BASE}/mobile/buyer?isSubApp=true&target=buyerSearchModal`}
            sx={{ height: '100%' }}
        >

        </Box>
    </Dialog>
    )
}