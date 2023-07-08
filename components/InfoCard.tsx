import { Paper, Typography } from "@mui/material";

interface InfoCardProps {
    title: string;
    value: number;
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
    >
        <Typography component="div" variant="h3" sx={{ fontWeight: '400' }} color="primary">
            { props.value }
        </Typography>
        <Typography variant="caption" component="div" sx={{ mt: 0, fontSize: '10px' }}>
            { props.title }
        </Typography>
    </Paper>
    )
}