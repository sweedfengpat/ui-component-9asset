import { Box, CssBaseline, styled } from "@mui/material";
import { SellerAppBar as AppBar } from '../components/AppBar/SellerAppBar';

const LayoutRoot = styled(Box)({
  display: 'flex'
});

export interface SellerLayoutProps {
  namespace?: string;
}

export const SellerLayout = (props: SellerLayoutProps) => {

  const getTitle = () => {
    return 'Seller Center';
  }

  return (
    <LayoutRoot>
      <CssBaseline />
      <AppBar
        namespace={props.namespace || 'common'}
        title={getTitle()}
      />

    </LayoutRoot>
  );
}

export default SellerLayout;