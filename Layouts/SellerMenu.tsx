import { useState } from "react";
import { ContextMenu } from "./ContextMenuLayout"
import { Box, IconButton, Paper } from "@mui/material";
import { AppsOutlined, Menu, MenuOpen } from "@mui/icons-material";


interface SellerMenuProps {
    open: boolean;
    onClose?: () => void;
}

export const SellerMenu = (props: SellerMenuProps) => {

    const [level, setLevel] = useState(0);
    
    const getMenuDetail = () => {
        return (
        <Paper>

        </Paper>
        );
    }

    return (
    <ContextMenu
        level={level}
        title={"Seller Center"}
        additionalAction={
        <Box>
            <IconButton><AppsOutlined /></IconButton>
            <IconButton><Menu /></IconButton>
        </Box>
        }
        open={props.open} 
        onClose={() => props.onClose?.() }
    >
        <Paper elevation={0} sx={{ minHeight: '100%', p: 2 }}>
            { getMenuDetail() }
        </Paper>
    </ContextMenu>
    )
}