import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  ExpandLess,
  ExpandMore,
  Inbox,
  Mail,
} from '@mui/icons-material'
import React, { useState } from 'react'
import { WithTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

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

export interface DrawerMenuProps {
  // menu={this.props.drawermenu}
  // location={this.props.location}
  // onMenuItemClick={this.handleDrawerMenuClicked}
  // t={this.props.t}
  // tReady={this.props.tReady}
  // i18n={this.props.i18n}

  menu: IMenuItem[]
  location: any
  onMenuItemClick?: (e: MouseEvent, item: IMenuItem) => void
  t: any
  tReady: any
  i18n: any
}

export function DrawerMenuFunctionComponent({ ...props }) {
  // react hook to query path params
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const [open, setOpen] = useState(
    Array(props.menu.length).fill(false),
  )

  return (
    <>
      <List>
        {props.menu &&
          props.menu.length > 0 &&
          props.menu.map((menu: any, index: number) => {
            console.log(menu.items && menu.items > 0)
            return (
              <>
                <ListItem
                  button
                  key={menu.title}
                  onClick={() => {
                    if (menu.items && menu.items.length > 0) {
                      setOpen((prev) => {
                        const newState = [...prev]
                        newState[index] = !newState[index]
                        return newState
                      })
                    } else {
                      history.push(menu.link)
                    }
                  }}
                  selected={pathname.includes(menu.link)}
                  sx={{
                    paddingLeft: `${8}px`,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '32px' }}>
                    {menu.icon ? <menu.icon /> : <></>}
                  </ListItemIcon>
                  <ListItemText
                    primary={props.t(`menu.${menu.title}`)}
                    primaryTypographyProps={{
                      color: '#333333',
                      // fontFamily: 'Noto Sans Thai',
                      fontSize: 16,
                      fontWeight: '500',
                    }}
                  />

                  {menu.items && menu.items.length > 0 && (
                    <>
                      {open[index] ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItem>
                {menu.items && menu.items.length > 0 && (
                  <Collapse
                    in={open[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {menu.items.map((item: any) => {
                        return (
                          <ListItem
                            button
                            key={item.title}
                            onClick={() => {}}
                            selected={pathname.includes(item.link)}
                            sx={{
                              paddingLeft: `${3 * 15 + 8}px`,
                            }}
                          >
                            <ListItemText
                              primary={props.t(`menu.${item.title}`)}
                              primaryTypographyProps={{
                                color: '#333333',
                                // fontFamily: 'Noto Sans Thai',
                                fontSize: 15,
                              }}
                            />
                          </ListItem>
                        )
                      })}
                    </List>
                  </Collapse>
                )}
              </>
            )
          })}
      </List>
    </>
  )
}
export default DrawerMenuFunctionComponent
