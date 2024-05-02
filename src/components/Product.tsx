import CustomMenu from "./CustomMenu";
import noImage from "../assets/no_image.png";
import { Card, Stack, Typography, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps {
	id?: string;
	title: string;
	price: number;
	description: string;
	handleEditProduct: () => void;
	handleDeleteProduct: () => void;
}

const Product = ({
	id,
	title,
	price,
	description,
	handleEditProduct,
	handleDeleteProduct,
}: IProps) => {
	const navigate = useNavigate();

	return (
		<Card
			sx={{
				width: 250,
				height: 365,
				borderRadius: 3,
				boxShadow: "none",
				cursor: "pointer",
				transition: "0.3s",
				"&:hover": {
					boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
				},
			}}
			onClick={() => navigate(`/products/${id}`)}
		>
			<Stack
				sx={{
					height: "200px",
					bgcolor: "#eeeeee85",
					position: "relative",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundImage: `url(${noImage})`,
				}}
			>
				<CustomMenu
					handleEditProduct={handleEditProduct}
					handleDeleteProduct={handleDeleteProduct}
				/>
			</Stack>

			<CardContent>
				<Typography variant="h6">{title}</Typography>

				<Typography
					mt={2}
					variant="body2"
					overflow="hidden"
					whiteSpace="nowrap"
					color="text.secondary"
					textOverflow="ellipsis"
				>
					{description}
				</Typography>
			</CardContent>

			<Typography m={2} variant="h6">
				${price}
			</Typography>
		</Card>
	);
};

export default Product;
