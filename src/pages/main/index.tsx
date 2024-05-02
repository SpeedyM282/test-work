import * as yup from "yup";
import { useState } from "react";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { categories, uid } from "../../helper";
import Product from "../../components/Product";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, Typography } from "@mui/material";
import CreateProductModal from "../../components/CreateProductModal";

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

const Main = () => {
	const [products, setProducts] = useState<IProduct[]>(
		JSON.parse(localStorage.getItem("products") || "[]")
	);
	const [open, setOpen] = useState(false);

	const useFormData = useForm<IProduct>({
		resolver: yupResolver(createProductSchema),
	});

	const addProduct = (data: IProduct) => {
		const newProduct = {
			...data,
			id: uid(),
		};

		const products = JSON.parse(localStorage.getItem("products") || "[]");
		products.push(newProduct);

		localStorage.setItem("products", JSON.stringify(products));
		setProducts((prev) => [...prev, newProduct]);
	};

	const updateProduct = (data: IProduct) => {
		let products = JSON.parse(localStorage.getItem("products") || "[]");
		products = products.map((e: IProduct) => (e.id === data.id ? data : e));

		localStorage.setItem("products", JSON.stringify(products));

		setProducts((prev) => prev.map((e) => (e.id === data.id ? data : e)));
	};

	const handleEditProduct = (product: IProduct) => {
		useFormData.reset(product);
		setOpen(true);
	};

	const handleDeleteProduct = async (id: string) => {
		await setProducts((prev) => prev.filter((e) => e.id !== id));

		localStorage.setItem("products", JSON.stringify(products));
	};

	const isUpdate = !!useFormData?.getValues()?.id;

	return (
		<>
			<CreateProductModal
				open={open}
				isUpdate={isUpdate}
				useFormData={useFormData}
				handleClose={() => setOpen(false)}
				onSaveData={isUpdate ? updateProduct : addProduct}
			/>

			<Stack
				py={5}
				px={10}
				gap={5}
				m="0 auto"
				maxWidth={1240}
				direction="column"
			>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h4">Products</Typography>

					<Button variant="contained" onClick={() => setOpen(true)}>
						Add Product
					</Button>
				</Stack>

				<Stack direction="row" gap={3}>
					{!!products.length &&
						categories.map((e) => (
							<Link key={e.text} to={`/?category=${e.text}`}>
								<Typography
									variant="body2"
									sx={{
										p: 1,
										fontWeight: 500,
										transition: "0.3s",
										borderBottom: "1px solid transparent",
										"&:hover": {
											color: "#1976d2",
											borderBottom: "1px solid #1976d2",
										},
									}}
								>
									{e.text}
								</Typography>
							</Link>
						))}
				</Stack>

				<Stack
					direction="row"
					gap={3.3}
					flexWrap="wrap"
					justifyContent="center"
				>
					{!!products.length ? (
						products.map((e) => (
							<Product
								key={e.id}
								price={e.price}
								title={e.title}
								description={e.description}
								handleEditProduct={() => handleEditProduct(e)}
								handleDeleteProduct={() => handleDeleteProduct(e.id || "")}
							/>
						))
					) : (
						<Typography variant="h4">There is no products yet 😔</Typography>
					)}
				</Stack>
			</Stack>
		</>
	);
};

export default Main;
