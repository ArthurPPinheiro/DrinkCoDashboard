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

function Categories() {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [categories, setCategories] = useState([]);
	const [rows, setRows] = useState([]);

	const columns = [
		{ name: "id", align: "center" },
		{ name: "name", align: "left" },
		{ name: "description", align: "left" },
		{ name: "isAProductCategory", align: "center" },
		{ name: "action", align: "center" }
	];

	useEffect(() => {
		fetch("http://localhost:8000/api/Category/categories")
			.then(res => res.json())
			.then(
				(data) => {
					console.log(data);
					setCategories(data.categories);
					setIsLoaded(true);
				},
				(error) => {
					console.log(error);
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	useEffect(() => {
		if (categories) {
			let newRows = [];

			categories.map((category) => {
				newRows.push({
					id: (
						<SoftTypography variant="caption" color="primary" fontWeight="medium">
							{category.id}
						</SoftTypography>
					),
					name: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{category.name}
						</SoftTypography>
					),
					description: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{category.description.length > 50 ? category.description.substring(0, 50) + '...' : category.description}
						</SoftTypography>
					),
					isAProductCategory: (
						<SoftBadge variant="gradient" badgeContent="Product" color="success" size="xs" container />
					),
					action: (
						<SoftTypography
							component="a"
							href={ "/categories/edit/" + category.id }
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
	}, [categories]);

	return (
		<DashboardLayout>
			<DashboardNavbar />

			<Card>
				<SoftBox pt={2} px={4} pb={2} display="flex" justifyContent="space-between" alignItems="center">
					<SoftTypography variant="h6" fontWeight="bold">
						Categories
					</SoftTypography>
					<SoftButton variant="gradient" color="dark" component={Link} to="/categories/create">
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

export default Categories;
