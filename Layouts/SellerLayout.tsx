import { Box, CssBaseline, styled } from "@mui/material";
import { SellerAppBar as AppBar } from '../components/AppBar/SellerAppBar';

const LayoutRoot = styled(Box)({
  display: 'flex'
});

export interface SellerLayoutProps {
  namespace?: string;
}

export const SellerLayout = (props: SellerLayoutProps) => {
  return (
    <LayoutRoot>
      <CssBaseline />

      <AppBar namespace={props.namespace || 'common'} />
    </LayoutRoot>
  );
}

export default SellerLayout;