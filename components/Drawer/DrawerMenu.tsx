import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { matchRoutes, useLocation } from "react-router";
import { useNavigate } from "react-router";

export const VersionBox = () => {
  return (
  <Box
    component={"div"}
    sx={{
      fontSize: '12px',
      color: '#cbcbcb',
      bottom: '5px',
      position: 'fixed',
      right: '7px',
      textAlign: 'right'
    }}
  >
    {`version: ${process.env.REACT_APP_BUILD_NUMBER || '0.0.1'}`}
  </Box>
  )
}

export interface DrawerMenuItem {
  key: string;
  title: string;
  icon?: any;
  link?: string;

  items?: DrawerMenuItem[];
}

export interface DrawerMenuProps {
  menu: DrawerMenuItem[];
  multiActive?: boolean;
  routes?: { path: string }[];

  onMenuItemClick?: (key: string) => void;
}

export const DrawerMenu = (props: DrawerMenuProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const theme = useTheme();
  // const [{ route }] = matchRoutes(props?.routes || [], location);

  const [expanded, setExpanded] = useState<number[]>([]);

  useEffect(() => {
    if (expanded.length === 0 && !props.multiActive) {
      const index = props.menu.findIndex(i => i.items && i.items.some(j => j.link === location.pathname));
      if (index >= 0) {
        setExpanded([index])
      }
    }
  }, [])

  const toggleExpanding = (index: number) => {
    if (expanded.includes(index)) {
      if (props.multiActive === true) {
        setExpanded(expanded.filter(i => i !== index))
      } else {
        setExpanded([]);
      }
    } else {
      if (props.multiActive === true) {
        setExpanded([ ...expanded, index]);
      } else {
        setExpanded([index]);
      }
    }
  }

  const handleMenuClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: DrawerMenuItem, index: number) => {
    if (item.items && item.items.length > 0) {
      toggleExpanding(index)
      // setExpanded(item.key === expanded ? null : item.key);
    } else {
      item.link && navigate(item.link);
    }
  }

  const renderMenuItem = (item: DrawerMenuItem, index: number, indent = 0) => {
    return (
    <React.Fragment key={item.key}>
      <ListItem
        key={item.title}
        sx={{
          paddingLeft: `${(indent*8) + 8}px`, cursor: 'pointer',
          paddingTop: indent > 0 ? '0px' : '8px',
          paddingBottom: indent > 0 ? '0px' : '8px'
        }}
        onClick={(e) => {
          handleMenuClick(e, item, index);
          props.onMenuItemClick?.(item.key);
        }}
      >
        <ListItemIcon sx={{ minWidth: `32px`, color: location.pathname === item.link ? theme.palette.primary.main : '#333333', }}>
          {item.icon ? <item.icon /> : <></>}
        </ListItemIcon>
        <ListItemText
          primary={t(`menu.${item.title}`)}
          primaryTypographyProps={{
            color: location.pathname === item.link ? theme.palette.primary.main : '#333333',
            fontSize: '16px',
            fontWeight: location.pathname === item.link ? '700' : '500',

          }}
        />
        {
          item.items && item.items.length > 0  ?
          (expanded.includes(index) ? <ExpandLess /> : <ExpandMore />) : <></>
        }
      </ListItem>
      {
        item.items && item.items.length > 0 &&
        (
          <Collapse in={expanded.includes(index)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { item.items.map((item: DrawerMenuItem, index: number) => renderMenuItem(item, index, indent + 1)) }
            </List>
          </Collapse>
        )
      }
    </React.Fragment>);
  }
  return (<>
  <List sx={{ marginBottom: '18px' }}>
    {
      (props.menu || []).map((item: DrawerMenuItem, index: number) => renderMenuItem(item, index))
    }
  </List>
  <VersionBox />
  </>);
}

export default DrawerMenu;