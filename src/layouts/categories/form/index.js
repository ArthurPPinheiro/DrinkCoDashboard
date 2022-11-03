import React, { useState, useEffect } from "react";
import { Card, Grid, Switch } from "@mui/material";

import { useParams } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftAlert from "components/SoftAlert";

function CategoriesForm() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isAProductCategory, setIsAProductCategory] = useState(false);
	const [message, setMessage] = useState("");
	const [category, setCategory] = useState([]);


	const { method, id } = useParams();

	console.log(method, id);

	if (method == "edit") {
		useEffect(() => {
			fetch("https://mocki.io/v1/9c5f13b3-e655-4ff7-bed0-d3fee3a57947")
				.then(res => res.json())
				.then(
					(data) => {
						console.log(data);
						setCategory(data);
						setName(data.name);
						setDescription(data.description);
						setIsAProductCategory(data.isAProductCategory);
					}
				)
		}, []);
	}

	let handleSubmitCreate = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch("http://localhost:8000/api/Category/create", {
				method: "POST",
				headers: {
					'Accept': 'application/json, text/plain',
					'Content-Type': 'application/json;charset=UTF-8'
				},
				body: JSON.stringify({
					name: name,
					description: description,
					isAProductCategory: isAProductCategory,
				}),
			});

			if (res.status === 200) {
				setName("");
				setDescription("");
				setIsAProductCategory(false);

				setMessage("Category created");
			} else {
				setMessage("Some error occured");
			}
		} catch (err) {
			console.log("error", err);
		}
	};

	let handleSubmitEdit = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch("http://localhost:8000/api/Category/update", {
				method: "PUT",
				body: JSON.stringify({
					name: name,
					description: description,
					isAProductCategory: isAProductCategory,
				}),
			});
			let resJson = await res.json();

			if (res.status === 200) {
				setName("");
				setDescription("");
				setIsAProductCategory(false);

				setMessage("Category edited");
			} else {
				setMessage("Some error occured");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<Card>

				<SoftBox px={6} pb={6}>
					<SoftBox pt={4} pb={4} >
						<SoftTypography variant="h6" fontWeight="bold">
							{method == "edit" ? "Edit" : "Create"} Category
						</SoftTypography>
					</SoftBox>

					<Grid container>
						<Grid col={6} xs={8}>
							<form onSubmit={method == "edit" ? handleSubmitEdit : handleSubmitCreate}>

								{message ? <SoftAlert dismissible>{message ? message : null}</SoftAlert> : ""}

								<SoftBox mb={2}>
									<SoftBox mb={1} ml={0.5}>
										<SoftTypography component="label" variant="caption" fontWeight="bold">
											Name
										</SoftTypography>
									</SoftBox>
									<SoftInput type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
								</SoftBox>

								<SoftBox mb={2}>
									<SoftBox mb={1} ml={0.5}>
										<SoftTypography component="label" variant="caption" fontWeight="bold">
											Description
										</SoftTypography>
									</SoftBox>
									<SoftInput placeholder="Type here..." multiline rows={5} onChange={(e) => setDescription(e.target.value)} value={description} />
								</SoftBox>

								<SoftBox display="flex" py={1} mb={2} >
									<SoftBox mt={0.25}>
										<Switch onChange={(e) => setIsAProductCategory(e.target.checked)} checked={isAProductCategory} />
									</SoftBox>
									<SoftBox width="80%" ml={2}>
										<SoftTypography variant="button" fontWeight="regular" color="text">
											Product Category
										</SoftTypography>
									</SoftBox>
								</SoftBox>

								<SoftButton variant="gradient" color="info" type="submit">Save</SoftButton>
							</form>
						</Grid>
					</Grid>

				</SoftBox>
			</Card>
		</DashboardLayout>
	)
}

export default CategoriesForm;