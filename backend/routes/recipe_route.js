//import statements
const router = require("express").Router();
const Recipe = require("../model/recipe");


/*******************     Insert Recipe     ******************/

router.post("/add", async (req, res) => {

    const recipe = await new Recipe();

    recipe.recipeId = req.body.recipeId;
    recipe.recipeName = req.body.recipeName;
    recipe.ingredients = req.body.ingredients;
    recipe.description = req.body.description;

    try {
        await recipe.save();
        res.json({ success: "Recipe added successfully! ✅", recipe });
      } catch (error) {
        res.json({ error: "Recipe adding failed! 🛑☹️" });
      }
});

/**************************************************************/


/*******************     Display all Recipes     ******************/

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json({ success:'Recipes found', recipes });
  } catch (error) {
    res.json({ error });
  }
}); 

/**************************************************************/




/**************     Display specific  Recipe     **************/

router.get("/:id", async (req, res) => {

  const recipe_id = req.params.id;

  try {
    const recipe = await Recipe.findById(recipe_id);

    if(recipe == null){
        return res.json({ error: "No recipe found !" });
    }
      res.json({ success: "Recipe found 😀", recipe });
  } catch (error) {
     res.json({ message: "Server error while getting the recipe", error });
  }
})

/**************************************************************/




/*******************     Update Recipe     ********************/

router.put("/update/:id", async (req, res) => {
  try {

    const recipe_id = req.params.id;
    const recipe = await Recipe.findByIdAndUpdate(recipe_id);

    recipe.recipeId = req.body.recipeId;
    recipe.recipeName = req.body.recipeName;
    recipe.ingredients = req.body.ingredients;
    recipe.description = req.body.description;

    await recipe.save();
     res.json({ success: "Recipe successfully updated! ✅", recipe });

    } catch (error) {
       res.json({ error: "Recipe update failed! 🛑☹️" });
    }
});

/**************************************************************/




/*******************     Delete Recipe     ********************/

router.delete("/delete/:id", async(req, res) => {

  const recipe_id = req.params.id;

  try {
    await Recipe.findByIdAndDelete(recipe_id);
     res.json({ success: "Recipe Successfully Deleted! ✅" });
  } catch (error) {
     res.json({ error: "Failed to Delete Recipe 🛑☹️" ,error });
  }
})

/**************************************************************/



module.exports = router;

