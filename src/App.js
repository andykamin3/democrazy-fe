import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import {Home} from "./routes/Home";
import {ProposalPage} from "./routes/ProposalPage";
import {BrowserRouter, Link as RouterLink, Route, Routes} from "react-router-dom";
import {ConnectWalletComponent} from "./components/ConnectWalletComponent";

import {Web3ReactProvider} from '@web3-react/core'
import {Web3Provider} from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {DAOPage} from "./routes/DAOPage";
import title from "./media/Title.png"
import { blueGrey } from '@mui/material/colors';
import { borderRight } from '@mui/system';

function getLibrary() {
  const p = new WalletConnectProvider({
    rpc: {
      69: process.env.ALCHEMY_URL,
    },
  });

  return new Web3Provider(p);
}

const drawerWidth = 240;

function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Toolbar />
      <List style={{
        textAlign: "center"
      }}>
        <ListItem to={"/"} component={RouterLink} key={'Home'}>
            <img 
              src={title} 
              alt="logo" 
              width={200}
              style={{
                marginLeft: -40,
                marginTop: -25
              }}
            />
        </ListItem>
      </List>
      <Box style={{
        position: "fixed",
        top: 120,
        width: 200,
        height: 500,
        borderRadius: 15,
        backgroundColor: blueGrey[900],
      }}>
      </Box>
      <List style={{
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        paddingBottom: 10,
      }} >
        <ListItem>
          <ListItemText><ConnectWalletComponent/></ListItemText>
        </ListItem>
      </List>

    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Web3ReactProvider getLibrary={getLibrary}>

    <BrowserRouter>
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>
      <div style={{borderRight: "2px solid #fff", height: 1000}}>
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label="menu"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      </div>
      <Box
        component="main"
        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
      >
        <Toolbar/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dao/:daoId/proposal/:proposalId" element={<ProposalPage />} />
            <Route path={"dao/:daoId"} element={<DAOPage />}/>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>

      </Box>
    </Box>
</BrowserRouter>
    </Web3ReactProvider>
  );
}


App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default App;
