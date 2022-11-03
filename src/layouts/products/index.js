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

function Products() {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [products, setProducts] = useState([]);
	const [rows, setRows] = useState([]);

	const columns = [
		{ name: "id", align: "center" },
		{ name: "name", align: "left" },
		{ name: "description", align: "left" },
		{ name: "attributes", align: "left" },
		{ name: "categoryId", align: "left" },
		{ name: "active", align: "center" },
		{ name: "action", align: "center" }
	];

	useEffect(() => {
		fetch("http://localhost:8000/api/Product/products")
			.then(res => res.json())
			.then(
				(data) => {
					console.log(data);
					setProducts(data.products);
					setIsLoaded(true);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, []);

	useEffect(() => {
		if (products) {
			let newRows = [];

			products.map((product) => {
				newRows.push({
					id: (
						<SoftTypography variant="caption" color="primary" fontWeight="medium">
							{product.id}
						</SoftTypography>
					),
					name: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{product.name}
						</SoftTypography>
					),
					description: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{product.description}
						</SoftTypography>
					),
					attributes: (
						<SoftTypography variant="caption" color="secondary" fontWeight="medium">
							{product.attributes}
						</SoftTypography>
					),
					categoryId: (
						<SoftTypography variant="caption" color="success" fontWeight="medium">
							{product.categoryId}
						</SoftTypography>
					),
					active: (
						<SoftBadge variant="gradient" badgeContent={ product.active ? "Active" : "Inactive" } color={ product.active ? "success" : "danger" } size="xs" container />
					),
					action: (
						<SoftTypography
							component="a"
							href={ "/products/edit/" + product.id }
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
	}, [products]);

	return (
		<DashboardLayout>
			<DashboardNavbar />

			<Card>
				<SoftBox pt={2} px={4} pb={2} display="flex" justifyContent="space-between" alignItems="center">
					<SoftTypography variant="h6" fontWeight="bold">
						Categories
					</SoftTypography>
					<SoftButton variant="gradient" color="dark" component={Link} to="/products/create">
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

export default Products;
