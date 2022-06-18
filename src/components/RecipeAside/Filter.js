import React from "react";

export const Filter = ({ setFilters, selectedFilters }) => {
  const onChange = e => {
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
      const newValues = selectedFilters[selectedName].filter(value => value !== e.target.value);
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

  return (
    <form className="search-filters-form">
      <div className="filter-section">
        <h3 className="filter-section__title">Looking for: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" category="Breakfast" value="Breakfast" name="category" checked={selectedFilters.category?.includes("Breakfast")} onChange={onChange}></input>
            <span>breakfast </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" category="lunch" value="lunch" name="category" checked={selectedFilters.category?.includes("lunch")} onChange={onChange}></input>
            <span>lunch </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" category="dinner" value="dinner" name="category" checked={selectedFilters.category?.includes("dinner")} onChange={onChange}></input>
            <span>dinner </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" category="snacks" value="snacks" name="category" checked={selectedFilters.category?.includes("snacks")} onChange={onChange}></input>
            <span>snacks </span>
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3 className="filter-section__title">Prep Time: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" time="5" value="5" name="time" checked={selectedFilters.time?.includes("5")} onChange={onChange}></input>
            <span>5 min </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" time="10" value="10" name="time" checked={selectedFilters.time?.includes("10")} onChange={onChange}></input>
            <span>10 min</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" time="15" value="15" name="time" checked={selectedFilters.time?.includes("15")} onChange={onChange}></input>
            <span>15 min </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" time="30" value="30" name="time" checked={selectedFilters.time?.includes("30")} onChange={onChange}></input>
            <span>30 min </span>
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3 className="filter-section__title">Allergies: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" allergies="nuts" value="nuts" name="allergies" checked={selectedFilters.allergies?.includes("nuts")} onChange={onChange}></input>
            <span>nuts</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" allergies="milk" value="milk" name="allergies" checked={selectedFilters.allergies?.includes("milk")} onChange={onChange}></input>
            <span>milk </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" allergies="fish" value="fish" name="allergies" checked={selectedFilters.allergies?.includes("fish")} onChange={onChange}></input>
            <span>fish</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" allergies="soja" value="soja" name="allergies" checked={selectedFilters.allergies?.includes("soja")} onChange={onChange}></input>
            <span>soja </span>
          </li>
        </ul>
      </div>
      <div className="filter-section">
        <h3 className="filter-section__title">price: </h3>
        <ul className="filter-list">
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" min="0" max="5" name="price" checked={selectedFilters.price?.includes("5")} onChange={onChange}></input>
            <span> &#60; 5 €</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" min="6" max="15" name="price" checked={selectedFilters.price?.includes("10")} onChange={onChange}></input>

            <span>6€ - 15 € </span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" min="16" max="25" name="price" checked={selectedFilters.price?.includes("15")} onChange={onChange}></input>

            <span>16€ - 25 €</span>
          </li>
          <li className="filter-list__item">
            <label className="filter-list-label"></label>
            <input type="checkbox" min="26" max="99" name="price" checked={selectedFilters.price?.includes("20")} onChange={onChange}></input>

            <span> &#62; 26 €</span>
          </li>
        </ul>
      </div>
    </form>
  );
};
