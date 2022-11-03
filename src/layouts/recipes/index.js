import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import { Link } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

import SoftBadge from "components/SoftBadge";

function Recipes() {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [recipes, setRecipes] = useState([]);
	const [rows, setRows] = useState([]);

	const columns = [
		{ name: "id", align: "center" },
		{ name: "name", align: "left" },
		{ name: "description", align: "left" },
		{ name: "ingredients", align: "left" },
		{ name: "preparation", align: "left" },
		{ name: "instructions", align: "left" },
		{ name: "attributes", align: "left" },
		{ name: "productId", align: "left" },
		{ name: "categoryId", align: "left" },
		{ name: "action", align: "center" }
	];

	useEffect(() => {
		fetch("http://localhost:8000/api/Recipe/products")
			.then(res => res.json())
			.then(
				(data) => {
					console.log(data);
					setRecipes(data.recipes);
					setIsLoaded(true);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, []);

	useEffect(() => {
		if (recipes) {
			let newRows = [];

			recipes.map((recipe) => {
				newRows.push({
					id: (
						<SoftTypography variant="caption" color="primary" fontWeight="medium">
							{recipe.id}
						</SoftTypography>
					),
					name: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{recipe.name}
						</SoftTypography>
					),
					description: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{recipe.description}
						</SoftTypography>
					),
					ingredients: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{recipe.ingredients}
						</SoftTypography>
					),
					preparation: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{recipe.preparation}
						</SoftTypography>
					),
					instructions: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{recipe.instructions}
						</SoftTypography>
					),
					attributes: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{recipe.attributes}
						</SoftTypography>
					),
					productId: (
						<SoftTypography variant="caption" color="success" fontWeight="medium">
							{recipe.productId}
						</SoftTypography>
					),
					categoryId: (
						<SoftTypography variant="caption" color="success" fontWeight="medium">
							{recipe.categoryId}
						</SoftTypography>
					),
					action: (
						<SoftTypography
							component="a"
							href={ "/recipes/edit/" + recipe.id }
							variant="caption"
							color="secondary"
							fontWeight="medium"
						>
							Edit
						</SoftTypography>
					)
				});
			});

			setRows(newRows);
		}
	}, [recipes]);

	return (
		<DashboardLayout>
			<DashboardNavbar />

			<Card>
				<SoftBox pt={2} px={4} pb={2} display="flex" justifyContent="space-between" alignItems="center">
					<SoftTypography variant="h6" fontWeight="bold">
						Categories
					</SoftTypography>
					<SoftButton variant="gradient" color="dark" component={Link} to="/recipes/create">
						<Icon sx={{ fontWeight: "bold" }}>add</Icon>
						&nbsp;Create
					</SoftButton>
				</SoftBox>
				<SoftBox
					sx={{
						"& .MuiTableRow-root:not(:last-child)": {
							"& td": {
								borderBottom: ({ borders: { borderWidth, borderColor } }) =>
									`${borderWidth[1]} solid ${borderColor}`,
							},
						},
					}}
				>
					<Table columns={columns} rows={rows} />
				</SoftBox>
			</Card>

		</DashboardLayout>
	);
}

export default Recipes;
