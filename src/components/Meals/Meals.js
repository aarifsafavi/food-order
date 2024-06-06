import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
      <div>
        <Link to="/admin">
          <button>Admin</button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Meals;
