import React, { useState, useEffect } from "react";
import { Card, FormControl, InputLabel, MenuItem, Switch } from "@mui/material";

import { useParams } from "react-router-dom";

import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftAlert from "components/SoftAlert";

import Select from 'react-select';

function RecipesForm() {

	const [name, setName] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [preparation, setPreparation] = useState("");
	const [instructions, setInstructions] = useState("");
	const [attributes, setAtributtes] = useState("");
	const [productId, setProductId] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [message, setMessage] = useState("");
	const [recipe, setRecipe] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoriesOptions, setCategoriesOptions] = useState([]);
	const [products, setProducts] = useState([]);
	const [productsOptions, setProductsOptions] = useState([]);

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

	useEffect(() => {
		fetch("http://localhost:8000/api/Product/products")
			.then(res => res.json())
			.then(
				(data) => {
					console.log(data.products);
					setProducts(data.products);
				}
			)

		var options_products = []; 
		products.forEach((element) => {
			let option = {
				"value": element.id,
				"label": element.name
			};

			options_products.push(option);
		});

		setProductsOptions(options_products);

		console.log(productsOptions)
	}, []);


	if (method == "edit") {
		useEffect(() => {
			fetch("https://mocki.io/v1/9e8a38a9-aae4-4523-93d3-19f83a6c263c")
				.then(res => res.json())
				.then(
					(data) => {
						setRecipe(data);
						setName(data.name);
						setSubtitle(data.subtitle);
						setDescription(data.description);
						setIngredients(data.ingredients);
						setPreparation(data.preparation);
						setInstructions(data.instructions);
						setAtributtes(data.attributes);
						setCategoryId(data.categoryId);
						setProductId(data.productId);
					}
				)
		}, []);
	}

	let handleSubmitCreate = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch("http://localhost:8000/api/Recipe/create", {
				method: "POST",
				headers: {
					'Accept': 'application/json, text/plain',
					'Content-Type': 'application/json;charset=UTF-8'
				},
				body: JSON.stringify({
					id: id,
					name: name,
					subtitle: subtitle,
					description: description,
					ingredients: ingredients,
					preparation: preparation,
					instructions: instructions,
					attributes: attributes,
					categoryId: categoryId,
					productId: productId
				}),
			});
			let resJson = await res.json();

			if (res.status === 200) {
				setName("");
				setSubtitle("");
				setDescription("");
				setIngredients("");
				setPreparation("");
				setInstructions("");
				setAtributtes("");
				setCategoryId(false);
				setProductId(false);

				setMessage("Recipe edited");
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
			let res = await fetch("http://localhost:8000/api/Category/update", {
				method: "PUT",
				body: JSON.stringify({
					name: name,
					subtitle: subtitle,
					description: description,
					ingredients: ingredients,
					preparation: preparation,
					instructions: instructions,
					attributes: attributes,
					categoryId: categoryId,
					productId: productId
				}),
			});
			let resJson = await res.json();

			if (res.status === 200) {
				setName("");
				setSubtitle("");
				setDescription("");
				setIngredients("");
				setPreparation("");
				setInstructions("");
				setAtributtes("");
				setCategoryId(false);
				setProductId(false);

				setMessage("Recipe created");
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
							{method == "edit" ? "Edit" : "Create"} Recipe
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
										Subtitle
									</SoftTypography>
								</SoftBox>
								<SoftInput type="text" placeholder="Subtitle" onChange={(e) => setSubtitle(e.target.value)} value={subtitle} />
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
										Ingredients
									</SoftTypography>
								</SoftBox>
								<SoftInput placeholder="Type here..." multiline rows={5} onChange={(e) => setIngredients(e.target.value)} value={ingredients} />
							</SoftBox>

							<SoftBox mb={2}>
								<SoftBox mb={1} ml={0.5}>
									<SoftTypography component="label" variant="caption" fontWeight="bold">
										Preparation
									</SoftTypography>
								</SoftBox>
								<SoftInput placeholder="Type here..." multiline rows={5} onChange={(e) => setPreparation(e.target.value)} value={preparation} />
							</SoftBox>

							<SoftBox mb={2}>
								<SoftBox mb={1} ml={0.5}>
									<SoftTypography component="label" variant="caption" fontWeight="bold">
										Instructions
									</SoftTypography>
								</SoftBox>
								<SoftInput placeholder="Type here..." multiline rows={5} onChange={(e) => setInstructions(e.target.value)} value={instructions} />
							</SoftBox>

							<SoftBox mb={2}>
								<SoftBox mb={1} ml={0.5}>
									<SoftTypography component="label" variant="caption" fontWeight="bold">
										Attributes
									</SoftTypography>
								</SoftBox>
								<SoftInput placeholder="Type here..." multiline rows={5} onChange={(e) => setAtributtes(e.target.value)} value={attributes} />
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

							<SoftBox mb={2}>
								<SoftBox mb={1} ml={0.5}>
									<SoftTypography component="label" variant="caption" fontWeight="bold">
										Product
									</SoftTypography>
								</SoftBox>
								<Select
									options={productsOptions}
									onChange={(e) => setProductId(e.value)}
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

export default RecipesForm;