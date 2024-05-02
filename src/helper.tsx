import BlenderRoundedIcon from "@mui/icons-material/BlenderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";

export const categories = [
	{
		icon: <HeadphonesRoundedIcon />,
		text: "Electronics",
	},
	{
		icon: <BlenderRoundedIcon />,
		text: "Appliances",
	},
	{
		icon: <CheckroomRoundedIcon />,
		text: "Clothes",
	},
	{
		icon: <BusinessCenterRoundedIcon />,
		text: "Accessories",
	},
	{
		icon: <FavoriteRoundedIcon />,
		text: "Health",
	},
];

export const uid = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
