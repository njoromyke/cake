import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useCart } from "../context/CartContext";
import { ShoppingBasket } from "@mui/icons-material";
import { useUserAuth } from "../context/UserAuthContext";
import { getAuth } from "firebase/auth";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const NavBar = () => {
  const { palette } = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState([]);

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
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { logout } = useUserAuth();

  const myUser = getAuth().currentUser;



  const usersRef = collection(db, "users");

  React.useEffect(() => {
    async function getUser() {
      const user = await getDocs(usersRef);
      setUserInfo(user.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUser();
  }, []);

  // get user from user who is same as logged in user
  const userLogged = userInfo?.filter((user) => user.email === myUser.email);

    const handleLogout = async () => {
      try {
        await logout();
        clearCart();
        navigate("/");
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              navigate("/home");
            }}
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
          >
            Cakerize
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/");
                  }}
                  variant="subtitle1"
                >
                  Home
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/orders");
                  }}
                  variant="subtitle1"
                >
                  My Orders
                </Typography>
              </MenuItem>
              {userLogged && userLogged[0]?.isAdmin && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    onClick={() => {
                      navigate("/admin/orders");
                    }}
                    variant="subtitle1"
                  >
                    Orders
                  </Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Box
                  sx={{
                    ml: 1,
                    position: "relative",
                  }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <ShoppingBasket />
                  <Typography
                    variant="caption"
                    sx={{
                      color: palette.primary.contrastText,
                      position: "absolute",
                      top: "20%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {cart.total > 0 ? `(${cart.total})` : 0}
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
              }}
              sx={{
                color: palette.primary.contrastText,
              }}
            >
              Home
            </Button>

            <Button
              onClick={() => {
                navigate("/orders");
              }}
              sx={{
                color: palette.primary.contrastText,
              }}
            >
              My Orders
            </Button>
            {userLogged && userLogged[0]?.isAdmin && (
              <>
                <Button
                  onClick={() => {
                    navigate("/admin/orders");
                  }}
                  sx={{
                    color: palette.primary.contrastText,
                  }}
                >
                  Admin Orders
                </Button>
                <Button
                  onClick={() => {
                    navigate("/admin/products");
                  }}
                  sx={{
                    color: palette.primary.contrastText,
                  }}
                >
                  Amin Products
                </Button>
              </>
            )}
            <Button
              onClick={() => {
                navigate("/cart");
              }}
              sx={{
                color: palette.primary.contrastText,
              }}
            >
              Cart
              <Box
                sx={{
                  display: { xs: "none", md: "inline" },
                  ml: 1,
                  position: "relative",
                }}
              >
                <ShoppingBasket />
                <Typography
                  variant="caption"
                  sx={{
                    color: palette.primary.contrastText,
                    position: "absolute",
                    top: "20%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {cart.total > 0 ? `(${cart.total})` : 0}
                </Typography>
              </Box>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
