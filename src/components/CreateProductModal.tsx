import { useEffect } from "react";
import { IProduct } from "../types";
import { categories } from "../helper";
import { menuItemStyles, modalStyles } from "./styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
	SubmitHandler,
	Control,
	FormState,
	UseFormGetValues,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormReset,
	UseFormSetValue,
	UseFormWatch,
	Controller,
} from "react-hook-form";
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
} from "@mui/material";

export interface IProductFormProps {
	reset: UseFormReset<IProduct>;
	watch: UseFormWatch<IProduct>;
	formState: FormState<IProduct>;
	control: Control<IProduct, any>;
	register: UseFormRegister<IProduct>;
	setValue: UseFormSetValue<IProduct>;
	getValues: UseFormGetValues<IProduct>;
	handleSubmit: UseFormHandleSubmit<IProduct, undefined>;
}

interface IProps {
	open: boolean;
	isUpdate: boolean;
	handleClose: () => void;
	useFormData: IProductFormProps;
	onSaveData: (data: IProduct) => void;
}

const CreateProductModal = ({
	open,
	isUpdate,
	onSaveData,
	handleClose,
	useFormData,
}: IProps) => {
	const {
		reset,
		control,
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useFormData;

	const onClose = () => {
		reset();
		handleClose();
	};

	const onSubmit: SubmitHandler<IProduct> = (data) => {
		onSaveData(data);
		onClose();
	};

	useEffect(() => {
		if (open) {
			reset({});
		}
	}, [open]);

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Stack sx={modalStyles}>
				<Stack direction="row" justifyContent="space-between" mb={2}>
					<Typography variant="h6">
						{isUpdate ? "Update" : "Add"} Product
					</Typography>

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
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									{...field}
									label="Category"
									id="demo-simple-select"
									error={!!errors.category}
									value={getValues().category || ""}
									labelId="demo-simple-select-label"
								>
									{categories.map((e) => (
										<MenuItem key={e.text} sx={menuItemStyles} value={e.text}>
											<Typography
												gap={1}
												fontSize={16}
												display="flex"
												alignItems="center"
											>
												{e.icon}
												{e.text}
											</Typography>
										</MenuItem>
									))}
								</Select>
								{!!errors.category && (
									<Typography ml={2} color="error" variant="caption">
										{errors.category.message}
									</Typography>
								)}
							</FormControl>
						)}
					/>

					<Stack direction="row" gap={3}>
						<TextField
							fullWidth
							label="Title"
							{...register("title")}
							error={!!errors.title}
							helperText={errors.title?.message}
						/>
						<TextField
							fullWidth
							type="number"
							label="Price $"
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
