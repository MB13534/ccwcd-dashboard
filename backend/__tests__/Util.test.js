const crosstab = require("../util").crosstab;

test("crosstab()", () => {
  const data = [
    { date: "2019-01-01", structure: "MW-1", value: 4.5, unit: "cfs" },
    { date: "2019-01-01", structure: "MW-2", value: 2, unit: "cfs" },
    { date: "2019-01-02", structure: "MW-1", value: 3, unit: "cfs" },
    { date: "2019-01-02", structure: "MW-2", value: 9.8, unit: "cfs" },
    { date: "2019-01-03", structure: "MW-1", value: 5.6, unit: "cfs" },
    { date: "2019-01-03", structure: "MW-2", value: 7.8, unit: "cfs" },
  ];

  const crosstabbed = crosstab(data, "date", "structure", "value");
  expect(crosstabbed.length).toBe(3);
  expect(Object.keys(crosstabbed[0])).toEqual(
    expect.arrayContaining(["date", "MW-1", "MW-2"])
  );
});
