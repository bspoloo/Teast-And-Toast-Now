import { useState, useEffect } from 'react';
import { getSingleRecipe } from '@/api/main';

const useSingleRecipeData = (id: string | string[], recipeType: string, baseUrl: string) => {
  const [imageRecipe, setImageRecipe] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState<String[]>([]);
  const [ingredients, setIngredients] = useState<String[]>([]);
  const [measures, setMeasures] = useState<String[]>([]);
  const [videoTutorial, setVideoTutorial] = useState("");
  const [titleRecipe, setTitleRecipe] = useState("");
  const [loading, setLoading] = useState(true);

  const processRecipeData = (data: any) => {
    const currentRecipe = data;
    const newIngredients = [];
    const newMeasures = [];
    for (let i = 1; i <= 20; i++) {
      if (currentRecipe[`strIngredient${i}`] && currentRecipe[`strIngredient${i}`] !== 'null' && currentRecipe[`strIngredient${i}`] !== '') {
        newIngredients.push(currentRecipe[`strIngredient${i}`]);
        newMeasures.push(currentRecipe[`strMeasure${i}`]);
      }
    }
    setRecipeInstructions(currentRecipe.strInstructions.split('.'));
    setImageRecipe(recipeType === 'cocktail' ? currentRecipe.strDrinkThumb : currentRecipe.strMealThumb);
    setTitleRecipe(recipeType === 'cocktail' ? currentRecipe.strDrink : currentRecipe.strMeal);
    setVideoTutorial(currentRecipe.strYoutube || '');
    setIngredients(newIngredients);
    setMeasures(newMeasures);
    setLoading(false);

  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 10000); 
      getSingleRecipe(id, baseUrl).then((data) => {
        const currentRecipe = recipeType === 'cocktail' ? data.drinks[0] : data.meals[0];
        clearTimeout(timeoutId); 
        processRecipeData(currentRecipe);
      }).catch(() => {
        clearTimeout(timeoutId); 
        setLoading(false); 
      });
    }
  }, [id, recipeType]);

  return { imageMeal: imageRecipe, recipeInstructions, ingredients, measures, videoTutorial, titleRecipe, loading };
};

export default useSingleRecipeData;