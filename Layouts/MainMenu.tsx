import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuList, MenuItem, styled, Menu } from "@mui/material";
import { ExpandLess, ExpandMore, KeyboardArrowDown } from "@mui/icons-material";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const ActiveListItem = styled(ListItem)({

});

export interface MenuSection {
    key: string;
    title: string;
    items: IMenuItem[];
    link?: string;
}

export interface IMenuItem {
    key: string;
    title: string;
    icon?: any;
    link?: string;
  
    items?: IMenuItem[];
}

export interface MainMenuProps extends RouteComponentProps {
    menu: MenuSection[];
    skipCommon?: boolean;
}

export interface MainenuState {
    expanded: string[];
    popupMenu: 'language' | 'currency' | '';

    anchorEl: HTMLElement | null;
}

export class MainMenu extends React.Component<MainMenuProps, MainenuState> {

    constructor(props: Readonly<MainMenuProps> | MainMenuProps) {
        super(props);
        this.state = {
            expanded: [],
            popupMenu: '',
            anchorEl: null,
        }
    }

    componentDidMount () {
        this.setState({ expanded: this.props.menu.map(m => m.key) });
    }

    render () {
        const section = this.props.menu;
        const skipCommon = this.props.skipCommon === true;
        return (
        <>
            <List>
                { !skipCommon ? (<>
                <ListItem component="div" disablePadding>
                    <ListItemButton>
                        <ListItemText>Profile</ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle"></Divider>
                <ListItem component="div" disablePadding>
                    <ListItemButton onClick={(e) => this.handleCommonMenuClick(e as any, 'language') }>
                        <ListItemText>Launguage</ListItemText>
                        <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>EN</ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem component="div" disablePadding>
                    <ListItemButton onClick={(e) => this.handleCommonMenuClick(e as any, 'currency') }>
                        <ListItemText>Price Display</ListItemText>
                        <ListItemIcon sx={{ textAlign: 'right', display: 'block' }}>THB</ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle"></Divider></> ): (<></>) }
                {
                    section.map((i, j) => this.renderSection(i, j))
                }
            </List>
            { this.renderPopupMenu() }
        </>
        );
    }

    renderPopupMenu = () => {
        const items = 
            (this.state.popupMenu === 'language' ? 
                ['English', 'Chinese', 'ภาษาไทย'] : 
                    (this.state.popupMenu === 'currency' ? 
                        ['THB', 'USD', 'CNY'] : []))
            .map(i => {
                return (<MenuItem disableRipple onClick={() => { this.setState({ popupMenu: '', anchorEl: null }) }}>{i}</MenuItem>);
            })
        
        return (<>
        <Menu 
            open={this.state.popupMenu !== ''}
            anchorEl={this.state.anchorEl} 
            onClose={() => { this.setState({ popupMenu: '', anchorEl: null }) }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            sx={{ minWidth: 180 }}
        >
            { items }
        </Menu>
        </>)
    }

    handleCommonMenuClick = (event: React.MouseEvent<HTMLButtonElement>, type: 'language' | 'currency' | '') => {
        this.setState({ popupMenu: type });
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClick = (e: MouseEvent, item: IMenuItem) => {
        e.preventDefault();
        const key = item.key;
        if (this.state.expanded.includes(key)) {
            this.setState({ expanded: this.state.expanded.filter(t => t !== key) });
        } else {
            const expanded = this.state.expanded;
            expanded.push(key)
            this.setState({ expanded: expanded });
        }
        e.stopPropagation();
    };

    onMenuClick = (e: MouseEvent, item: IMenuItem) => {
       
        e.preventDefault();
        if (item.link !== undefined) {
            this.props.history.push(item.link || '');
        } else {
            const key = item.key;
            if (this.state.expanded.includes(key)) {
                this.setState({ expanded: this.state.expanded.filter(t => t !== key) });
            } else {
                const expanded = this.state.expanded;
                expanded.push(key)
                this.setState({ expanded: expanded });
            }
        }
        e.stopPropagation();
    }

    private isExpanded = (key: string) => {
        return this.state.expanded.includes(key);
    }

    private renderSection = (item: MenuSection, index: number) => {
        const open = this.isExpanded(item.key);
        return (<>
       
        <ListItemButton
            alignItems="flex-start"
            onClick={(e: any) => this.onMenuClick(e as any, item)}
        >
            <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    lineHeight: '20px',
                    mb: '2px',
                }}>   
            </ListItemText>
            { item.items.length > 0 ? (open ? <ExpandLess /> : <ExpandMore />) : (<></>)} 
        </ListItemButton>
        {
            open && item.items.map(i => this.renderMenu(i, 0))
        }
        { index < this.props.menu.length - 1 ? <Divider variant="middle" /> : <></> }
        </>)
    }

    private renderMenu = (item: IMenuItem, indent: number): any => {
        // const expanded = this.isExpanded(item.key);
        const isActive = this.props.location.pathname === item.link;
        // if (item.items && item.items.length > 0) {
        //     return (<>
        //         <ListItem selected={ isActive || false } button key={item.key} onClick={(e: any) => this.onMenuClick(e as any, item)}>
        //             <ListItemIcon>{<item.icon />}</ListItemIcon>
        //             <ListItemText primary={item.title} ></ListItemText>
        //             {expanded ? <ExpandLess onClick={(e: any) => this.handleClick(e as any, item)} /> : <ExpandMore onClick={(e: any) => this.handleClick(e as any, item)} />}
        //         </ListItem>
        //         {/* <Collapse in={expanded} unmountOnExit>
        //             <List component="div" disablePadding>
        //                 {
        //                     item.items.map(i => this.renderMenu(i, indent+1))
        //                 }
        //             </List>
        //         </Collapse> */}
        //     </>);
        // } else {
        return (<>
            <ListItemButton key={item.key} selected={ isActive || false } sx={{ py: 0 }} onClick={(e: any) => this.onMenuClick(e as any, item)}>
                <ListItemText
                    sx={{ paddingLeft: `${indent*15}px`}}
                    primary={item.title}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />
            </ListItemButton>
            {
                item && (item.items || []).map(i => this.renderMenu(i, indent+1))
            }
        </>);
        // }

    }
}
export default withRouter(MainMenu);