import React, { useState } from "react";

const CountingPersons = () => {
  const [count, setCount] = useState(2);

  return (
    <>
      <span>
        Persons: <button onClick={() => setCount(count - 1)} className="count-btn"> - </button>
        {count} 🍴 <button onClick={() => setCount(count + 1)} className="count-btn"> + </button>
      </span>
    </>
  );
};

export default CountingPersons;
