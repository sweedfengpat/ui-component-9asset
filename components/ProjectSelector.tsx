import { ArrowDropDown, ArrowDropUp, Close } from "@mui/icons-material";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, autocompleteClasses, AutocompleteCloseReason, AutocompleteRenderOptionState, Button, Chip, ClickAwayListener, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, ListItem, ListItemText, Paper, Popper, styled, TextField, Typography } from "@mui/material";
import React from "react";

export interface ProjectInfo {

}

export interface ProjectSelectorProps {
    id?: string;
    disabled: boolean;
    multiple: boolean;

    options: any[];

    renderInput?: (params: any) => React.ReactNode;

    onOpen?: (event: React.FocusEvent) => void;
    onAddNewItemRequested?: () => void;
    onClose?: (event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) => void;
    onChange?: (
        event: React.ChangeEvent<{}>,
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails
    ) => void;
}

export interface ProjectSelectorState {
    openPopper: boolean;
    openNewProjectDialog: boolean;
    focused: boolean;

    anchorEl: HTMLElement | null;
    inputAnchorEl: HTMLElement | null;
    selected: any | undefined;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${ theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d' }`,
    boxShadow: `0 8px 24px ${ theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)' }`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal + 2,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    zIndex: theme.zIndex.modal+2,
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 8,
            borderBottom: `1px solid  ${ theme.palette.mode === 'light' ? ' #eaecef' : '#30363d' }`,
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

interface PopperComponentProps {
    anchorEl?: any;
    disablePortal?: boolean;

    open: boolean;
}

const PopperComponent = (props: PopperComponentProps) => {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

export default class ProjectSelector extends React.Component<ProjectSelectorProps, ProjectSelectorState> {

    public static defaultProps = {
        disabled: false,
        multiple: false
    }

    constructor (props: ProjectSelectorProps | Readonly<ProjectSelectorProps>) {
        super(props);

        this.state = {
            openPopper: false,
            openNewProjectDialog: false,

            focused: false,

            anchorEl: null,
            inputAnchorEl: null,

            selected: undefined
        }
    }

    getStartAdornment = () => {
        if (this.props.disabled) {
            return undefined;
            // return (this.props.defaultValue || []).map((option, index) => {
            //     const getLabel = this.props.getOptionLabel ? this.props.getOptionLabel : (option: any) => JSON.stringify(option);
            //     return (
            //     <Chip
            //       label={getLabel(option)}
            //       size="small"
            //       onDelete={(chipToDelete: any) => this.handleChipDelete(option)}
            //     />);
            // });
        } else {
            return undefined;
            //this.props.multiple ? this.state.selected.map((option, index) => {
            //     const getLabel = this.props.getOptionLabel ? this.props.getOptionLabel : (option: any) => JSON.stringify(option);
            //     return (
            //     <Chip
            //       label={getLabel(option)}
            //       size="small"
            //       onDelete={(chipToDelete: any) => this.handleChipDelete(option)}
            //     />);
            // }) : undefined;
        }
    }

    getSelectedOption () {
        return ((this.state.selected as any[]) || []).map(item => item.project.name.TH || item.project.name.EN).join();
    }

    setAnchorEl = (anchorEl: (EventTarget & Element) | null) => {
        this.setState({ anchorEl: anchorEl as HTMLElement });
    }

    setInputAnchorEl = (anchorEl: (EventTarget & Element) | null) => {
        this.setState({ inputAnchorEl: anchorEl as HTMLElement });
    }

    handleAddNewItemRequest = () => {
        this.setState({ openNewProjectDialog: true, openPopper: false }, () => {
            if (this.props.onAddNewItemRequested) {
                this.props.onAddNewItemRequested();
            }
        });
    }

    handleClickAway = () => {
        this.setState({ openPopper: false, anchorEl: null });
    }

    handleChange = (event: React.ChangeEvent<{}>, value: string | string[] | object | object[] | null, reason: AutocompleteChangeReason, detail?: AutocompleteChangeDetails<any>) => {
        this.setState({ selected: Array.isArray(value) ? value : [value] });
        console.log(value);
        if (this.props.onChange) {
            this.props.onChange(event, value, reason, detail);
        }
    }

    handleClose = (event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) => {
        if (!this.state.openPopper || reason === 'toggleInput' || reason === 'blur') {
            return;
        }
    
        this.setState({ openPopper: false });
        if (this.state.anchorEl) {
            this.state.anchorEl.focus();
        }
        this.setAnchorEl(null);
    
        if (this.props.onClose) {
            this.props.onClose(event, reason);
        }
    }

    handleFocus = (event: React.FocusEvent) => {
        this.setState({ focused: true });
        this.setAnchorEl(this.state.inputAnchorEl);
        this.handleOpen(event);
    }

    handleOpen = (event: React.FocusEvent) => {
        if (this.state.openPopper) {
            return;
        }
        this.setState({ openPopper: true }, () => {  console.log(this.state.openPopper); });
        if (this.props.onOpen !== undefined) {
            this.props.onOpen(event);
        }
    }

    handleDelete = (event: React.MouseEvent) => {
        this.setState({ selected: [] });
        if (this.props.onChange) {
            this.props.onChange(event, null, 'clear');
        }
    }

    renderNewProjectDialog = () => {
        const t = (value: string) => value;
        return (
        <Dialog
            open={this.state.openNewProjectDialog}
            disableEnforceFocus
            onClose={() => { this.setState({ openNewProjectDialog: false }) }}
        >
            <DialogTitle id="form-dialog-title">
                <Typography variant="h5" >{t('Add a new Project')}</Typography>
            </DialogTitle>
            <DialogContent sx={{ padding: '30x' }}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth 
                            label={t('project_name_thai')}
                         />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            variant="outlined"
                            size="small"
                            fullWidth
                            label={t('project_name_eng')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                       
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        );
    }

    renderInput  = (params: any) => {
        return <TextField {...params} fullWidth size="small" />
    }

    renderDeleteButton () {
        const selected = this.state.selected && this.state.selected.length > 0;
        if (selected) {
            return (<IconButton size="small" onClick={this.handleDelete}><Close /></IconButton>);
        } else {
            return (<></>);
        }
    }

    renderPopper = () => {
        return (
        <StyledPopper
            open={ this.state.openPopper }
            anchorEl={ this.state.anchorEl }
            sx={{ width: this.state.anchorEl ? this.state.anchorEl.clientWidth : undefined }}
            disablePortal={false}
        >
            <Paper sx={{ padding: '10px' }}>
                <Autocomplete
                    PopperComponent={ PopperComponent }
                    renderInput={ (params) => (
                        <TextField
                            { ...params }
                            autoFocus
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Project"
                            placeholder="Project Name"
                            id="select-project-name-text"
                        />)
                    }
                    disablePortal={true}
                    options={this.props.options}
                    renderOption={ (props: any, option: any, state: AutocompleteRenderOptionState) => {
                        let subheader = `${option.project.location.TH}`.trim();
                        if (subheader.length > 0) {
                            subheader = `${subheader} @`
                        }
                        subheader = `${subheader} ${option.amphur.name.TH}, ${option.district.name.TH}, ${option.province.name.TH}`
                        return (
                        <ListItem {...props} key={`${option.project.id}-${option.property.id}`} selected={state.selected} >
                            <ListItemText 
                                primary={option.project.name.TH || option.project.name.EN} 
                                secondary={subheader} />
                        </ListItem>
                        );
                    }}
                    getOptionLabel={ (option: any) => `${option.project.name.TH}` }
                    PaperComponent={({children}) => <Paper elevation={0} >{children}</Paper>}
                    disableCloseOnSelect={ this.props.multiple || false }
                    onChange={this.handleChange}
                    onClose={this.handleClose}
                    multiple={this.props.multiple}
                />
                <div style={{ borderTop: '1px solid #e1e4e8', textAlign: 'center', padding: '15px 10px 5px'}}>
                    { 'Not in the list?' }
                    {   <Button 
                            size="small"
                            variant="outlined"
                            color="primary"
                            onMouseDown={this.handleAddNewItemRequest}
                            sx={{ marginLeft: '10px', textTransform: 'capitalize' }} 
                        >
                            { 'Add a new item' }
                        </Button> }
                </div>
            </Paper>
        </StyledPopper>);
    }

    render(): React.ReactNode {

        return (<>
        <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
            { (this.props.renderInput || this.renderInput)({
                id: this.props.id || 'project-selector',
                InputProps: {
                    startAdornment: this.getStartAdornment(),
                    endAdornment: (
                        <InputAdornment position="end">
                            { this.renderDeleteButton() }
                            <IconButton size="small">
                                {  this.state.openPopper ? <ArrowDropUp/> : <ArrowDropDown />}
                            </IconButton>
                        </InputAdornment>
                    ),
                    ref: this.setInputAnchorEl
                },
                placeholder: undefined,
                disabled: this.props.disabled,
                onFocus: this.handleFocus,
                value: this.props.multiple ? undefined : this.getSelectedOption(),
            }) }
            { this.renderPopper() }
            </div>
        </ClickAwayListener>
        { this.renderNewProjectDialog() }
        </>);
    }
}