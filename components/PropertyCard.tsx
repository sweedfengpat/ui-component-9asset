import React from "react";
import { Grid, Paper, Box, IconButton, Button, styled, MenuProps, Menu, MenuItem, alpha, ImageListItem, PaperProps, Card, CardContent, CardActions, Chip, Typography, Dialog, Slide, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, DialogContentText } from "@mui/material";
import { WithTranslationProps } from "react-i18next";
import { AutoGraph, Ballot, CalendarTodayOutlined, DeleteForeverOutlined, Edit, EditOutlined, HighlightOffOutlined, KeyboardArrowDown, PriceChangeOutlined, RocketLaunch, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import defaultImage from "../assets/images/no_image.jpeg";
import { PostStatus, Status } from "../../consts";
import dayjs from "dayjs";

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

export const PriceDialogTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialogTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

const Price = (props: { type: string, value: number | undefined, unit: string}) => {
    return (
    <div style={{ display: 'table-row', padding: '10px', marginBottom: '10px' }}>
        <div style={{ display: 'table-cell', minWidth: '70px', paddingLeft: '5px'}}>
            <span style={{ fontWeight: 600 }}>{props.type}</span>
        </div>
        <div style={{ display: 'table-cell', paddingLeft: '10px' }}>
            <span style={{ fontWeight: 400, color: 'rgb(244, 118, 42)'}}>{ props.value || '-' }</span>
            <span style={{ fontWeight: 400, fontSize: '0.9em', marginLeft: '5px' }}>{props.unit}</span>
        </div>
    </div>
    );
}

export interface PropertyCardProps extends WithTranslationProps {
    info: any;
    type: 'projects' | 'properties';
    onPriceChangeRequest: (id: string) => void;
    onEditRequest?: (id: string) => void;
    onDeleteRequest?: (id: string) => void;
    onOnlineRequest?: (id: string) => void;
    onOfflineRequest?: (id: string) => void;
    onViewRequest?: (id: string) => void;

    onBoostingRequest?: (id: string) => void;
    onStopBoostingRequest?: (id: string) => void;
} 

export interface PropertyCardStates {
    anchorEl: HTMLElement | null;
    openConfirmDialog: boolean;
    confirmDialogMode: 'Delete' | 'Offline' | 'Online' | null;
}

export default class PropertyCard extends React.Component<PropertyCardProps, PropertyCardStates> {
    state = {
        anchorEl: null,
        openConfirmDialog: false,
        confirmDialogMode: null
    }

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handlePriceChange = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.onPriceChangeRequest) {
            this.props.onPriceChangeRequest(this.props.info.id);
        }
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    handleBoost = () => {
        
        this.handleClose()
    }

    handleStopBoost = () => {
        
        this.handleClose()
    }

    handleBoosting = () => {
        
        this.handleClose()
    }

    handleEdit = () => {
        this.handleClose();
        if (this.props.onEditRequest) {
            this.props.onEditRequest(this.props.info.id);
        }
    }

    handleView = () => {
        this.handleClose()
        if (this.props.onViewRequest) {
            this.props.onViewRequest(this.props.info.id);
        }
    }

    handleOffline = () => {
        this.handleClose();
        this.setState({ openConfirmDialog: true, confirmDialogMode: 'Offline' });
    }

    handleOnline = () => {
        this.handleClose();
        this.setState({ openConfirmDialog: true, confirmDialogMode: 'Online' });
    }

    handleDelete = () => {
        this.handleClose();
        this.setState({ openConfirmDialog: true, confirmDialogMode: 'Delete' });
    }

    handleConfirm = (status: boolean) => {
        this.setState({ openConfirmDialog: false }, () => {
            if (status) {
                if (this.state.confirmDialogMode === 'Delete' && this.props.onDeleteRequest) {
                    this.props.onDeleteRequest(this.props.info.id);
                } else if (this.state.confirmDialogMode === 'Online' && this.props.onOnlineRequest) {
                    this.props.onOnlineRequest(this.props.info.id);
                } else if (this.state.confirmDialogMode === 'Offline' && this.props.onOfflineRequest) {
                    this.props.onOfflineRequest(this.props.info.id);
                }
            }
        });
    }

    renderMenu = () => {
        const open = Boolean(this.state.anchorEl);
        const menuItem = [];
        console.log(this.props.info.isBoosting === false)

        if (this.props.info.isBoosting === true) {
            menuItem.push(
                <MenuItem key='stop-boost' onClick={this.handleStopBoost} disableRipple>
                    <HighlightOffOutlined />
                    Stop Boost
                </MenuItem>
            );
        } else {
            menuItem.push(
                <MenuItem key='boost' onClick={this.handleBoost} disableRipple>
                    <RocketLaunch />
                    Boost
                </MenuItem>
            );
        }

        menuItem.push(
            <MenuItem key="boosting" onClick={this.handleBoosting} disableRipple>
                <AutoGraph />
                Boosting
            </MenuItem>
        );

        menuItem.push(
            <MenuItem key="edit" onClick={this.handleEdit} disableRipple>
                <Edit />
                Edit
            </MenuItem>
        );

        menuItem.push(
            <MenuItem key="view" onClick={this.handleView} disableRipple>
                <Ballot />
                View
            </MenuItem>
        );

        if (this.props.info.status === PostStatus.Online) {
            menuItem.push(
                <MenuItem key="online" onClick={this.handleOffline} disableRipple>
                    <VisibilityOffOutlined />
                    Offline
                </MenuItem>
            );

        } else if (this.props.info.status === PostStatus.Offline || this.props.info.status === PostStatus.Draft) {
            menuItem.push(
                <MenuItem key="offline" onClick={this.handleOnline} disableRipple>
                    <VisibilityOutlined />
                    Online
                </MenuItem>
            );
        }

        return (
        <StyledMenu
            MenuListProps={{
                'aria-labelledby': 'property-action-button'
            }}
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={this.handleClose}
        >
            { menuItem }
            <MenuItem key="delete" onClick={this.handleDelete} disableRipple>
                <DeleteForeverOutlined />
                Delete
            </MenuItem>
        </StyledMenu>
        );
    }

    renderCoverImage(): React.ReactNode {
        const cover = (this.props.info.pictures as any[]).find(i => i.isCover === true);
        let imageUrl = undefined;
        if(!cover) {
            // From legacy db no isCover
            if(this.props.info.pictures.length > 0) {
                imageUrl = this.props.info.pictures[0]
            }
        } else {
            imageUrl = `${process.env.REACT_APP_SELLER_SERVICE_API_BASE}/${this.props.type}/${this.props.info.id}/image/${cover.url || '' }`
        }
        return <ImageListItem
                component={'img'}
                src={ imageUrl ? imageUrl : defaultImage }
                sx={{ width: 'auto', maxWidth: '100%', maxHeight: '250px', objectFit: 'cover' }}
            />;
    }

    renderStatus (): React.ReactNode {
        const status = this.props.info.status as PostStatus;
        const color = {
            [PostStatus.Draft]: 'grey',
            [PostStatus.Online]: 'green',
            [PostStatus.Offline]: 'red',
            [PostStatus.Pending]: 'red',
            [PostStatus.Deleted]: 'red',
            [PostStatus.Supend]: 'red'
        };
        return (
            <span style={{ color: color[status], fontWeight: 600, textTransform: 'capitalize' }}>{status}</span>
        );
    }

    renderDialog(): React.ReactNode {
        let message = '';
        if (this.state.confirmDialogMode === 'Delete') {
            message = `Would you like to delete the property ${this.props.info.code} ?`;
        } else if (this.state.confirmDialogMode === 'Online') {
            message = `Would you like to online the property ${this.props.info.code} ?`;
        } else if (this.state.confirmDialogMode === 'Offline') {
            message = `Would you like to offline the property ${this.props.info.code} ?`;
        }

        return (
        <Dialog open={this.state.openConfirmDialog} TransitionComponent={ConfirmDialogTransition} keepMounted 
            onClose={() => this.handleConfirm(false)}
            aria-describedby="delete-confirm-dialog-slide-description">
            <DialogTitle>{`Confirmation`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-confirm-dialog-slide-description">
                    { message }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => this.handleConfirm(false)} variant="outlined">Cancel</Button>
                <Button onClick={() => this.handleConfirm(true)} color="primary" variant="contained">Yes</Button>
            </DialogActions>
        </Dialog>
        );
    }

    render(): React.ReactNode {
        const open = Boolean(this.state.anchorEl);
        
        const created = dayjs(this.props.info.created.date).format('DD-MM-YYYY HH:mm');
        const priceDate = dayjs(this.props.info.priceAtDate).format('DD-MM-YYYY HH:mm');
        return (
        <Paper style={{ width: '100%', margin: '5px' }} variant="outlined" elevation={0} >
            <div style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', p: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3} sx={{ display: 'flex', justifyContent:'center' }}>
                                { this.renderCoverImage() }
                            </Grid>
                            <Grid item xs={3}>
                                <PricingContainer>
                                    <CardContent sx={{ height: '200px', padding: '10px 8px' }}>
                                        <div style={{ display: 'table', padding: '10px' }}>
                                            <Price type="Sell" value={this.props.info.price.sell?.value} unit="บาท" />
                                            <Price type="Rent" value={this.props.info.price.rent?.value} unit="บาท" />
                                            <Price type="Lease" value={this.props.info.price.lease?.value} unit="บาท" />
                                            <Price type="Redemption" value={this.props.info.price.redemption?.value} unit="บาท" />
                                            <Price type="Mortgage" value={this.props.info.price.mortgage?.value} unit="บาท" />
                                        </div>
                                            
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px 4px 4px', m: 0, height: '24px' }}>
                                        <Box>
                                            <Chip label={priceDate} size="small" variant="outlined" icon={<CalendarTodayOutlined />} sx={{ padding: '5px' }} />
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
                                            <span style={{ color: '#f4762a', fontWeight: 800, fontSize: '0.9em', marginRight: '5px' }}>[{this.props.info.code}]</span>
                                            <span style={{ color: '#f4762a', fontWeight: 800, fontSize: '1.2em' }}>{this.props.info.topic.th}</span>
                                        </div>
                                        <div style={{ display: 'block' }}>
                                            <span style={{ color: '#000000', fontWeight: 400, fontSize: '.8em' }}>{this.props.info.location}</span>
                                        </div>
                                        <div style={{ display: 'block' }}>
                                            { this.props.info.category?.category_Name_EN || '-' }
                                        </div>
                                    </CardContent>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px 4px 4px', m: 0, height: '24px' }}>
                                        <Box>
                                            <p style={{ fontSize: '.9em'}}>Status: { this.renderStatus() }</p>
                                        </Box>  
                                        <Box><Chip label={created} size="small" variant="outlined" icon={<CalendarTodayOutlined />} sx={{ padding: '5px' }} /></Box>
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
                {/* { this.renderPriceDialog() } */}
            </div>

            { this.renderDialog() }
        </Paper>
        );
    }
}