import React, { useState, useEffect } from "react";
import Navbar from "./navigation_bar/navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import swl from 'sweetalert';
import imgIcon from './images/recipe.png';
import './styles.css';


export default function Home() {

    //states and variables
    let [recipes, setRecipes] = useState([]);


    //call fetchData function
    useEffect(() => {
        fetchData();
    }, []);


    //fetching all recipe data from API
    const fetchData = async () => {
        const response = await axios.get("http://localhost:5000/recipe");
        if (!response.data.error) setRecipes(response.data.recipes);
    };


    //delete recipe function
    const deleteRecipe = async (id) => {

        const response = await axios.delete(`http://localhost:5000/recipe/delete/${id}`)
        swl({
            title: "Are you sure",
            text: "You want to delete this recipe ?",
            icon: "warning",
            buttons: ["Cancel", "Ok"],
            dangerMode: true,
        })//if user select delete as option this .then will call and delete data from the database        
            .then((willDelete) => {
                if (willDelete) {

                    if (response.data.success) {

                        swl('Recipe successfully Deleted', {
                            icon: "success",
                        });
                        //refresh the home page
                        fetchData();
                    }
                    else {
                        toast.error("You have an error in Deleing");
                    }
                }
            });
    }


    return (
        <>
            {/* Navigation bar */}
            <Navbar />

            {/* Banner Image */}
            <section id="sec-1">
                <div class="banner-image w-100 vh-100 d-flex justify-content-center align-items-center">
                    <div class="content text-center">
                        <h1 class="text-white">Welcome to The Recipe Store</h1>                                                
                        <a href="#sec-2">
                            <div className="scroll-down" />
                        </a>
                    </div>
                </div>
            </section>


            <section id="sec-2">
                <div className='container'>
                    <div className="row">
                        <div className="col-12">
                            
                            <div className="row">
                                <div className="col-md-1 col-xs-1 col-sm-1" />
                                <div className="col-md-10 col-xs-10 col-sm-10 d-flex justify-content-center header">
                                    <img src={imgIcon} width={'50px'} height={'50px'}/>&nbsp;<h1>Recipes</h1>
                                </div>
                                <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                                <div className="col-md-1 col-xs-1 col-sm-1" />
                            </div>

                            <div className="row">
                                <div className="col-md-3 col-xs-3 col-sm-3 buttons">
                                    <Link to='/recipe/add' target={"_blank"} className="button"><span><i class="fas fa-plus-circle"></i> &nbsp;&nbsp;&nbsp;Create Recipe</span></Link>
                                </div>
                                <div className="col-md-6 col-xs-6 col-sm-6"/>
                            </div>


                            <div className="shadowBox">
                            <div className="row">                                
                                <div className="col-md-12 col-xs-12 col-sm-12 d-flex justify-content-center">
                                        <table class="table table-hover">
                                            <thead className="table-green">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Recipe ID</th>
                                                    <th scope="col">Recipe Name</th>
                                                    <th scope="col">Ingredients</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* retrieve Recipes details using mapping  */}
                                                {recipes.map((item, index) => {
                                                    return (
                                                        <tr key={item._id}>
                                                            <th scope="row"><a href={""} style={{ textDecoration: 'none', color: '#000' }}>{index + 1}</a></th>
                                                            <td>{item.recipeId}</td>
                                                            <td>{item.recipeName}</td>
                                                            <td style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.ingredients}</td>
                                                            <td style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</td>
                                                            <td>
                                                                <Link to={`/recipe/update/${item._id}`} target={"_blank"} type="button" class="btn btn-warning" style={{ width: '95px', margin: '2px' }}>
                                                                    <i class="far fa-edit"></i>&nbsp;Edit
                                                                </Link>&nbsp;&nbsp;
                                                                <Link to="#" type="button" class="btn btn-danger" onClick={() => deleteRecipe(item._id)}>
                                                                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
