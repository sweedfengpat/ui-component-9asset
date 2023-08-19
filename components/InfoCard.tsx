import { Paper, Typography } from "@mui/material";
import React from "react";

interface InfoCardProps {
    data: string;
    title: string;
    value: number;

    onClick?: (key: string) => void;
}

export const InfoCard = (props: InfoCardProps) => {

    return (
    <Paper
        sx={{
            textAlign: 'center',
            p: 1,
            pt: 2,
            position: 'relative'
        }}
        // variant="outlined"
        elevation={1}
        onClick={() => { props.onClick && props.onClick(props.data) }}
    >
        <Typography component="div" variant="h3" sx={{ fontWeight: '400', color: '#f4762a' }}>
            { props.value }
        </Typography>
        <Typography variant="caption" component="div" sx={{ mt: 0, fontSize: '10px' }}>
            { props.title }
        </Typography>
    </Paper>
    )
}