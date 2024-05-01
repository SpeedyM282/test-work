import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { categories } from "../helper";

interface IProps {
	open: boolean;
	handleClose: () => void;
}

interface FormData {
	title: string;
	price: number;
	category: string;
	description: string;
}

const modalStyle = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 550,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: 2.5,
	border: "none",
	outline: "none",
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

	const createProductSchema = yup.object().shape({
		category: yup.string().required("Category is required"),
		title: yup
			.string()
			.min(5, "Title must contain at least 5 characters")
			.required("Title is required"),
		description: yup
			.string()
			.min(25, "Description must contain at least 25 characters")
			.required("Description is required"),
		price: yup
			.number()
			.typeError("Price is required")
			.required("Price is required"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(createProductSchema),
	});

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	const onClose = () => {
		handleClose();
	};

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Stack sx={modalStyle}>
				<Stack direction="row" justifyContent="space-between" mb={2}>
					<Typography variant="h6">Add Product</Typography>

					<IconButton onClick={onClose}>
						<CloseRoundedIcon />
					</IconButton>
				</Stack>

				<Stack
					component="form"
					direction="column"
					gap={3}
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormControl fullWidth {...register("category")}>
						<InputLabel id="demo-simple-select-label">Category</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={age}
							label="Category"
							onChange={handleChange}
							error={!!errors.category}
						>
							{categories.map((e) => (
								<MenuItem key={e.text} sx={menuItemStyles} value={e.text}>
									{e.icon}
									{e.text}
								</MenuItem>
							))}
						</Select>
						{!!errors.category && (
							<Typography ml={2} color="error" variant="caption">
								{errors.category.message}
							</Typography>
						)}
					</FormControl>

					<Stack direction="row" gap={3}>
						<TextField
							label="Title"
							{...register("title")}
							error={!!errors.title}
							helperText={errors.title?.message}
						/>
						<TextField
							label="Price $"
							type="number"
							{...register("price")}
							error={!!errors.price}
							helperText={errors.price?.message}
						/>
					</Stack>

					<TextField
						rows={5}
						multiline
						label="Description"
						{...register("description")}
						error={!!errors.description}
						helperText={errors.description?.message}
					/>

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
