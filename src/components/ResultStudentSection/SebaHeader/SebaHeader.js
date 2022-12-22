import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useAuth } from "../../../contexts/authContext";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const pages = [ "ContactUs"];
const settings = ["Profile", "History", "Logout"];

const SebaHeader = ({profile,handleOpenNotification}) => {
  const {auth,logout,setSearchTerm,setBookLoad,currentUser}=useAuth();

  const handleSearch = (e) => {
    
    let tempSearchTerm = e.target.value.trim();
    if((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
      setSearchTerm("all");
    } else {
      setSearchTerm(e.target.value.trim());
      setBookLoad(true);
    }
    console.log(e.target.value.trim());
  }; 

   const navigate=useNavigate();
   
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((text, index) => (
          <>
            <ListItem button key={text}>
              <ListItemIcon onClick={()=>{navigate(`/${text}/`)}}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            <Divider />
          </>
        ))}
        <ListItem button key="Notification" onClick={()=>{navigate(`/notification/`)}}>
          <ListItemIcon>
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon color="action" />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Notification" />
        </ListItem>
      </List>
    </Box>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{position:'sticky',left:"-2px",top:'-2px', zIndex:'999'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
          <Link to='/' className="textnone">

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" },justifyItems:'start' }}
          >
          ONLINE SEBA
          </Typography>
          </Link>
          

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              //   onClick={handleOpenNavMenu}
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawer>
          </Box>
          <Link to='/' className="textnone">
          <Typography
            variant="h6"
            noWrap
            component="h6"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            ONLINE SEBA
          </Typography>
          </Link>
          {auth&&<><Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={`/${page}/`} className="textnone ">
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
              </Link>
            ))}
            <Link to="/notification/" className="textnone ">
            <Button
              key="Notification"
              onClick={handleOpenNotification }
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Notifications
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon color="action" />
              </Badge>
            </Button>
            </Link>
           

          </Box>
         </>}

        
          {auth&&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={currentUser.fname}
                  src={currentUser.avatar}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                 <MenuItem onBlur={handleCloseUserMenu}>
                  <Link to='/profile/'>Profile</Link>
                </MenuItem>
                <MenuItem  onBlur={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={async()=>{
                 logout();
                
                  navigate('/seba-login/')
                
                
                }} >Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
  export default SebaHeader;
