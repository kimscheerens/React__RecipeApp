// import React, { useReducer } from "react";

// const useReducer = (state, action) => {
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + 1 };

//     case "decrement":
//       return { count: state.count - 1 };

//     case "changePeople":
//       return { count: state.count * 1 };

//     case "reset":
//       return init(action.payload);

//     default:
//       throw new Error();
//   }
// };

// const UseReducerCountingPeople = () => {
//   const [state, dispatch] = useReducer(reducer, initialCount, init);

//   return (
//     <>
//       Count: {state.count}
//       <button
//         onClick={() => dispatch({ type: "reset", payload: initialCount })}
//       >
//         2
//       </button>
//       <button onClick={() => dispatch({ type: "decrement" })}>-</button>
//       <button onClick={() => dispatch({ type: "increment" })}>+</button>
//     </>
//   );
// };

// export default UseReducerCountingPeople;
