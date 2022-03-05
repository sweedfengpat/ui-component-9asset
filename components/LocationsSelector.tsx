import { ArrowBackIos, Done } from "@mui/icons-material";
import { Autocomplete, autocompleteClasses, Box, Button, Chip, ClickAwayListener, IconButton, Paper, Popper, styled, TextField } from "@mui/material";
import React from "react";

export interface LocationsSelectState {
    popperOpen: boolean;
    currentStep: number;
    anchorEl: any | null;

    selectedCategory?: any;
    selectedLocation?: any;
    selectedBranches?: any[];
}

export interface LocationsSelectProps {
    renderInput: (params: any) => React.ReactNode;
    onLocationChanged: (location: any) => void;
    onLocationCategoryChanged: (category: any) => void;
    categories: any[];
    branches: any[];
}

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${
      theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
    }`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal+ 2,
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
        borderBottom: `1px solid  ${
          theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
        }`,
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

export class LocationsSelector extends React.Component<LocationsSelectProps, LocationsSelectState> {

    constructor (props: LocationsSelectProps | Readonly<LocationsSelectProps>) {
        super(props);

        this.state = {
            anchorEl: null,
            popperOpen: false,
            currentStep: 0
        };
    }

    handleAddNew = async () => {

    }

    handleBranchChanged = (event: any, value: any) => {
        this.setState({ selectedBranches: value });
    }

    handleBackStep1 = () => {
        this.setState({ selectedCategory: undefined });
        this.setState({ selectedLocation: undefined });
        this.setState({ currentStep: 0 }, () => { this.props.onLocationChanged(undefined); });
    }

    handleBackStep2 = () => {
        this.setState({ selectedLocation: undefined });
        this.setState({ currentStep: 1 });
    }

    handleCategoryChanged = (event: any, value: any) => {
        console.log(value);
        this.setState({ selectedCategory: value, currentStep: 1 }, () => { this.props.onLocationCategoryChanged(this.state.selectedCategory) });
    }

    handleClick = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
        this.setState({ popperOpen: true });
    }

    handleClickAway = () => {
        this.setState({ popperOpen: false, anchorEl: null }, () => { console.log(this.state); });
    }

    handleDeleteBranch = (branch: any) => {
        const branches = this.state.selectedBranches || [];
        this.setState({ selectedBranches: branches.filter(t => t.branch_ID !== branch.branch_ID)});
    }

    handleLocationChanged = (event: any, value: any) => {
        this.setState(
            { selectedLocation: value, currentStep: 2 },
            () => {
                this.props.onLocationChanged({...this.state.selectedLocation, categoryId: this.state.selectedCategory.location_type_ID });
            });
        
    }

    getStartAdornment () {
        const adornment = [];
        if (this.state.selectedCategory) {
            adornment.push(
                <Chip
                    label={this.state.selectedCategory.location_type_name_TH || ''}
                    size="small"
                    key={`location_category_${this.state.selectedCategory.location_type_ID}`}
                ></Chip>);
        }
        if (this.state.selectedLocation) {
            if (adornment.length > 0) {
                adornment.push('›');
            }
            adornment.push(
                <Chip
                    label={this.state.selectedLocation.Name_TH}
                    key={`location_${this.state.selectedCategory.location_type_ID}`}
                    size="small"
                ></Chip>);
        }
        if (this.state.selectedBranches) {
            if (adornment.length > 0) {
                adornment.push('›');
            }
            
            this.state.selectedBranches.forEach((branch, index) => {
                adornment.push(<Chip label={branch.branch_Name_TH} size="small" clickable key={index} onDelete={() => { this.handleDeleteBranch(branch) }}></Chip>);
            });
            
        }
        return adornment;
    }

    renderPoppperHeader = () => {
        const { currentStep } = this.state;
        if (currentStep === 1) {
            return (
                <Box sx={{ padding: '8px 0px', fontWeight: 600, }} >
                    <IconButton
                        size="small"
                        onClick={this.handleBackStep1}
                    ><ArrowBackIos /></IconButton>
                    <Chip size="small" label={ this.state.selectedCategory.location_type_name_TH }></Chip>
                </Box>
            );
        } else if (currentStep === 2) {
            return (
            <Box sx={{ padding: '8px 0px', fontWeight: 600, }} >
                <IconButton size="small" onClick={this.handleBackStep2}><ArrowBackIos /></IconButton>
                <Chip size="small" label={ this.state.selectedCategory.location_type_name_TH }></Chip>
                ›
                <Chip size="small" label={ this.state.selectedLocation.Name_TH }></Chip>
            </Box>
            );
        }
    }

    renderPopperFooter = () => {
        if ( this.state.selectedCategory && this.state.selectedCategory.location_type_ID === 20 ) {
            return (
            <Box sx={{ padding: '8px 0px', fontWeight: 600, }} >
                <div style={{ borderTop: '1px solid #e1e4e8', textAlign: 'center', padding: '15px 10px 5px'}}>
                    { 'Not in the list?' } { <Button variant="text" color="primary" onMouseDown={this.handleAddNew}>{ 'Add a new item' }</Button> }
                </div>
            </Box>)
        }
    }

    renderPopperContent = () => {
        const { currentStep } = this.state;
        const locations = this.state.selectedCategory ? this.state.selectedCategory.locations : [];
        const branches = this.props.branches || [];
        const categories= this.props.categories || [];
        return (<>
            { this.renderPoppperHeader() }
            <Autocomplete
                style={{ display: currentStep === 0 ? 'block' : 'none'}}
                PopperComponent={PopperComponent}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        autoFocus
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Location Type"
                        placeholder="Location Type"
                        id="select-location-cate-text"
                    />)
                }
                disablePortal={true}
                options={categories}
                getOptionLabel={(option) => {
                    return option.location_type_name_TH;
                }}
                onChange={this.handleCategoryChanged}
            />
            <Autocomplete
                style={{ display: currentStep === 1 ? 'block' : 'none'}}
                PopperComponent={PopperComponent}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        autoFocus
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Location"
                        placeholder="Location"
                        id="select-location-text"
                    />)
                }
                disablePortal={true}
                options={locations}
                getOptionLabel={(option) => {
                    return option.Name_TH;
                }}
                onChange={this.handleLocationChanged}
            />
            <Autocomplete
                limitTags={5}
                style={{ display: currentStep === 2 ? 'block' : 'none'}}
                ChipProps={{ size: 'small' }}
                PopperComponent={PopperComponent}
                multiple={true}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        autoFocus
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="Location Branches"
                        placeholder="Location Branches"
                    />)
                }
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Box
                            component={Done}
                            sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                            style={{
                            visibility: selected ? 'visible' : 'hidden',
                            }}
                        />
                        <Box>
                            { option.branch_Name_TH || '' }
                        </Box>
                    </li>
                )}
                disablePortal={true}
                options={branches}
                getOptionLabel={(option: any) => {
                    return option ? (option.branch_Name_TH || '') : '';
                }}
                disableCloseOnSelect
                onChange={this.handleBranchChanged}
            />
            { this.renderPopperFooter() }
        </>);
        
    }

    renderPopper = () => {
        const { popperOpen, anchorEl } = this.state;
        return (
            <StyledPopper
                open={popperOpen}
                anchorEl={anchorEl}
                style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
                disablePortal={false}
            >
                <Paper style={{ padding: '10px'}}>
                    <div>{ this.renderPopperContent() }</div>
                </Paper>
            </StyledPopper>
        );
    }

    render(): React.ReactNode {
        
        return (<>
        <ClickAwayListener onClickAway={this.handleClickAway}>
            <div>
            {
                this.props.renderInput({
                    // id: this.props.id || '',
                    fullWidth: true,
                    InputProps: {
                        startAdornment: this.getStartAdornment(),
                        // endAdornment: this.getEndAndornment()
                    },
                    onClick: this.handleClick,
                })
            }
            {
                this.renderPopper()
            }
            </div>
        </ClickAwayListener>
        </>);
    }
}