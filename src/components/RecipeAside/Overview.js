import React, { useState } from "react";
import useCollection from "./useCollection";
import { Filter } from "./Filter";

function Overview() {
  const [filters, setFilters] = useState({});
  const recipes = useCollection("recept", filters);

  return (
    <>
      <section className="bundel">    
        <Filter setFilters={setFilters} selectedFilters={filters} />
        <div className="filter-global">
        {recipes.map((recipe, i) => (
          <div recipe={recipe} key={recipe.id} className="filter-result">
            <div className="filter-result__item">
              <h4 className="filter-result__title">{recipe.title}</h4>
              <img src={recipe.imageUrl} alt="filtert recipe" className="filter-result__img" />
            </div>
          </div>
        ))}</div>
      </section>
    </>
  );
}

export default Overview;

