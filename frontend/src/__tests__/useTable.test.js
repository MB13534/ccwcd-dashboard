import { renderHook, act } from "@testing-library/react-hooks";
import useTable from "../hooks/useTable";
import { generateCrosstabbedDailyDataWithNulls } from "../../../backend/util";

let result;

beforeEach(() => {
  const data = generateCrosstabbedDailyDataWithNulls(10);
  const columns = [
    {
      type: "category",
      label: "Date",
      accessor: "Date",
      filter: { enabled: true, type: "date" },
      columnToggle: { enabled: true },
    },
    {
      type: "series",
      label: "West Stage (ft)",
      accessor: "West Stage (ft)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      type: "series",
      label: "Oster Stage (ft)",
      accessor: "Oster Stage (ft)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      type: "series",
      label: "FIDCO Stage (ft)",
      accessor: "FIDCO Stage (ft)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      type: "series",
      label: "West Flow (CFS)",
      accessor: "West Flow (CFS)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      type: "series",
      label: "Oster Flow (CFS)",
      accessor: "Oster Flow (CFS)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      type: "series",
      label: "FIDCO Flow (CFS)",
      accessor: "FIDCO Flow (CFS)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
  ];
  result = renderHook(() => useTable(data, columns)).result;
  return result;
});

test("useTable() returns expected headers, keys, filters, columnToggles, and filteredKeys", () => {
  const {
    headers,
    keys,
    filters,
    columnToggles,
    filteredKeys,
  } = result.current;

  const initHeaderKeys = [
    "Date",
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  expect(headers).toEqual(expect.arrayContaining(initHeaderKeys));
  expect(keys).toEqual(expect.arrayContaining(initHeaderKeys));
  expect(filteredKeys).toEqual(expect.arrayContaining(initHeaderKeys));
  expect(filters.length).toBe(1);
  expect(columnToggles.length).toBe(7);
});

test("useTable() returns expected tableData", () => {
  const { tableData } = result.current;

  const keys = [
    "Date",
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  expect(tableData.length).toBe(10);
  expect(Object.keys(tableData[0])).toEqual(expect.arrayContaining(keys));
});

test("useTable() toggle columns works", () => {
  const { handleFilteredKeys } = result.current;

  const initHeaderKeys = [
    "Date",
    "West Stage (ft)",
    "Oster Stage (ft)",
    "FIDCO Stage (ft)",
    "West Flow (CFS)",
    "Oster Flow (CFS)",
    "FIDCO Flow (CFS)",
  ];

  const activeColumns = ["Date", "Oster Stage (ft)"];

  expect(result.current.filteredKeys).toEqual(
    expect.arrayContaining(initHeaderKeys)
  );
  act(() => {
    handleFilteredKeys(activeColumns);
  });
  expect(result.current.filteredKeys).toEqual(
    expect.arrayContaining(activeColumns)
  );
});

test("useTable() filter config works", () => {
  const { filters } = result.current;

  expect(filters[0].filter.value[0]).toBe("2019-12-13");
  expect(filters[0].filter.value[1]).toBe("2020-01-27");
});

test("useTable() exclude null values works", () => {
  const { handleExcludeNulls } = result.current;
  expect(result.current.tableData.length).toBe(10);
  act(() => {
    handleExcludeNulls();
  });
  expect(result.current.excludeNulls).toBe(true);
  expect(result.current.tableData.length).toBe(8);
  act(() => {
    handleExcludeNulls();
  });
  expect(result.current.excludeNulls).toBe(false);
  expect(result.current.tableData.length).toBe(10);
});
