import DefaultLayout from "@/layouts/DefaultLayout";
import {
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import Loader from "@/components/Loader";
import { Toaster } from "./ui/toaster";
import NotFoundView from "@/modules/not-found/NotFoundView";
import HomeView from "@/modules/home/HomeView";
import { Provider } from "./ui/provider";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "",
				element: <HomeView />,
            }
		],
	},
	{
		path: "*",
		element: <NotFoundView />,
	},
]);

const Wrapper = () => {

	return (
		<>
			<Provider>
                <Loader />
                <Toaster />
                <RouterProvider router={router}></RouterProvider>
			</Provider>
		</>
	);
};

export default Wrapper;