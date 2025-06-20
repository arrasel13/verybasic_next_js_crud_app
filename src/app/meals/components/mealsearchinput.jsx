"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MealSearchInput = () => {
  //   const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // fetchMeals(search);
    const searchQuery = { search };
    const urlQueryParam = new URLSearchParams(searchQuery);
    const url = `${pathname}?${urlQueryParam.toString()}`;
    router.push(url);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="Search for meals..."
        className="border border-gray-300 rounded-md p-2 my-4"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default MealSearchInput;
