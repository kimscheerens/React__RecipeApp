import React from "react";

export function UseCountingPeople({ amountOfPersons, setAmountOfPersons }) {
  return (
    <div className="countingPersons">
      <button className="countingPersons__btn" disabled={amountOfPersons <= 1} onClick={() => setAmountOfPersons(amountOfPersons - 1)}>
        -
      </button>
      🍴 {amountOfPersons}
      <button className="countingPersons__btn" onClick={() => setAmountOfPersons(amountOfPersons + 1)}>
        +
      </button>
      <button className="countingPersons__btn" onClick={() => setAmountOfPersons(2)}>
        🔄
      </button>
    </div>
  );
}
