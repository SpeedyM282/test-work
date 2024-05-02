import * as yup from "yup";
import { IProduct } from "../../types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { categories, uid } from "../../helper";
import Product from "../../components/Product";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useSearchParams } from "react-router-dom";
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
	const [open, setOpen] = useState(false);
	const [searchParams, _] = useSearchParams();
	const [products, setProducts] = useState<IProduct[]>([]);
	const category = searchParams.get("category") || "";

	const useFormData = useForm<IProduct>({
		resolver: yupResolver(createProductSchema),
	});

	useEffect(() => {
		console.log(category);
		if (category) {
			const products = JSON.parse(localStorage.getItem("products") || "[]");
			setProducts(products.filter((e: IProduct) => e.category === category));
		} else {
			setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
		}
	}, [category]);

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
		let products = JSON.parse(localStorage.getItem("products") || "[]");
		products = products.filter((e: IProduct) => e.id !== id);

		localStorage.setItem("products", JSON.stringify(products));

		setProducts((prev) => prev.filter((e) => e.id !== id));
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
					<Link to="/main">
						<Typography
							variant="body2"
							sx={{
								p: 1,
								fontWeight: 500,
								transition: "0.3s",
								borderBottom: "1px solid",
								color: !category ? "#1976d2" : "#000",
								borderColor: !category ? "#1976d2" : "transparent",
								"&:hover": {
									color: "#1976d2",
									borderBottom: "1px solid #1976d2",
								},
							}}
						>
							All
						</Typography>
					</Link>
					{categories.map((e) => (
						<Link key={e.text} to={`/main?category=${e.text}`}>
							<Typography
								variant="body2"
								sx={{
									p: 1,
									fontWeight: 500,
									transition: "0.3s",
									borderBottom: "1px solid",
									color: category === e.text ? "#1976d2" : "#000",
									borderColor: category === e.text ? "#1976d2" : "transparent",
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
								id={e.id}
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
