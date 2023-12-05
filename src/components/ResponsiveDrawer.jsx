import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GridViewIcon from "@mui/icons-material/GridView";
import { mdiHandCoin } from "@mdi/js";
import { mdiFinance } from "@mdi/js";
import Icon from "@mdi/react";
import WalletIcon from "@mui/icons-material/Wallet";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const drawerWidth = 180;
const iconColor = "#fff";

const icons = {
  Dashboard: <GridViewIcon sx={{ color: `${iconColor}` }} />,
  Income: <Icon color={iconColor} path={mdiHandCoin} size={1} />,
  Expenses: <WalletIcon sx={{ color: `${iconColor}` }} />,
  Investments: <Icon color={iconColor} path={mdiFinance} size={1} />,
  Insights: <AnalyticsIcon sx={{ color: `${iconColor}` }} />,
  Settings: <SettingsIcon sx={{ color: `${iconColor}` }} />,
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          "Dashboard",
          "Income",
          "Expenses",
          "Investments",
          "Insights",
          "Settings",
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ "& .MuiListItemIcon-root": { minWidth: 40 } }}
            component={Link}
            to={text}
          >
            <ListItemButton dense>
              <ListItemIcon sx={{ fontSize: 12 }}>{icons[text]}</ListItemIcon>
              <ListItemText sx={{ color: "#fff" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#0a7d5c",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 30,
            },
          }}
          open
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, m: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Drawer>
      </Box>
      {props.children}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
