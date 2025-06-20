// import { useEffect, useState } from "react";

import Image from "next/image";
import MealSearchInput from "./components/mealsearchinput";

export const metadata = {
  title: "All Meals",
  description: "This is the meals page",
};

export const MealsPage = async ({ searchParams }) => {
  const query = await searchParams;

  const fetchMeals = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query.search}`
      );
      const data = await res.json();
      //   setMeals(data?.meals || []);
      return data.meals;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const meals = await fetchMeals("");

  return (
    <div>
      <div className="flex justify-center">
        <MealSearchInput />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {meals?.map((singleMeal) => {
          return (
            <div key={singleMeal.idMeal}>
              <Image
                src={singleMeal?.strMealThumb}
                alt={singleMeal?.strMeal}
                width={300}
                height={300}
              />
              <h1>{singleMeal?.strMeal}</h1>
              <p>{singleMeal?.strInstructions}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsPage;
