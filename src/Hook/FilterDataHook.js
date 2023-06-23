import { useContext } from "react";
import { SortType } from "../Reducer/DataReducer";
import { DataContext } from "../Context/DataContext";

export const useFilterDataHook = () => {
  const { state } = useContext(DataContext);

  let filteredSnacks = state.snacks;

  filteredSnacks = filteredSnacks.filter((oneRow) => {
    const search = state.search.toLowerCase();
    const ingredients = oneRow.ingredients.join(",").toLowerCase();
    const productName = oneRow.product_name.toLowerCase();

    if (ingredients.includes(search) || productName.includes(search)) {
      return true;
    } else {
      return false;
    }
  });
  // eslint-disable-next-line default-case
  switch (state.sortType) {
    case SortType.ASCENDING: {
      // eslint-disable-next-line default-case
      switch (state.sortBy) {
        case "id": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return a.id - b.id;
          });
          break;
        }
        case "price": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        }
        case "calories": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return a.calories - b.calories;
          });
          break;
        }
        case "product_weight": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return parseInt(a.product_weight) - parseInt(b.product_weight);
          });
          break;
        }
        case "product_name": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            const productNameA = a.product_name.toLowerCase();
            const productNameB = b.product_name.toLowerCase();
            if (productNameA > productNameB) {
              return -1;
            }
            if (productNameA < productNameB) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case "ingredients": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            const productNameA = a.ingredients.join(",").toLowerCase();
            const productNameB = b.ingredients.join(",").toLowerCase();
            if (productNameA > productNameB) {
              return -1;
            }
            if (productNameA < productNameB) {
              return 1;
            }
            return 0;
          });
          break;
        }
      }
      break;
    }
    case SortType.DESCENDING: {
      // eslint-disable-next-line default-case
      switch (state.sortBy) {
        case "id": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return b.id - a.id;
          });
          break;
        }
        case "price": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        }
        case "calories": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return b.calories - a.calories;
          });
          break;
        }
        case "product_weight": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            return parseInt(b.product_weight) - parseInt(a.product_weight);
          });
          break;
        }
        case "product_name": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            const productNameA = a.product_name.toLowerCase();
            const productNameB = b.product_name.toLowerCase();

            if (productNameA < productNameB) {
              return -1;
            }
            if (productNameA > productNameB) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case "ingredients": {
          filteredSnacks = filteredSnacks.sort((a, b) => {
            const productNameA = a.ingredients.join(",").toLowerCase();
            const productNameB = b.ingredients.join(",").toLowerCase();

            if (productNameA < productNameB) {
              return -1;
            }
            if (productNameA > productNameB) {
              return 1;
            }
            return 0;
          });
          break;
        }
      }
      break;
    }
  }
  return filteredSnacks;
};
