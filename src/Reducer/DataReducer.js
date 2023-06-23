export const ActionTypes = {
  INITIAL_SET_SNACKS: "INITIAL_SET_SNACKS",
  SET_SORT_TYPE: "SET_SORT_TYPE",
  SET_SORT_BY: "SET_SORT_BY",
  SET_SEARCH: "SET_SEARCH",
};
export const SortType = {
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
};
export const initialState = {
  search: "",
  sortType: "",
  sortBy: "",
  snacks: [],
};

export function DataReducer(state, action) {
  let result;
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionTypes.INITIAL_SET_SNACKS: {
      result = {
        ...state,
        snacks: action.payload.snacks,
      };
      break;
    }
    case ActionTypes.SET_SORT_TYPE: {
      result = {
        ...state,
        sortType: action.payload.sortType,
      };
      break;
    }
    case ActionTypes.SET_SORT_BY: {
      result = {
        ...state,
        sortBy: action.payload.sortBy,
      };
      break;
    }
    case ActionTypes.SET_SEARCH: {
      result = {
        ...state,
        search: action.payload.search,
      };
      break;
    }
  }
  return result;
}
