import "./index.css";
import Main from "./pages/main";
import ReactDOM from "react-dom/client";
import ProductPage from "./pages/product";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/main" />,
	},
	{
		path: "/main",
		element: <Main />,
	},
	{
		path: "/products/:productId",
		element: <ProductPage />,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
