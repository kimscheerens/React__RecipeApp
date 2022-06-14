import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import React, { useEffect, useState } from "react";

const useCollection = (c, filterObject = { category: ["dinner"] }) => {
  const [data, setData] = useState([]);

  console.log(filterObject);
  console.log(c);
  /**
   * {filterObject
   * category:["lunch"]
   * }
   */

  useEffect(() => {
    let unsub;
    let ref = collection(db, "recept");
    console.log(ref);
    const filters = Object.entries(filterObject);
    if (filters.length === 0) {
      unsub = onSnapshot(ref, snapshot => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setData(results);
      });
    } else {
      const queries = filters.map(([field, value]) =>
        // where(field, "in", [value])
        query(ref, where(field, "in", value))
      );
      // let searchQuery = query(ref, ...whereStatements);
      unsub = onSnapshot(...queries, snapshot => {
        let results = [];
        // dit zou je al moeten zien...
        console.log(snapshot);
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setData(results);
      });
    }
    return () => unsub();
  }, [c, JSON.stringify(filterObject)]);
  console.log(data);

  if (!data) return null;
  return data;
};

export default useCollection;