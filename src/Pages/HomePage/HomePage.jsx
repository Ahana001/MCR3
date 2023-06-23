import { useContext } from "react";
import "./HomePage.css";
import { DataContext } from "../../Context/DataContext";
import { BiSolidUpArrowAlt, BiSolidDownArrowAlt } from "react-icons/bi";
import { ActionTypes, SortType } from "../../Reducer/DataReducer";
import { useFilterDataHook } from "../../Hook/FilterDataHook";
import { PiMaskSadLight } from "react-icons/pi";

export function HomePage() {
  const { state, dispatch } = useContext(DataContext);
  let filteredSnacks = useFilterDataHook();

  if (state.snacks.length === 0) {
    return (
      <div className="LoardingContainer">
        <h2>Loarding...</h2>
      </div>
    );
  }

  const tableHeaders = Object.keys(state.snacks[0]);

  function getSortType() {
    let result;
    // eslint-disable-next-line default-case
    switch (state.sortType) {
      case SortType.ASCENDING: {
        result = SortType.DESCENDING;
        break;
      }
      case SortType.DESCENDING: {
        result = SortType.ASCENDING;
        break;
      }
      default: {
        result = SortType.ASCENDING;
        break;
      }
    }
    return result;
  }

  return (
    <div className="TableContainer">
      <h2>Snack Table</h2>
      <div
        className="RESET"
        onClick={() => {
          dispatch({
            type: ActionTypes.SET_SEARCH,
            payload: { search: "" },
          });
          dispatch({
            type: ActionTypes.SET_SORT_TYPE,
            payload: { sortType: "" },
          });
          dispatch({
            type: ActionTypes.SET_SORT_BY,
            payload: { sortBy: "" },
          });
        }}
      >
        Reset
      </div>

      <input
        placeholder="Search with Products or Ingredients"
        value={state.search}
        onChange={(e) => {
          dispatch({
            type: ActionTypes.SET_SEARCH,
            payload: { search: e.target.value },
          });
        }}
      />
      {filteredSnacks.length === 0 ? (
        <div className="EmptyData">
          <h2>Nothing To Show</h2>
          <PiMaskSadLight className="EmptyDataIcon" />
        </div>
      ) : (
        <table className="Table">
          <thead>
            <tr>
              {tableHeaders.map((header) => {
                return (
                  <th
                    key={header}
                    onClick={() => {
                      dispatch({
                        type: ActionTypes.SET_SORT_TYPE,
                        payload: { sortType: getSortType() },
                      });
                      dispatch({
                        type: ActionTypes.SET_SORT_BY,
                        payload: { sortBy: header },
                      });
                    }}
                  >
                    {header.replace("_", " ")}
                    <span>
                      <BiSolidUpArrowAlt
                        className="ASCIcon"
                        style={{
                          display:
                            state.sortType === SortType.ASCENDING &&
                            state.sortBy === header
                              ? "inline-block"
                              : "none",
                        }}
                      />
                      <BiSolidDownArrowAlt
                        className="DESCIcon"
                        style={{
                          display:
                            state.sortType === SortType.DESCENDING &&
                            state.sortBy === header
                              ? "inline-block"
                              : "none",
                        }}
                      />
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredSnacks.map((oneRow) => {
              return (
                <tr key={oneRow.id}>
                  {tableHeaders.map((oneColumnOfOneRow) => {
                    if (oneColumnOfOneRow === "ingredients") {
                      return (
                        <td key={oneColumnOfOneRow}>
                          {oneRow[oneColumnOfOneRow].join(", ")}
                        </td>
                      );
                    } else {
                      return (
                        <td key={oneColumnOfOneRow}>
                          {oneRow[oneColumnOfOneRow]}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
