import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import React from 'react'
import { WithTranslation } from 'react-i18next'

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

export interface DrawerMenuProps extends WithTranslation {
  menu: IMenuItem[]
  location: any
  onMenuItemClick?: (e: MouseEvent, item: IMenuItem) => void
}

export interface DrawerMenuState {
  expanded: string[]
  popupMenu: 'language' | 'currency' | ''

  anchorEl: HTMLElement | null
}

export class DrawerMenu extends React.Component<
  DrawerMenuProps,
  DrawerMenuState
> {
  constructor(props: Readonly<DrawerMenuProps> | DrawerMenuProps) {
    super(props);
    this.state = {
      expanded: [],
      popupMenu: '',
      anchorEl: null,
    }
  }

  componentDidMount() {
    this.setState({
      expanded: this.props.menu
        ? this.props.menu.map((m) => m.key)
        : [],
    })
  }

  render() {
    const menu = this.props.menu || []
    return (
      <>
        <List>
          {menu.map((i, ind) => this.renderMenu(i, ind, 0))}
        </List>
        <div
          style={{
            fontSize: '12px',
            bottom: '20px',
            position: 'absolute',
            right: '20px',
          }}
        >
          {`v${process.env.REACT_APP_BUILD_NUMBER || '0.0.1'}`}
        </div>
      </>
    )
  }

  handleCommonMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: 'language' | 'currency' | '',
  ) => {
    this.setState({ popupMenu: type })
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClick = (e: MouseEvent, item: IMenuItem) => {
    e.preventDefault()
    const key = item.key
    if (this.state.expanded.includes(key)) {
      this.setState({
        expanded: this.state.expanded.filter((t) => t !== key),
      })
    } else {
      const expanded = this.state.expanded
      expanded.push(key)
      this.setState({ expanded: expanded })
    }
    e.stopPropagation()
  }

  onMenuClick = (e: MouseEvent, item: IMenuItem) => {
    console.log('onProfileMenuItemClick: ', item, e)
    e.preventDefault()
    if (item.link !== undefined) {
      if (this.props.onMenuItemClick) {
        this.props.onMenuItemClick(e, item)
      }
    } else {
      const key = item.key
      if (this.state.expanded.includes(key)) {
        this.setState({
          expanded: this.state.expanded.filter((t) => t !== key),
        })
      } else {
        const expanded = this.state.expanded
        expanded.push(key)
        this.setState({ expanded: expanded })
      }
    }
    e.stopPropagation()
  }

  private isExpanded = (key: string) => {
    return this.state.expanded.includes(key)
  }

  private renderSection = (item: MenuSection, index: number) => {
    const open = this.isExpanded(item.key)
    return (
      <>
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
            }}
          ></ListItemText>
          {item.items.length > 0 ? (
            open ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : (
            <></>
          )}
        </ListItemButton>
        {open &&
          item.items.map((item, index) =>
            this.renderMenu(item, index, 0),
          )}
        {index < this.props.menu.length - 1 ? (
          <Divider variant="middle" />
        ) : (
          <></>
        )}
      </>
    )
  }

  private renderMenu = (
    item: IMenuItem,
    index: number,
    indent: number,
  ): any => {
    const expanded = this.isExpanded(item.key)
    const isActive = this.props.location.pathname === item.link
    const t = this.props.t as any

    if (item.items && item.items.length > 0) {
      return (
        <React.Fragment key={item.key}>
          <ListItem
            selected={isActive || false}
            button
            onClick={(e: any) => this.onMenuClick(e as any, item)}
            sx={{ paddingLeft: `${indent * 15 + 8}px` }}
          >
            {/* Icon */}
            {item.icon ? (
              <ListItemIcon sx={{ minWidth: '32px' }}>
                {<item.icon />}
              </ListItemIcon>
            ) : (
              <></>
            )}

            {/* Title */}
            <ListItemText
              primary={t(`menu.${item.title}`)}
              primaryTypographyProps={{
                color: '#333333',
                fontFamily: 'Noto Sans Thai',
                fontSize: 16,
                fontWeight: '500',
              }}
            />

            {expanded ? (
              <ExpandLess
                onClick={(e: any) => this.handleClick(e as any, item)}
              />
            ) : (
              <ExpandMore
                onClick={(e: any) => this.handleClick(e as any, item)}
              />
            )}
          </ListItem>
          <Collapse in={expanded} unmountOnExit>
            <List component="div" disablePadding>
              {item.items.map((i, index) =>
                this.renderMenu(i, index, indent + 3),
              )}
            </List>
          </Collapse>
        </React.Fragment>
      )
    } else {
      return (
        <ListItemButton
          key={item.key}
          selected={isActive || false}
          onClick={(e: any) => this.onMenuClick(e as any, item)}
          sx={{ paddingLeft: `${indent * 15 + 8}px` }}
        >
          {/* Icon */}
          {item.icon ? (
            <ListItemIcon sx={{ minWidth: '32px' }}>
              {<item.icon />}
            </ListItemIcon>
          ) : (
            <></>
          )}

          {/* Text */}
          <ListItemText
            primary={t(`menu.${item.title}`)}
            primaryTypographyProps={{
              color: '#333333',
              fontFamily: 'Noto Sans Thai',
              fontSize: indent === 0 ? 16 : 15,
              fontWeight: indent === 0 ? '500' : 'normal',
            }}
          />
        </ListItemButton>
      )
    }
  }
}
export default DrawerMenu
