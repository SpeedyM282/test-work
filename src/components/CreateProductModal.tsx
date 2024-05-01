import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import BlenderRoundedIcon from "@mui/icons-material/BlenderRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import {
	Modal,
	Stack,
	Select,
	Button,
	MenuItem,
	TextField,
	Typography,
	InputLabel,
	IconButton,
	FormControl,
	SelectChangeEvent,
} from "@mui/material";

interface IProps {
	open: boolean;
	handleClose: () => void;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: 2.5,
	p: 3,
};

const menuItemStyles = {
	py: 1,
	px: 1.5,
	fontSize: 14,
	display: "flex",
	alignItems: "center",
	gap: 1,
};

const CreateProductModal = ({ open, handleClose }: IProps) => {
	const [age, setAge] = useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	const onClose = () => {
		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Stack sx={style}>
				<Stack direction="row" justifyContent="space-between" mb={2}>
					<Typography variant="h6">Add Product</Typography>

					<IconButton onClick={onClose}>
						<CloseRoundedIcon />
					</IconButton>
				</Stack>

				<Stack component="form" direction="column" gap={3}>
					<TextField label="Title" />

					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Category</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={age}
							label="Category"
							onChange={handleChange}
						>
							<MenuItem sx={menuItemStyles} value={10}>
								<HeadphonesRoundedIcon />
								Elektronika
							</MenuItem>
							<MenuItem sx={menuItemStyles} value={20}>
								<BlenderRoundedIcon />
								Maishiy texnika
							</MenuItem>
							<MenuItem sx={menuItemStyles} value={30}>
								<CheckroomRoundedIcon />
								Kiyim
							</MenuItem>
							<MenuItem sx={menuItemStyles} value={30}>
								<BusinessCenterRoundedIcon />
								Aksessuarlar
							</MenuItem>
							<MenuItem sx={menuItemStyles} value={30}>
								<FavoriteRoundedIcon />
								Salomatlik
							</MenuItem>
						</Select>
					</FormControl>

					<TextField label="Description" multiline rows={5} />

					<Stack direction="row" gap={3}>
						<Button fullWidth variant="outlined" onClick={onClose}>
							Cancel
						</Button>
						<Button fullWidth variant="contained" type="submit">
							Save
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Modal>
	);
};

export default CreateProductModal;
