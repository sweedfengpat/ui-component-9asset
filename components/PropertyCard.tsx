import React from "react";
import { Grid, Paper, Box, IconButton, Button, styled, MenuProps, Menu, MenuItem, alpha, ImageListItem, PaperProps, Card, CardContent, CardActions, Chip, Typography, Dialog, Slide, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { WithTranslationProps } from "react-i18next";
import { AutoGraph, Ballot, CalendarTodayOutlined, DeleteForeverOutlined, Edit, EditOutlined, KeyboardArrowDown, PriceChangeOutlined, RocketLaunch, VisibilityOffOutlined } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={1}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        paddingTop: 0,
    },
    '& .MuiMenu-list': {
        padding: '2px 0',
    },
    '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
    },
}));

const PricingContainer = styled((props: PaperProps) => (
    <Card
        elevation={0}
        variant="outlined"
        {...props}
        sx={{ width: '100%', background: '#fafafa', alignContent: 'space-between', height: '250px' }} 
          
    />
))
(({ theme }) => ({
    '& .MuiPaper-root': {
        background: '#efefef'
    }
}));

const DetailContainer = styled((props: PaperProps) => (
    <Card
        elevation={0}
        {...props}
        sx={{ width: '100%', alignContent: 'space-between', height: '250px' }} 
          
    />
))
(({ theme }) => ({
    
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface PropertyCardProps extends WithTranslationProps {

}

export interface PropertyCardStates {
    anchorEl: HTMLElement | null,
    priceDialog: boolean;
}

export default class PropertyCard extends React.Component<PropertyCardProps, PropertyCardStates> {
    state = {
        anchorEl: null,
        priceDialog: false
    }

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handlePriceChange = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ priceDialog: true });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    handleBoost = () => {
        
        this.handleClose()
    }

    handleBoosting = () => {
        
        this.handleClose()
    }

    handleEdit = () => {
        
        this.handleClose()
    }

    handleView = () => {
        this.handleClose()
    }

    handleOffline = () => {
        this.handleClose()
    }

    handleDelete = () => {
        this.handleClose()
    }

    renderPriceDialog = () => {
        return (
        <Dialog
            open={this.state.priceDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => { this.setState({ priceDialog: false }) }}
            sx={{ p: 1 }}
        >
            <DialogTitle sx={{ padding: '10px' }}><Typography variant="h4">Edit Price</Typography></DialogTitle>
            <DialogContent>
                <List sx={{ width: '100%', maxWidth: '400px' }}>
                <ListItem
                        disablePadding
                    >
                        <ListItemIcon sx={{ width: '42px' }}>
                            <Checkbox
                                edge="start"
                                // checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                sx={{ margin: 0 }}
                                // inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <TextField 
                            label="Sell"
                            fullWidth
                            size="small"
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><span style={{ fontSize: '0.7em' }}>THB</span></InputAdornment>
                            }}
                        />
                    </ListItem>
                    <ListItem
                        disablePadding
                    >
                        <ListItemIcon sx={{ width: '42px' }}>
                            <Checkbox
                                edge="start"
                                // checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                sx={{ margin: 0 }}
                                // inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <TextField 
                            label="Rent"
                            fullWidth
                            size="small"
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><span style={{ fontSize: '0.7em' }}>THB</span></InputAdornment>
                            }}
                        />
                    </ListItem>
                </List>
                {/* <Grid container spacing={2} rowSpacing={1} sx={{ width: '400px' }}>
                    <Grid item xs="auto" sx={{ p: 0 }}>
                        <Checkbox value={true} sx={{ }}></Checkbox>
                    </Grid>
                    <Grid item xs>
                        
                        
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Rent"
                            fullWidth
                            size="small"
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><span style={{ fontSize: '0.7em' }}>THB</span></InputAdornment>
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Lease"
                            fullWidth
                            size="small"
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><span style={{ fontSize: '0.7em' }}>THB</span></InputAdornment>
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Mortage"
                            fullWidth
                            size="small"
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><span style={{ fontSize: '0.7em' }}>THB</span></InputAdornment>
                            }} />
                    </Grid>
                
                </Grid> */}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size="small" onClick={() => { this.setState({ priceDialog: false }); }} >Cancel</Button>
                <Button variant="contained" size="small" disableElevation onClick={() => { this.setState({ priceDialog: false }); }} >Save</Button>
            </DialogActions>
        </Dialog>
        )
    }

    renderMenu = () => {
        const open = Boolean(this.state.anchorEl);
        return (
        <StyledMenu
            MenuListProps={{
                'aria-labelledby': 'property-action-button'
            }}
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={this.handleClose}
        >
            <MenuItem onClick={this.handleBoost} disableRipple>
                <RocketLaunch />
                Boost/Stop
            </MenuItem>
            <MenuItem onClick={this.handleBoosting} disableRipple>
                <AutoGraph />
                Boosting
            </MenuItem>
            <MenuItem onClick={this.handleEdit} disableRipple>
                <Edit />
                Edit
            </MenuItem>
            <MenuItem onClick={this.handleView} disableRipple>
                <Ballot />
                View
            </MenuItem>
            <MenuItem onClick={this.handleOffline} disableRipple>
                <VisibilityOffOutlined />
                Offline
            </MenuItem>
            <MenuItem onClick={this.handleDelete} disableRipple>
                <DeleteForeverOutlined />
                Delete
            </MenuItem>
        </StyledMenu>
        );
    }

    render(): React.ReactNode {
        const open = Boolean(this.state.anchorEl);
        return (
        <Paper style={{ width: '100%', margin: '5px' }} variant="outlined" elevation={0}>
            <div style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', p: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <ImageListItem
                                    component={'img'}
                                    src='https://cdn.9asset.com/download/property_gallery/67414/property_Images_201120201605862197722_full.jpg'
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <PricingContainer>
                                    <CardContent sx={{ height: '200px', padding: '10px 8px' }}>
                                        <div style={{ display: 'table', padding: '10px' }}>
                                            <div style={{ display: 'table-row', padding: '10px', marginBottom: '10px' }}>
                                                <div style={{ display: 'table-cell', minWidth: '70px', paddingLeft: '5px' }}>
                                                    <span style={{ fontWeight: 600 }}>Sell</span>
                                                </div>
                                                <div style={{ display: 'table-cell' }}>
                                                    <span style={{ fontWeight: 400 , color: 'rgb(244, 118, 42)' }}>9,000,000 บาท</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'table-row', padding: '10px' }}>
                                                <div style={{ display: 'table-cell', minWidth: '70px', paddingLeft: '5px' }}>
                                                    <span style={{ fontWeight: 600 }}>Rent</span>
                                                </div>
                                                <div style={{ display: 'table-cell' }}>
                                                    <span style={{ fontWeight: 400, color: 'rgb(244, 118, 42)' }}>350,000 บาท</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'table-row', padding: '10px' }}>
                                                <div style={{ display: 'table-cell', minWidth: '70px', paddingLeft: '5px' }}>
                                                    <span style={{ fontWeight: 600 }}>Lease</span>
                                                </div>
                                                <div style={{ display: 'table-cell' }}>
                                                    <span style={{ fontWeight: 400, color: 'rgb(244, 118, 42)' }}>5,000,000 บาท</span>
                                                </div>
                                            </div>
                                        </div>
                                            
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px 4px 4px', m: 0, height: '24px' }}>
                                        <Box>
                                            <Chip label={'20-01-2022'} size="small" variant="outlined" icon={<CalendarTodayOutlined />} sx={{ padding: '5px' }} />
                                        </Box>  
                                        <Box>
                                            <IconButton
                                                size="small"
                                                sx={{ border: '1px solid', borderRadius: '5px', padding: '0' }}
                                                onClick={this.handlePriceChange}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Box>  
                                    </CardActions>
                                </PricingContainer>
                            </Grid>
                            <Grid item xs={6}>
                                <DetailContainer>
                                    <CardContent sx={{ height: '205px', padding: '5px 8px 10px 8px' }}>
                                        <div style={{ display: 'block' }}>
                                            <span style={{ color: '#f4762a', fontWeight: 800, fontSize: '1.2em' }}>ขาย คอนโด : CM03596 ขายดาวน์ ขาดทุน คอนโด มอนเต้ พระราม 9</span>
                                        </div>
                                        <div style={{ display: 'block' }}>
                                            <span style={{ color: '#000000', fontWeight: 400, fontSize: '.8em' }}>813 รามคำแหง 12 ถนนรามคำแหง จ.กรุงเทพฯ</span>
                                        </div>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px 4px 4px', m: 0, height: '24px' }}>
                                        <Box>
                                            <p style={{ fontSize: '.9em'}}>Status: <span style={{ color: 'green', fontWeight: 600 }}>Online</span></p>
                                        </Box>  
                                        <Box>
                                        <Button
                                                id="property-action-button"
                                                aria-controls={ open ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={ open ? 'true' : undefined}
                                                variant="outlined"
                                                endIcon={<KeyboardArrowDown />}
                                                disableElevation
                                                size="small"
                                                onClick={this.handleClick}
                                                sx={{ height: '32px', m: 'auto', lineHeight: '18px' }}
                                            >Manage</Button>
                                        </Box>  
                                    </CardActions>
                                </DetailContainer>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                { this.renderMenu() }
                { this.renderPriceDialog() }
            </div>
        </Paper>
        );
    }
}