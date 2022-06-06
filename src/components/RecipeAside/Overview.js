import React, { useState } from "react";
import useCollection from "./useCollection";
import { Filter } from "./Filter";

function Overview() {
  const [filters, setFilters] = useState({});
  const recipes = useCollection("recept", filters);

  console.log(recipes);

  return (
    <>
      <div>overview</div>
      <Filter setFilters={setFilters} selectedFilters={filters} />
      <section>
      {recipes.map((recipe, i) => (
              <div recipe={recipe} key={recipe.id} />

            ))}

      </section>
    </>
  );
}

export default Overview;
