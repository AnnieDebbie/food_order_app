import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app-4dc6a-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    /**
     * 
    We can't use try catch for the error, because we are using an async function which always returns a promise. if you throw an erroe inside a promise because it will always cause it to reject
    - We could await the try catch but that would mean wrapping the useEffect with an async which is not possible
    - We could create another function but instead of that we can do chaining
     *
    try {
      fetchMeals();
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
    */
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading .....</p>
      </section>
    );
  }

  if (httpError) {
    return <section className={classes.error}>Failed to fetch meals</section>;
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
