import { Divider, List, ListItemButton, ListItemText, MenuItem, Menu } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React from "react";
export interface MenuSection {
    key: string
    title: string
    items: IMenuItem[]
    link?: string
}
  
export interface IMenuItem {
    key: string
    title: string
    icon?: any
    link?: string

    items?: IMenuItem[]
}

export interface ProfileMenuProps  {
    menu: MenuSection[]; 
    history: any;
    location: any;
}

export interface ProfileMenState {
    expanded: string[];
    popupMenu: 'language' | 'currency' | '';

    anchorEl: HTMLElement | null;
}

export class ProfileMenuItem extends React.Component<ProfileMenuProps, ProfileMenState> {

    constructor(props: Readonly<ProfileMenuProps> | ProfileMenuProps) {
        super(props);
        this.state = {
            expanded: [],
            popupMenu: '',
            anchorEl: null,
        }
    }

    componentDidMount () {
        this.setState({ expanded: 
            this.props.menu ?
            this.props.menu.map(m => m.key): [] });
    }

    render () {
        const section = this.props.menu || [];
        return (
        <>
            { section && section.length > 0 &&
            (<List>
                {
                    section.map((i, j) => this.renderSection(i, j))
                }
            </List>)
            }
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
            key={index}
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
        {   
            index < this.props.menu.length - 1 ? <Divider variant="middle" /> : <></> 
        }
        </>)
    }

    private renderMenu = (item: IMenuItem, indent: number): any => {
        const isActive = this.props.location.pathname === item.link;
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
    }
}
export default ProfileMenuItem;