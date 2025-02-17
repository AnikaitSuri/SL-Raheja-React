// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./sidebarContext";

import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import DefultProfile from "../../../assets/user.webp";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutIcon from "@mui/icons-material/Logout";
// import AddBanner from "../../homeBanner";

import { logout, getUserDetails } from "../../../utils/auth";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const user = getUserDetails();

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {user?.usertype}
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={DefultProfile}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              All Banners Update
            </Typography>
            <Item
              title="Add Banner"
              to="/add-bannerscms"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List All Banners"
              to="/list-bannerscms"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Home Banner
            </Typography>
            <Item
              title="Add Banner"
              to="/add-banner"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Banners List"
              to="/banners-list"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Tech Patient
            </Typography>
            <Item
              title="Add Tech Patient"
              to="/add-tech-patient"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Patient Tech List"
              to="/tech-patients"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Patient Stories
            </Typography>
            <Item
              title="Add Patient Stories"
              to="/add-patient-story"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Patient Stories List"
              to="/patient-stories"
              icon={<BurstModeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Events
            </Typography>
            <Item
              title="Add Events"
              to="/add-upcoming-event"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Events List"
              to="/upcoming-event-list"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Better Info Health
            </Typography>
            <Item
              title="Add Better Info Health"
              to="/add-better-info-health"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Better Info Health List"
              to="/list-better-info-health"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Doctors
            </Typography>
            <Item
              title="Add Doctors"
              to="/add-doctor"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Doctors"
              to="/list-doctors"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Specialties
            </Typography>
            <Item
              title="Add Specialties"
              to="/add-specialties"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Specialties"
              to="/list-specialties"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              About Page
            </Typography>
            <Item
              title="Add Why Choose"
              to="/add-why-slraheja"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Why Choose"
              to="/about-why-slraheja-list"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Awards Accolades"
              to="/awards-accolades-list"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Awards Accolades"
              to="/add-awards-accolades"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Career Page
            </Typography>
            <Item
              title="Add Jobs"
              to="/add-career-job"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Jobs"
              to="/career-jobs"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Career at Raheja"
              to="/add-career-at-raheja"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Career At Raheja"
              to="/list-career-at-raheja"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Contact Page
            </Typography>
            <Item
              title="Add Contact Info"
              to="/add-contact-info"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Contact Info"
              to="/list-contact-info"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Health Checkup Page
            </Typography>
            <Item
              title="Add Health Checkup"
              to="/add-health-checkup"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Health Checkup"
              to="/list-health-checkup"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Health Package"
              to="/add-health-checkup-package"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Health Package"
              to="/list-health-checkup-package"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Health Test Inclusion"
              to="/add-health-checkup-test-inclusion"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Health Test Inclusion"
              to="/list-health-checkup-test-inclusion"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Academics Page
            </Typography>
            <Item
              title="Add Academics Overview"
              to="/add-academics-overview"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Academics Overview"
              to="/list-academics-overview"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Academics Program Details"
              to="/add-academics-program-details"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="List Academics Program Details"
              to="/list-academics-program-details"
              icon={<CoPresentIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Pages
            </Typography>

            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <MenuItem
              style={{
                marginTop: "auto", // Ensure logout button is at the bottom
                color: colors.grey[100],
              }}
              onClick={logout} // Call the logout function on click
              icon={<LogoutIcon />}
            >
              <Typography>Logout</Typography>
            </MenuItem>

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
