import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  Menu,
  Close,
  SearchOutlined,
  Add
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen, setLogout } from "../../state";
import { useState } from "react";

const Navbar = () =>{
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
    const user = useSelector((state) => state.cart.user);
    const fullName = `${user.firstName} ${user.lastName}`;
  
    return ( 
    <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor="rgba(255, 255, 255, 0.95)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
    >
        <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          CASTERs OF YOUR FASHION
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >

      {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <>
          {/* user */}

        {user._id === '65f869337016a3c58ee361c0' &&
        <IconButton sx={{ color: "black" }} onClick={() => navigate('/addItem')}>
          <Add />
        </IconButton>
        }
        <IconButton sx={{ color: "black" }}>
          <SearchOutlined />
        </IconButton>
        <IconButton sx={{ color: "black" }} onClick={() => navigate('/login')}>
          <PersonOutline />
        </IconButton>
        <Badge
          badgeContent={cart.length}
          color="secondary"
          invisible={cart.length === 0}
          sx={{
            "& .MuiBadge-badge": {
              right: 5,
              top: 5,
              padding: "0 4px",
              height: "14px",
              minWidth: "13px",
            },
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(setIsCartOpen({}))
              // dispatch(setLogin({
              //   user: {firstName:'Ansh',lastName: 'Patel',email: 'fakemail@gmail.com',password: 'password',location: 'location'},
              //   token: 'fdsfsdfsd'
              // }))
            
            }}
            sx={{ color: "black" }}
          >
            <ShoppingBagOutlined />
          </IconButton>
        </Badge>
        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={{
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
            }}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() =>{dispatch(setLogout())}}>Log Out</MenuItem>
          </Select>
        </FormControl>
        </>
        ) : (
          
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            {!isMobileMenuToggled ?  <Menu /> : <Close /> }
            {/* {!isMobileMenuToggled ?  <Menu /> : <Close /> } */}
          </IconButton>
        )}
          
          {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          // backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="2rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              {/* <Close /> */}
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
            backgroundColor="white"
          >
            {user._id === '65f869337016a3c58ee361c0' &&
              <IconButton sx={{ color: "black" }} onClick={() => navigate('/addItem')}>
                <Add />
              </IconButton>
            }
            <IconButton sx={{ color: "black" }}>
          <SearchOutlined />
        </IconButton>
        <IconButton sx={{ color: "black" }} onClick={() => navigate('/login')}>
          <PersonOutline />
        </IconButton>
        <Badge
          badgeContent={cart.length}
          color="secondary"
          invisible={cart.length === 0}
          sx={{
            "& .MuiBadge-badge": {
              right: 5,
              top: 5,
              padding: "0 4px",
              height: "14px",
              minWidth: "13px",
            },
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(setIsCartOpen({}))
              // dispatch(setLogin({
              //   user: {firstName:'Ansh',lastName: 'Patel',email: 'fakemail@gmail.com',password: 'password',location: 'location'},
              //   token: 'fdsfsdfsd'
              // }))
            
            }}
            sx={{ color: "black" }}
          >
            <ShoppingBagOutlined />
          </IconButton>
        </Badge>
        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={{
              // backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              // "& .MuiSelect-select:focus": {
              //   backgroundColor: neutralLight,
              // },
            }}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() =>{dispatch(setLogout())}}>Log Out</MenuItem>
          </Select>
          </FormControl>
          </Box>
        </Box>
      )}
          {/* {isNonMobileScreens ? (
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                // backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                // "& .MuiSelect-select:focus": {
                //   backgroundColor: neutralLight,
                // },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() =>{dispatch(setLogout())}}>Log Out</MenuItem>
            </Select>
          </FormControl>
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }} onClick={() => navigate('/login')}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => {
                dispatch(setIsCartOpen({}))
                dispatch(setLogin({
                  user: {firstName:'Ansh',lastName: 'Patel',email: 'fakemail@gmail.com',password: 'password',location: 'location'},
                  token: 'fdsfsdfsd'
                }))
              
              }}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
          )
        :(
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        )    
        } */}
        </Box>
      </Box>
    </Box>
    );
}

export default Navbar;