import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const VersionBox = () => {
  return (
  <Box
    component={"div"}
    sx={{
      fontSize: '12px',
      bottom: '12px',
      position: 'absolute',
      right: '20px',
      textAlign: 'right'
    }}
  >
    {`version: ${process.env.REACT_APP_BUILD_NUMBER || '0.0.1'}`}
  </Box>
  )
}

export interface DrawerMenuItem {
  key: string
  title: string
  icon?: any
  link?: string

  items?: DrawerMenuItem[]
}

export interface DrawerMenuProps {
  menu: DrawerMenuItem[];
}

export const DrawerMenu = (props: DrawerMenuProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Change to array to support heiracial menu
  const [expanded, setExpanded] = useState<string|null>(null);

  const handleMenuClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: DrawerMenuItem) => {
    if (item.items && item.items.length > 0) {
      setExpanded(item.key === expanded ? null : item.key);
    } else {
      item.link && navigate(item.link);
    }
  }

  const renderMenuItem = (item: DrawerMenuItem, index: number, indent = 0) => {
    return (
    <React.Fragment key={item.key}>
      <ListItem
        key={item.title}
        sx={{ paddingLeft: `${(indent*8) + 8}px`, cursor: 'pointer' }}
        onClick={(e) => handleMenuClick(e, item)}
      >
        <ListItemIcon sx={{ minWidth: `32px` }}>
          {item.icon ? <item.icon /> : <></>}
        </ListItemIcon>
        <ListItemText
          primary={t(`menu.${item.title}`)}
          primaryTypographyProps={{
            color: '#333333',
            fontSize: '16px',
            fontWeight: '500',
          }}
        />
        {
          item.items && item.items.length > 0  ?
          (expanded === item.key ? <ExpandLess /> : <ExpandMore />) : <></>
        }
      </ListItem>
      {
        item.items && item.items.length > 0 &&
        (
          <Collapse in={item.key === expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { item.items.map((item: DrawerMenuItem, index: number) => renderMenuItem(item, index, indent + 1)) }
            </List>
          </Collapse>
        )
      }
    </React.Fragment>);
  }
  return (<>
  <List>
    {
      (props.menu || []).map((item: DrawerMenuItem, index: number) => renderMenuItem(item, index))
    }
  </List>
  <VersionBox />
  </>);
}

export default DrawerMenu;