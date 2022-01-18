import React, { useState, useEffect } from "react";
import Navbar from "./navigation_bar/navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles.css';

export default function UpdateRecipe(props) {
    //states and variables
    const [recipeId, setRecipeId] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    //const [id, setId] = useState(props.history.location.state.id);
    const params = useParams();
    const [errors, setErrors] = useState([]);
    let hasErrors;

    //object_id
    const id = params.id;
    console.log(id);

    //call fetchData function    
    useEffect(() => {
        fetchData();
    }, [id]);

    
    //fetching specific recipe data from API
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:5000/recipe/${id}`);
        if (response.data.recipe){

            const recipe = response.data.recipe;
            setRecipeId(recipe.recipeId);
            setRecipeName(recipe.recipeName);
            setIngredients(recipe.ingredients);
            setDescription(recipe.description);
        }
    };


    //input field clear function
    const clear = () => {
        setRecipeId("");
        setRecipeName("");
        setIngredients("");
        setDescription("");
    };

    //handle form submit and validation
    const formHandler = async (e) => {
        
        e.preventDefault();
        setErrors([]);
        hasErrors = false;

        if (recipeId === "") {
            setErrors((oldArr) => [
                ...oldArr,
                { msg: "Recipe_Id_is_empty" },
            ]);
            hasErrors = true;
        }
        if (recipeName === "") {
            setErrors((oldArr) => [
                ...oldArr,
                { msg: "Recipe_name_is_empty" },
            ]);
            hasErrors = true;
        }
        if (ingredients === "") {
            setErrors((oldArr) => [
                ...oldArr,
                { msg: "Recipe_ingredient_is_empty" },
            ]);
            hasErrors = true;
        }
        if (description === "") {
            setErrors((oldArr) => [
                ...oldArr,
                { msg: "Description_is_empty" },
            ]);
            hasErrors = true;
        }
        if (ingredients.length < 10) {
            setErrors((oldArr) => [
                ...oldArr,
                { msg: "You_forgot_some_important_recipe_ingredients!" },
            ]);
            hasErrors = true;
        }
        if (description.length < 10) {
            setErrors((oldArr) => [
                ...oldArr,
                { msg: "Description_is_not_enough" },
            ]);
            hasErrors = true;
        }
        if (hasErrors === false) {                        
            //API request for the add recipe           
            const response = await axios.put(`http://localhost:5000/recipe/update/${id}`,
            { recipeId, recipeName, ingredients, description }
            );            
            //refresh if success
            // if (response.data.success)  window.location = "/";
            if (response.data.success) {                
                toast.success("Recipe updated !");
                // setTimeout to 3s and navigate back to home page
                setTimeout(() => {
                    window.location = "/";
                }, 2500);
                setTimeout();


            } else {
                toast.error("You have an Error in Updating");
            }            
        }
    };


    return (
        <>
            {/* Navigation components */}
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="addRecipe">
                            <div className="row">
                                <div className="col-md-1 col-xs-1 col-sm-1 col-lg-1" />
                                <div className="col-md-10 col-xs-10 col-sm-10 col-lg-10">     
                                    <div className="row">
                                        <div className="col position-relative link">
                                        <p><Link to="/">Home</Link> {'>'} Update Recipe</p>
                                        </div>
                                    </div>                                                               
                                    <div className="row">
                                        <div className="formHead d-flex justify-content-center header">
                                            <h2>Update Recipe</h2>
                                            <ToastContainer/>                                            
                                        </div>  
                                    </div>

                                    <div className="shadowBoxForm">
                                        <div className="row">
                                            <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6 recipe-cover-img2">
                                                <img className="" alt="recipe_image1"/>
                                            </div>
                                            <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6 right-side">
                                                <div className="formError" style={{ marginTop: '20px' }}>
                                                    <div className="col-1" />
                                                    <div className="col-1">
                                                        {errors.length > 0
                                                            ? errors.map((i, index) => {
                                                                return <span key={index}>{errors[index].msg}</span>;
                                                            })
                                                            : null}
                                                    </div>
                                                    <div className="col-1" />
                                                </div>
                                                <div className="modelForm">
                                                    <form onSubmit={formHandler}>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group col" style={{ marginTop: '15px' }}>
                                                                    <label>Recipe ID : </label>
                                                                    <input type="number" className="form-control" value={recipeId} onChange={(e) => setRecipeId(e.target.value)} placeholder="10XXX" style={{ marginTop: '5px' }} required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group col" style={{ marginTop: '15px' }}>
                                                                    <label>Recipe Name : </label>
                                                                    <input type="text" className="form-control" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="Milk Rice" style={{ marginTop: '5px' }} required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group" style={{ marginTop: '15px' }}>
                                                                    <label>Ingredients : </label>
                                                                    <textarea className="form-control" aria-label="With textarea" value={ingredients} onChange={(e) => setIngredients(e.target.value)} name="ingredient" placeholder="recipe ingredients" style={{ marginTop: '5px' }} required />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group" style={{ marginTop: '15px' }}>
                                                                    <label>Description : </label>
                                                                    <textarea className="form-control" aria-label="With textarea" value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="description" style={{ marginTop: '5px' }} required />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="form-group col-12" style={{ marginTop: '15px', marginBottom: '50px' }}>
                                                                <div className="form-group col-8" style={{ marginTop: '15px' }}>
                                                                    <button type="submit" className="btn btn-rec btnSubmit" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
                                                                    <button type="reset" className="btn btn-rec btnReset" onClick={() => clear()}><i class="fas fa-eraser"></i>&nbsp;Clear</button>
                                                                </div>
                                                                <div className="form-group col" style={{ marginTop: '15px' }}>
                                                                    <Link to="/" className="btn btn-rec btnClose"><i className="fas fa-times"></i>&nbsp;Cancel</Link>
                                                                </div>
                                                            </div>
                                                            <div className="col-6"/>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 col-xs-1 col-sm-1 col-lg-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


