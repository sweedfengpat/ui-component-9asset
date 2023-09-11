import { AppBar, useTheme } from "@mui/material";

export interface MainAppBarProps {

}

export const MainAppBar = (props: MainAppBarProps) => {
  const theme = useTheme();

  return (
  <AppBar position="fixed" color={'inherit'} style={{ zIndex: theme.zIndex.drawer + 1 }}>

  </AppBar>
  );
}