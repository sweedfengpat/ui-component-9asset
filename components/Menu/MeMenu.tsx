import React from "react";
import { AppBar, Avatar, Box, Button, Dialog, DialogContent, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Slide, Stack, Toolbar, Typography, styled } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { MenuItem as IMenuItem } from "../Toolbar";
import { User } from "firebase/auth";
import { getUserName } from "../../Layouts/Profile";

const RightTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
  ) {
  return <Slide direction="right" ref={ref} {...props} mountOnEnter unmountOnExit />;
});

const MenuSubItem = styled(MenuItem)(({ theme }) => ({
  '.MuiListItemText-primary': {
    fontSize: '1em',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1em',
    }
  }
}));

export interface MenuProps {
  user: User | null;
  userInfo: any;
  open: boolean;
  logo?: string;
  items?: IMenuItem[];
  additionalActions?: React.ReactNode;

  onClose: () => void;
  onMenuClicked?: (type: string, link?: string) => void;
}

export const MeMenu = (props: MenuProps) => {
  const { open } = props;
  const { t, i18n } = useTranslation();

  const getIsAuth = () => {
    const allowDevLogin = process.env.NEXT_PUBLIC_ALLOW_DEV_LOGIN === 'true';
    return  props.user !== null || (allowDevLogin && (process.env.NODE_ENV || 'development') === 'development');
  }

  const closeButton = (
  <IconButton 
      sx={{ position: 'absolute', right: 4, color: (theme) => theme.palette.grey[500] }}
      onClick={() => { props.onClose && props.onClose() }}
  >
      <Close />
  </IconButton>);

  const renderMenuItems = () => {
    const items = (props.items || []).map((item, index) => (<React.Fragment key={item.key || index}>
      <MenuItem
        disabled={!!item.items}
        onClick={() => props.onMenuClicked?.(item.key, item.link)}
      >
        <ListItemText>{ t(item.text) }</ListItemText>
      </MenuItem>
      {
        (item.items || []).map((s) => (
          <MenuSubItem key={s.key} onClick={() => props.onMenuClicked?.(s.key, s.link)}>
            <ListItemText inset>{ t(s.text) }</ListItemText>
          </MenuSubItem>
        ))
      }
    </React.Fragment>))
  
    if (getIsAuth()) {
      items.push(
      <React.Fragment key={'logout'}>
        <MenuItem
   
          onClick={() => props.onMenuClicked?.('logout')}
        >
          <ListItemText>{ t('menu.logout') }</ListItemText>
        </MenuItem>
      </React.Fragment>);
    }
    return (<>{
      items
    }</>);
  }

  const getName = () => {
    const currentLanguage = i18n.language || 'th';
    console.log(currentLanguage);
    console.log(props.userInfo)
    if (props.userInfo) {
      if(currentLanguage === 'en') {
        return `${props.userInfo.nameEn || '' } ${props.userInfo.lastnameEn || '' }`.trim();
      } else if(currentLanguage === 'cn') {
        return `${props.userInfo.nameCn || '' } ${props.userInfo.lastnameCn || '' }`.trim();
      } else {
        return `${props.userInfo.nameTh || '' } ${props.userInfo.lastnameTh || '' }`.trim();
      }
    }
    else {
      return props.user?.displayName || '9asset';
    }
  }

  const renderAuthMenu = () => {
    if (getIsAuth()) {
      return (
      <ListItem alignItems="center" sx={{ py: 0 }}>
        <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar>{ getUserName(props.user) }</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={getName()}
          // secondary={props.user && props.user.email ? props.user.email : ''}
          secondaryTypographyProps={{ component: 'div' }}
          secondary={
          <Stack direction="column" sx={{ p:0 }}>
            <Box sx={{ display: 'inline-flex' }}>
              <Typography component="span" sx={{ fontSize: '12px', fontStyle: props.userInfo?.email ? 'normal' : 'italic' }}>{props.userInfo && props.userInfo.email ? props.userInfo.email : 'no email'}</Typography>
              { props.userInfo?.emailVerified  && <Typography component="span" sx={{ fontSize: '12px', pl: 1 }} color="green">{'Verified'}</Typography> }
            </Box>
            <Typography component="span" sx={{ fontSize: '10px' }} color="primary">150 Coins</Typography>
          </Stack>
          }
        />
      </ListItem>);
    }
    return (<>
    <ListItem component="div" disablePadding>
      <ListItemButton 
        sx={{ textAlign: 'center', marginRight: '10px' }}
        onClick={() => props.onMenuClicked?.('login')}
        component="a"
      >
        <ListItemText
          primary={t('Sign in')}
          primaryTypographyProps={{
            color: '#f4762a',
            fontWeight: 'medium',
            variant: 'body1',
          }}
        />
      </ListItemButton>
        { t('or') }
      <ListItemButton component="a" 
        onClick={() => props.onMenuClicked?.('register')}
        sx={{ textAlign: 'center', marginLeft: '10px' }}
      >
        <ListItemText
          primary={t('Sign up')}
          primaryTypographyProps={{
            color: '#f4762a',
            fontWeight: 'medium',
            variant: 'body1',
          }}
        />
      </ListItemButton>
    </ListItem>
    <Divider />
    </>);
  };


    
  return (
    <Dialog
      open={open}
      fullScreen
      TransitionComponent={RightTransition}
      onClose={() => props.onClose()}
    >
      <AppBar
        sx={{
            '&.MuiPaper-root': {
                position: 'relative'
            },
            bgcolor: 'white'
        }}
      >
        <Toolbar color="white" sx={{ pr: 1, pl: 2 }}>
          <Box
            component="div"
            sx={{ 
                whiteSpace: 'nowrap', 
                display: 'flex', 
                alignItems: 'center', 
                verticalAlign: 'middle',
                justifyContent: 'space-between',
                width: '100%',
            }}
          >
            <Box component="div" sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <Box component="img" src={props.logo} sx={{ width: 25 }} />
              <Box
                  component="div"
                  sx={{
                      alignSelf: 'center',
                      pl: 1,
                      paddingTop: '0px',
                      fontWeight: '600',
                      color: 'black'
                  }}>
                  9asset
              </Box>
              
            </Box>
            {
              props.additionalActions
            }
          </Box>
          { closeButton }
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ py: 0, px: 0 }}>
        <List>
          { renderAuthMenu() }
          { renderMenuItems() }
        </List>
      </DialogContent>
    </Dialog>
  );
}