import { renderHook, act } from "@testing-library/react-hooks";
import useTable from "../hooks/useTable";
import { generateCrosstabbedDailyData } from "../../../backend/util";

let result;

beforeAll(() => {
  const data = generateCrosstabbedDailyData(10);
  const columns = [
    { label: "Date", accessor: "Date" },
    { label: "West Stage (ft)", accessor: "West Stage (ft)" },
    { label: "Oster Stage (ft)", accessor: "Oster Stage (ft)" },
    { label: "FIDCO Stage (ft)", accessor: "FIDCO Stage (ft)" },
    { label: "West Flow (CFS)", accessor: "West Flow (CFS)" },
    { label: "Oster Flow (CFS)", accessor: "Oster Flow (CFS)" },
    { label: "FIDCO Flow (CFS)", accessor: "FIDCO Flow (CFS)" },
  ];
  result = renderHook(() => useTable(data, columns)).result;
  return result;
});

test("useTable() returns expected headers, keys, and filteredKeys", () => {
  const { headers, keys, filteredKeys } = result.current;

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
