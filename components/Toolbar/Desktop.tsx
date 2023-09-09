import { Box, Button, Grid, IconButton, Toolbar } from "@mui/material";
import logoPath from '../../assets/images/9asset-logo.png';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AppsRounded } from "@mui/icons-material";
import { Profile } from "../../Layouts/Profile";
import { AdvanceSearch } from "../../Layouts/MainLayoutAppBar";

export interface DesktopToolbarProps {
  namespace: string;
  onToolbarMenuClick?: (type: string) => void;
}

export const DesktopToolbar = (props: DesktopToolbarProps) => {
  const { t, i18n } = useTranslation(props.namespace);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userVal = JSON.parse(localStorage.getItem(`9asset.userinfo`) || 'null');
    setUser(userVal);
  }, []);

  const getUserDisplayName = () => {
    const lang = i18n.language.toLowerCase();
    if(lang === 'en') {
        return user && user.nameEn ? user.lastnameEn : '' ;
    } else if(lang === 'cn') {
        return user && user.nameCn ? user.lastnameCn : '' ;
    } else if(lang === 'th') {
        return user && user.nameTh ? user.lastnameTh : '' ;
    } else {
        return user && user.displayName ? user.displayName : '' ;
    }
  }

  const onMenuClick = (type: 'project' | 'sell' | 'rent') => {
    props.onToolbarMenuClick && props.onToolbarMenuClick(type);
  }

  return (<>
  <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
    <a href ={ '/' }>
        <img src={logoPath} style={{ height: '40px' }} alt="'9Asset Logo'" />
    </a>

    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
      <Button
          color="info"
          style={{ color: '#5e5e5e'}}
          onClick={()=> onMenuClick('project')}
      >
          {`${t('project')}`}
      </Button>
      <Button
          color="primary"
          style={{ color: '#5e5e5e' }}
          onClick={()=> onMenuClick('sell')}
      >
          {`${t('sell')}`}
      </Button>
      <Button
          color="primary"
          style={{ color: '#5e5e5e' }}
          onClick={()=> onMenuClick('rent')}
      >
          {`${t('rent')}`}
      </Button>
      <Box component={"div"} sx={{ marginTop: '-4px', position: 'absolute', left: '275px', width: '450px' }}>
        <AdvanceSearch />
      </Box>
    </Box>

    <Box component={"div"} sx={{ flexGrow: 1 }} />

    <Box component={"div"} sx={{ marginRight: '10px' }}>
    { getUserDisplayName() }
    </Box>
    <Box component={"div"} sx={{ display: 'flex' }}>
      <IconButton>
        <AppsRounded fontSize="large"  />
      </IconButton>
    </Box>
    <Box component={"div"} sx={{ display: 'flex' }}>
      <Profile user={user} />
    </Box>
  </Toolbar>
  <Grid
    container
    direction={'row'} 
    sx={{ 
        background: '#f4762a',
        height: '42px',
        color: '#fffff',
        display: { xs: 'none', sm: 'none', md: 'flex' } 
    }} 
    justifyContent='center'
    alignItems='center'   
  >

  </Grid>
  </>);
}