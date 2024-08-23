"use client";

import useRandomProducts from "@/app/functions/useRandomProducts";
import { useParams } from "next/navigation";
import { MEAL_API } from "@/constants/baseUrls";
import LinkMenu from "@/app/atomic/atoms/LinkMenu";
import ProductCard from "@/app/atomic/organisms/ProductCard";
import Wait from "@/app/atomic/organisms/Wait";


function CategoryPage() {
    const router = useParams();
    const mealCategory = router?.category;
    console.log(mealCategory);
    
    const products = useRandomProducts(1, MEAL_API, 'filter.php?c='+mealCategory);
    const categories = useRandomProducts(1, MEAL_API, 'list.php?c=list');

    return (
        <main className="flex page-space flex-col items-center justify-between flex-wrap">
            <div className="flex flex-row gap-5 flex-wrap items-center justify-center mt-9 mb-9 ">
                {categories.length > 0 && categories[0].meals.length > 0 ?

                    categories[0].meals.map((category: any, index: any) => (
                        <LinkMenu url={'/meals/category/'+category.strCategory} title={category.strCategory} className="rounded-full font-bold p-4 border-2 border-[#2C2F24] text-[#2C2F24] hover:bg-[#AD343E] hover:text-white hover:border-[#AD343E]"/>
                    )): (
                        <div>
                            Loading categories...
                        </div>
                    )}
            </div>

            <div className="flex flex-row gap-5 flex-wrap items-center justify-center mt-9 mb-9 ">
                {products.length > 0 && products[0].meals.length > 0 ?
                    products[0].meals.map((product: any) => (
                        <ProductCard
                            key={product.idMeal}
                            id={parseInt(product.idMeal)}
                            name={product.strMeal}
                            image={product.strMealThumb}
                            category={product.strCategory == null ? mealCategory : product.strCategory}
                            singleRecipeRoute="/meals/"
                        />
                    )) : (
                        <div>
                            <Wait />
                        </div>
                    )}
            </div>
        </main>
    )

}

export default CategoryPage;