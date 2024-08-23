"use client";

import useProduct from "@/app/hooks/useMeal"
import ProductCard from "../../organisms/ProductCard"
import { MEAL_API } from "@/constants/baseUrls";
import useRandomProducts from "@/app/functions/useRandomProducts";
import Wait from '../../organisms/Wait'
import LinkMenu from "../../atoms/LinkMenu";


export default function Page() {

    const products = useRandomProducts(12, MEAL_API, 'random.php');
    const categories = useRandomProducts(1, MEAL_API, 'list.php?c=list');

    return (
        <main className="flex page-space flex-col items-center justify-between flex-wrap">

            <div className="flex flex-row gap-5 flex-wrap items-center justify-center mt-9 mb-9 ">
                {categories.length > 0 && categories[0].meals.length > 0 ?

                    categories[0].meals.map((category: any, index: any) => (
                        <LinkMenu url={'/meals/category/' + category.strCategory} title={category.strCategory} className="rounded-full font-bold p-4 border-2 border-[#2C2F24] text-[#2C2F24] hover:bg-[#AD343E] hover:text-white hover:border-[#AD343E]" />
                    )) : (
                        <div>
                            Loading categories...
                        </div>
                    )}
            </div>

            <div className="flex flex-row gap-5 flex-wrap items-center justify-center mt-9 mb-9 ">
                {products.length > 0 ?
                    products.map(product => (
                        <ProductCard
                            key={product.meals[0].idMeal}
                            id={parseInt(product.meals[0].idMeal)}
                            name={product.meals[0].strMeal}
                            image={product.meals[0].strMealThumb}
                            category={product.meals[0].strCategory}
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