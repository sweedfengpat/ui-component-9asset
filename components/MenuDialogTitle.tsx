import { Close } from "@mui/icons-material";
import { DialogTitle, IconButton } from "@mui/material";
import theme from "../../theme";

export interface MenuDialogTitleProps {
    id: string;
    children?: React.ReactNode,
    onClose?: () => void;
}

export const MenuDialogTitle = (props: MenuDialogTitleProps) => {

    const closeButton = (
    <IconButton 
        sx={{ position: 'absolute', right: 8, top: 0, color: (theme) => theme.palette.grey[500] }}
        onClick={() => { props.onClose && props.onClose() }}
    >
        <Close />
    </IconButton>);

    return (
    <DialogTitle sx={{ p: 1 }}>
        { props.children }
        { props.onClose ? closeButton : null }
    </DialogTitle>
    );
}