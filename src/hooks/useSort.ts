import { useCallback, useState } from "react";

const useSort = () => {
  const [sortQuery, setSortQuery] = useState("");

  const createSortQuery = useCallback(
    (key: string) => {
      if (sortQuery.includes(key)) {
        if (sortQuery.includes("asc")) {
          setSortQuery(sortQuery.replace("asc", "desc"));
        } else {
          setSortQuery(sortQuery.replace("desc", "asc"));
        }
      } else {
        setSortQuery(`sort=${key},asc&`);
      }
    },
    [sortQuery]
  );

  return {
    sortQuery,
    createSortQuery,
  };
};

export default useSort;