import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";

function App() {
	return (
		<>
			<BrowserRouter>
				<Layout>
				</Layout>
			</BrowserRouter>
		</>
	);
}

export default App;
