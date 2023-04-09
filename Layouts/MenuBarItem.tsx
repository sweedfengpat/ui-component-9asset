import { alpha, Button, Menu, MenuItem, MenuProps, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 1,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
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
    },
  }));

export interface Item {
    text: string;
    link: string;
    id?: string;
}

export interface MenuBarItemProps {
    text: string;
    items?: Item[];
    useExternalLinkComponent?: boolean;
    onMenuItemClick?: any;
    onMenuHeaderClick?: any;
    link?: any;
}

export interface MenuBarItemState {
    open: boolean;
    anchorEl: HTMLElement | null;
}

export class MenuBarItem extends React.Component<MenuBarItemProps, MenuBarItemState> {

    constructor (props: Readonly<MenuBarItemProps> | MenuBarItemProps) {
        super(props);

        this.state = {
            open: false,
            anchorEl: null
        };
    }

    handleMouseOver  = (event: React.MouseEvent<HTMLElement>) => {
        if(this.props.onMenuHeaderClick) {
          this.props.onMenuHeaderClick(this.props);
        } else { 
          this.setState({ open: true, anchorEl: event.currentTarget });
        }
    }

    handleClose = () => {
        this.setState({ open: false, anchorEl: null });
    };

    render () {
        return (<>
        <Button
            color="primary"
            style={{ color: '#ffffff'}}
            onClick={this.handleMouseOver}
        >
            {this.props.text}
        </Button>
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            onMouseLeave: this.handleClose
            }}
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClose={this.handleClose}
        >
        {
            (this.props.items || []).map((item, index) => {
              if(this.props.useExternalLinkComponent) {
                return <MenuItem key={index} onClick={() => {
                  this.props.onMenuItemClick && this.props.onMenuItemClick(item);
                }}>{item.text}</MenuItem> 
              } else {
                return <MenuItem component={Link} key={index} to={item.link}>{item.text}</MenuItem>
              }
            })
        }
        </StyledMenu>
        </>);
    }

}