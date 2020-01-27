import { renderHook, act } from "@testing-library/react-hooks";
import useTable from "../hooks/useTable";
import { generateCrosstabbedDailyData } from "../../../backend/util";

let result;

beforeAll(() => {
  const data = generateCrosstabbedDailyData(10);
  const columns = [
    {
      label: "Date",
      accessor: "Date",
      filter: { enabled: true, type: "date" },
      columnToggle: { enabled: true },
    },
    {
      label: "West Stage (ft)",
      accessor: "West Stage (ft)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      label: "Oster Stage (ft)",
      accessor: "Oster Stage (ft)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      label: "FIDCO Stage (ft)",
      accessor: "FIDCO Stage (ft)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      label: "West Flow (CFS)",
      accessor: "West Flow (CFS)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
      label: "Oster Flow (CFS)",
      accessor: "Oster Flow (CFS)",
      filter: { enabled: false },
      columnToggle: { enabled: true },
    },
    {
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

test("useTable() toggle columns works", () => {
  const { filteredKeys, handleFilteredKeys } = result.current;

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

  expect(filteredKeys).toEqual(expect.arrayContaining(initHeaderKeys));
  act(() => {
    handleFilteredKeys(activeColumns);
  });
  expect(filteredKeys).toEqual(expect.arrayContaining(activeColumns));
});

test("useTable() filter config works", () => {
  const { filters } = result.current;

  expect(filters[0].filter.min).toBe("2019-12-13");
  expect(filters[0].filter.max).toBe("2020-01-27");
});
