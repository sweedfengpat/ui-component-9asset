import { Close, NavigateBefore } from "@mui/icons-material";
import { Box, IconButton, Toolbar, styled } from "@mui/material";

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  '@media all': {
    minHeight: 48,
  },
}));

export interface MobileToolbarProps {
  title: string;
  isBackable?: boolean;
  additionalAction?: React.ReactNode;
  onBackRequested?: () => void;
  onClose?: () => void;
}

export const MobileToolbar = (props: MobileToolbarProps) => {
  const closeButton = (
  <IconButton 
    sx={{ position: 'absolute', right: 4, color: (theme) => theme.palette.grey[500] }}
    onClick={() => { props.onClose && props.onClose() }}
  >
    <Close />
  </IconButton>);
    
  return (
  <StyledToolbar sx={{ display: { xs:'flex', sm: 'none'}, paddingLeft: { xs: '0px', sm:'16px' }, paddingRight: props.onClose ? '50px' : '16px' }}>
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
        {
          props.isBackable && (
          <IconButton 
            sx={{ }}
            color="primary"
            onClick={() => { props.onBackRequested?.() }}
          >
            <NavigateBefore />
          </IconButton>)
        }
        <Box component="span" sx={{ pl: props.isBackable ? 1 : 2, paddingTop: '0px', fontWeight: '600', color: 'black' }}>{props.title}</Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        { props.additionalAction }
      </Box>
    </Box>
    { props.onClose ? closeButton : null } 
  </StyledToolbar>
  );
}