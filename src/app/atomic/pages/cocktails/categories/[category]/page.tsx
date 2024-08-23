"use client";

import useRandomProducts from "@/app/functions/useRandomProducts";
import { useParams } from "next/navigation";
import { COCKTAIL_API } from "@/constants/baseUrls";
import LinkMenu from "@/app/atomic/atoms/LinkMenu";
import ProductCard from "@/app/atomic/organisms/ProductCard";
import Wait from "@/app/atomic/organisms/Wait";


function CategoryPage() {
    const router = useParams();
    const cocktailCategory = router?.category;
    const products = useRandomProducts(1, COCKTAIL_API, 'filter.php?c='+cocktailCategory);
    const categories = useRandomProducts(1, COCKTAIL_API, 'list.php?c=list');

    console.log(cocktailCategory);

    return (
        <main className="flex page-space flex-col items-center justify-between flex-wrap">
            <div className="flex flex-row gap-5 flex-wrap items-center justify-center mt-9 mb-9 ">
                {categories.length > 0 && categories[0].drinks.length > 0 ?

                    categories[0].drinks.map((category: any, index: any) => (
                        <LinkMenu url={'/cocktails/category/'+category.strCategory} title={category.strCategory} className="rounded-full font-bold p-4 border-2 border-[#2C2F24] text-[#2C2F24] hover:bg-[#AD343E] hover:text-white hover:border-[#AD343E]"/>
                    )): (
                        <div>
                            Loading categories...
                        </div>
                    )}
            </div>

            <div className="flex flex-row gap-5 flex-wrap items-center justify-center mt-9 mb-9 ">
                {products.length > 0 && products[0].drinks.length > 0 ?
                    products[0].drinks.map((product: any) => (
                        <ProductCard
                            key={product.idDrink}
                            id={parseInt(product.idDrink)}
                            name={product.strDrink}
                            image={product.strDrinkThumb}
                            category={product.strCategory == null ? cocktailCategory : product.strCategory}
                            singleRecipeRoute="/cocktails/"
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