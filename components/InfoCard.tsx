import { Box, CircularProgress, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface InfoCardProps {
    data: string;
    title: string;
    value: string | number;

    isLoading?: boolean;
    onClick?: (key: string) => void;
}

export const InfoCard = (props: InfoCardProps) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
    <Paper
        sx={{
            textAlign: 'center',
            p: 1,
            pt: 2,
            position: 'relative',
            cursor: 'pointer'
        }}
        // variant="outlined"
        elevation={1}
        onClick={() => { props.onClick && props.onClick(props.data) }}
    >
        { props.isLoading ? 
            <CircularProgress color="primary" size={isMobile ? 21 : 38 } /> :
            <Typography
                component="div"
                variant="h3"
                sx={{ 
                    fontWeight: '400',
                    color: '#f4762a',
                    fontSize: { xs: '24px', sm: '40px' }
                }}>
                { `${props.value || ''}` }
            </Typography>
        }
        <Typography variant="caption" component="div" sx={{ mt: 0, fontSize: { xs: '10px', sm: '14px' } }}>
            { props.title }
        </Typography>
    </Paper>
    )
}