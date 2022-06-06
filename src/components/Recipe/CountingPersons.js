import React, { useState } from "react";

const CountingPersons = () => {
  const [count, setCount] = useState(2);

  return (
    <>
      <p>
        Persons: <button onClick={() => setCount(count - 1)} className="count-btn"> - </button>
        {count} 🍴 <button onClick={() => setCount(count + 1)} className="count-btn"> + </button>
      </p>
    </>
  );
};

export default CountingPersons;
