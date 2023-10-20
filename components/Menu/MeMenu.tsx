import React from "react";
import { AppBar, Box, Button, Dialog, DialogContent, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, MenuItem, Slide, Toolbar, styled } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { MenuItem as IMenuItem } from "../Toolbar";

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
  open: boolean;
  logo?: string;
  items?: IMenuItem[];

  onClose: () => void;
  onMenuClicked?: (type: string, link?: string) => void;
}

export const MeMenu = (props: MenuProps) => {
  const { open } = props;
  const { t, i18n } = useTranslation();

  const closeButton = (
  <IconButton 
      sx={{ position: 'absolute', right: 4, color: (theme) => theme.palette.grey[500] }}
      onClick={() => { props.onClose && props.onClose() }}
  >
      <Close />
  </IconButton>);

  const renderMenuItems = () => {
    return (<>{
      (props.items || []).map((item, index) => (<React.Fragment key={item.key || index}>
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
    }</>);
  }

  const renderAuthMenu = () => (
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
  );
    
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
                  9Asset
              </Box>
              
            </Box>
            <Button
              variant="text"
              sx={{ pr: 5, textTransform: 'none', fontWeight: '600' }}
              onClick={() => window.location.href = `${process.env.REACT_APP_BASE_SELLER_URL}` }
            >
              Seller Center
            </Button>
          </Box>
          { closeButton }
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ py: 0, px: 0 }}>
        <List>
          { renderAuthMenu() }
          <Divider />
          { renderMenuItems() }
        </List>
      </DialogContent>
    </Dialog>
  );
}