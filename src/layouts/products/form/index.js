import React, { useState, useEffect } from "react";
import { Card, FormControl, InputLabel, Switch } from "@mui/material";

import { useParams } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftAlert from "components/SoftAlert";

import Select from 'react-select';


function ProductsForm() {

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [attributes, setAttributes] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [active, setActive] = useState(false);
	const [message, setMessage] = useState("");
	const [categories, setCategories] = useState([]);
	const [categoriesOptions, setCategoriesOptions] = useState([]);
	const [product, setProduct] = useState([]);

	const { method, id } = useParams();

	useEffect(() => {
		fetch("http://localhost:8000/api/Category/categories")
			.then(res => res.json())
			.then(
				(data) => {
					console.log(data.categories);
					setCategories(data.categories);
				}
			)

		var options = []; 
		categories.forEach((element) => {
			let option = {
				"value": element.id,
				"label": element.name
			};

			options.push(option);
		});

		setCategoriesOptions(options);

		console.log(categoriesOptions)
	}, []);

	if (method == "edit") {
		useEffect(() => {
			fetch("https://mocki.io/v1/9c5f13b3-e655-4ff7-bed0-d3fee3a57947")
				.then(res => res.json())
				.then(
					(data) => {
						setProduct(data);
						setName(data.name);
						setDescription(data.description);
						setActive(data.active);
						setAttributes(data.attributes);
						setCategoryId(data.categoryId);
					}
				)
		}, []);
	}

	let handleSubmitCreate = async (e) => {
		e.preventDefault();
		console.log(categoryId)
		try {
			let res = await fetch("http://locaddlhost:8000/api/Product/create", {
				method: "POST",
				headers: {
					'Accept': 'application/json, text/plain',
					'Content-Type': 'application/json;charset=UTF-8'
				},
				body: JSON.stringify({
					id: id,
					name: name,
					description: description,
					active: active,
					attributes: attributes,
					categoryId: categoryId
				}),
			});
			let resJson = await res.json();

			if (res.status === 200) {
				setName("");
				setDescription("");
				setActive(false);
				setAttributes("");
				setCategoryId("");

				setMessage("Product created");
			} else {
				setMessage("Some error occured");
			}
		} catch (err) {
			console.log(err);
		}
	};

	let handleSubmitEdit = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch("http://localhost:8000/api/Product/update", {
				method: "PUT",
				body: JSON.stringify({
					name: name,
					description: description,
					active: active,
					attributes: attributes,
					categoryId: categoryId
				}),
			});
			let resJson = await res.json();

			if (res.status === 200) {
				setName("");
				setDescription("");
				setActive(false);
				setAttributes("");
				setCategoryId("");

				setMessage("Product created");
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
							{method == "edit" ? "Edit" : "Create"} Product
						</SoftTypography>
					</SoftBox>

					<SoftBox>

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

							<SoftBox mb={2}>
								<SoftBox mb={1} ml={0.5}>
									<SoftTypography component="label" variant="caption" fontWeight="bold">
										Attributes
									</SoftTypography>
								</SoftBox>
								<SoftInput placeholder="Type here..." multiline rows={5} onChange={(e) => setAttributes(e.target.value)} value={attributes} />
							</SoftBox>

							<SoftBox display="flex" py={1} mb={2} >
								<SoftBox mt={0.25}>
									<Switch onChange={(e) => setActive(e.target.checked)} checked={active} />
								</SoftBox>
								<SoftBox width="80%" ml={2}>
									<SoftTypography variant="button" fontWeight="regular" color="text">
										Active
									</SoftTypography>
								</SoftBox>
							</SoftBox>

							<SoftBox mb={2}>
								<SoftBox mb={1} ml={0.5}>
									<SoftTypography component="label" variant="caption" fontWeight="bold">
										Category
									</SoftTypography>
								</SoftBox>
								<Select
									options={categoriesOptions}
									onChange={(e) => setCategoryId(e.value)}
								>
								</Select>
							</SoftBox>
							
							<SoftButton variant="gradient" color="info" type="submit">Save</SoftButton>
						</form>

					</SoftBox>

				</SoftBox>
			</Card>
		</DashboardLayout>
	)
}

export default ProductsForm;