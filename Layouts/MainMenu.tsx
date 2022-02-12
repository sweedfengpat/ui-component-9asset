import { Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";


export interface MenuItem {
    key: string;
    title: string;
    icon: any;
    link?: string;
  
    items?: MenuItem[];
}

export interface MainMenuProps extends RouteComponentProps {
    menu: MenuItem[];
}

export interface MainenuState {
    expanded: string[];
}

export class MainMenu extends React.Component<MainMenuProps, MainenuState> {

    constructor(props: Readonly<MainMenuProps> | MainMenuProps) {
        super(props);
        this.state = {
            expanded: []
        }
    }

    render() {
        const menu = this.props.menu;
        return (
            <List>
                {
                    menu.map(i => this.renderMenu(i))
                }
            </List>
        );
    }

    handleClick = (e: MouseEvent, item: MenuItem) => {
        e.preventDefault();
        const key = item.key;
        if (this.state.expanded.includes(key)) {
            const itemIndex = this.state.expanded.indexOf(key);
            // console.log(this.state.expanded.splice(itemIndex, 1));
            this.setState({ expanded: this.state.expanded.splice(itemIndex, 1) });
        } else {
            const expanded = this.state.expanded;
            expanded.push(key)
            this.setState({ expanded: expanded });
        }
        e.stopPropagation();
    };

    onMenuClick = (e: MouseEvent, item: MenuItem) => {
        console.log(e);
        e.preventDefault();
        this.props.history.push(item.link || '');
        e.stopPropagation();
    }

    private isExpanded = (key: string) => {
        return this.state.expanded.includes(key);
    }

    private renderMenu = (item: MenuItem) => {
        const expanded = this.isExpanded(item.key);
        console.log(item.key);
        if (item.items && item.items.length > 0) {
            return (<>
                <ListItem button key={item.key} onClick={(e) => this.onMenuClick(e as any, item)}>
                    <ListItemIcon>{<item.icon />}</ListItemIcon>
                    <ListItemText primary={item.title} ></ListItemText>
                    {expanded ? <ExpandLess onClick={(e) => this.handleClick(e as any, item)} /> : <ExpandMore onClick={(e) => this.handleClick(e as any, item)} />}
                </ListItem>
                <Collapse in={expanded} unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            item.items.map(i => this.renderMenu(i))
                        }
                    </List>
                </Collapse>
            </>);
        } else {
            return (
                <ListItem button key={item.key} onClick={(e) => this.onMenuClick(e as any, item)}>
                    <ListItemIcon>{<item.icon />}</ListItemIcon>
                    <ListItemText primary={item.title}></ListItemText>
                </ListItem>
            );
        }

    }
}
export default withRouter(MainMenu);