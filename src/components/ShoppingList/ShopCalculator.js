import { useReducer, useRef } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.value };
    case "decrement":
      return { count: state.count - action.value };
    case "add":
      return [
        ...state,
        {
          id: state.length,
          name: action.name,
        },
      ];
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export default function ShopCalculator({ counting }) {
  // const inputRef = useRef();

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="btn__group">
      <button onClick={() => dispatch({ type: "decrement", value: 1 })} className="btn__sm" disabled={state.count <= 0}>
        -
      </button>
      <p> {state.count * counting} </p>
      <button onClick={() => dispatch({ type: "increment", value: 1 })} className="btn__sm">
        +
      </button>
      <button onClick={() => dispatch({ type: "reset" })} className="btn__sm">
        reset
      </button>
      {/* <input onClick={() => dispatch({ type: "add", name: inputRef.current.value })} className="input"></input> */}
    </div>
  );
}
