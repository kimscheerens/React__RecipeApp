import React, { useState } from "react";

export const Filter = ({ setFilters, selectedFilters }) => {
  const onChange = (e) => {
    /** category:["Breakfast"] */

    const selectedName = e.target.name;
    if (e.target.checked) {
      //if checkboxes are being checked
      setFilters({
        // we spread selectedFilters to preserve already selected filters
        ...selectedFilters,
        // check if selectedName is already present in selectedFilters
        [selectedName]: selectedFilters[selectedName]
          ? // if so we added the newly selected value to the existing array in the selectedFilters
            // if not we initialise a new array with the selected value
            selectedFilters[selectedName].concat(e.target.value)
          : [e.target.value],
      });
    } else {
      // if checkboxes are being deselected
      // we calculate the new values of the selectedName by removing the selected value
      const newValues = selectedFilters[selectedName].filter(
        (value) => value !== e.target.value
      );
      // we spread selectedFilters to preserve already selected filters
      const newFilters = { ...selectedFilters, [selectedName]: newValues };
      // if the new values are an empty array we need to remove the selectedName from the selectedFilters
      // because firebase doesn't allow an empty array in it's compound queries
      if (newValues.length === 0) {
        delete newFilters[selectedName];
      }
      setFilters(newFilters);
    }
  };

  console.log(selectedFilters);

  return (
    <form className="search-filters-form">
      <div className="filter-section">
        <h3 className="filter-section__title">Looking for: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              // id={`default-${type}-breakfast`}
              label="breakfast"
              value="breakfast"
              name="category"
              checked={selectedFilters.category?.includes("breakfast")}
              onChange={onChange}
            ></input>
            <span>breakfast </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              label="lunch"
              value="lunch"
              name="category"
              checked={selectedFilters.category?.includes("lunch")}
              onChange={onChange}
            ></input>
            <span>lunch </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              label="dinner"
              value="dinner"
              name="category"
              checked={selectedFilters.category?.includes("dinner")}
              onChange={onChange}
            ></input>
            <span>dinner </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              label="snacks"
              value="snacks"
              name="category"
              checked={selectedFilters.category?.includes("snacks")}
              onChange={onChange}
            ></input>
            <span>snacks </span>
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3 className="filter-section__title">Prep Time: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>5 min </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>10 min</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>15 min </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>30 min </span>
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3 className="filter-section__title">Allergies: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              label="allergies"
              value="allergies"
              name="nuts"
              checked={selectedFilters.label?.includes("nuts")}
              onChange={onChange}
            ></input>
            <span>Nuts</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              label="allergies"
              value="allergies"
              name="milk"
              checked={selectedFilters.label?.includes("milk")}
              onChange={onChange}
            ></input>
            <span>Milk </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              label="allergies"
              value="allergies"
              name="fish"
              checked={selectedFilters.label?.includes("fish")}
              onChange={onChange}
            ></input>
            <span>fish</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input
              type="checkbox"
              label="allergies"
              value="allergies"
              name="soja"
              checked={selectedFilters.label?.includes("soja")}
              onChange={onChange}
            ></input>
            <span>soja </span>
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3 className="filter-section__title">price: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>5 €</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>5 € - 10 € </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>11€ - 15 €</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox"></input>
            <span>16 €</span>
          </li>
        </ul>
      </div>
    </form>
  );
};
