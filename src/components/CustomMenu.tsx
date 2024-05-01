import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Menu, Divider, MenuItem, IconButton, Tooltip } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const menuItemStyles = {
	py: 1,
	px: 1.5,
	fontSize: 14,
	display: "flex",
	alignItems: "center",
	gap: 1,
};

const CustomMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Tooltip title="Options">
				<IconButton
					onClick={handleClick}
					sx={{
						position: "absolute",
						top: 3,
						right: 3,
					}}
				>
					<MoreVertIcon />
				</IconButton>
			</Tooltip>

			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				sx={{
					"& .MuiMenu-list": {
						padding: 0,
					},
				}}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 0.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&::before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem sx={menuItemStyles} onClick={handleClose}>
					<EditOutlinedIcon sx={{ fontSize: 22 }} />
					Edit
				</MenuItem>

				<Divider sx={{ margin: "0 !important" }} />

				<MenuItem
					onClick={handleClose}
					sx={{ ...menuItemStyles, color: "#E11D48" }}
				>
					<DeleteOutlineRoundedIcon sx={{ fontSize: 22 }} />
					Delete
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomMenu;
