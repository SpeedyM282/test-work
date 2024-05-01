import { useState } from "react";
import CreateProductModal from "../../components/CreateProductModal";
import Product from "../../components/Product";
import { Button, Stack, Typography } from "@mui/material";

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

				<Stack border="1px solid red">
					<Typography variant="h6">Categories</Typography>
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
