import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../helper";
import Product from "../../components/Product";
import { Button, Stack, Typography } from "@mui/material";
import CreateProductModal from "../../components/CreateProductModal";

const Main = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<CreateProductModal open={open} handleClose={handleClose} />

			<Stack
				maxWidth={1240}
				m="0 auto"
				py={5}
				px={10}
				direction="column"
				gap={5}
			>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h4">Products</Typography>

					<Button variant="contained" onClick={handleOpen}>
						Add Product
					</Button>
				</Stack>

				<Stack direction="row" gap={3}>
					{categories.map((e) => (
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
					<Product
						price={22}
						title="Lorem ipsum"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus culpa quisquam, in delectus et sequi ullam nisi alias totam tenetur adipisci explicabo voluptas repudiandae error unde omnis ut laboriosam voluptatibus."
					/>
					<Product
						price={22}
						title="Lorem ipsum"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus culpa quisquam, in delectus et sequi."
					/>
					<Product
						price={22}
						title="Lorem ipsum"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus culpa quisquam, in delectus et sequi."
					/>
					<Product
						price={22}
						title="Lorem ipsum"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus culpa quisquam, in delectus et sequi."
					/>
				</Stack>
			</Stack>
		</>
	);
};

export default Main;
