import { Breadcrumbs, Stack, Typography } from "@mui/material";
import noImage from "../../assets/no_image.png";
import { useEffect, useState } from "react";
import { IProduct } from "../../types";
import { Link, useParams } from "react-router-dom";

const ProductPage = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState<IProduct>();

	useEffect(() => {
		const products = JSON.parse(localStorage.getItem("products") || "[]");

		setProduct(products.find((e: IProduct) => e.id === productId));
	}, []);

	return (
		<Stack p={5} m="0 auto" maxWidth={1240} direction="column" gap={3}>
			<Breadcrumbs aria-label="breadcrumb">
				<Link style={{ color: "#999", fontSize: 14 }} to="/main">
					Main
				</Link>
				<Link
					style={{ color: "#999", fontSize: 14 }}
					to={`/main/?category=${product?.category}`}
				>
					{product?.category}
				</Link>
				<Typography color="text.primary" fontSize={14}>
					{product?.title}
				</Typography>
			</Breadcrumbs>

			<Stack direction="row" gap={7} justifyContent="center" flexWrap="wrap">
				<Stack
					sx={{
						height: 500,
						width: "40%",
						maxWidth: 400,
						minWidth: 300,
						borderRadius: 3,
						bgcolor: "#eeeeee85",
						backgroundSize: "cover",
						border: "1px solid #dddddd",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundImage: `url(${noImage})`,
					}}
				></Stack>

				<Stack
					width="60.5%"
					maxWidth={800}
					minWidth={300}
					direction="column"
					gap={2}
				>
					<Typography variant="h4">{product?.title}</Typography>
					<Typography
						fontSize={18}
						dangerouslySetInnerHTML={{
							__html: product?.description.replaceAll("\n", "<br/>") || "<></>",
						}}
					></Typography>

					<Typography variant="h6">${product?.price}</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default ProductPage;
