import { getAssociations } from "../util/";

test("getAssociations()", () => {
  const StructureTypes = [1, 2];
  const Structures = [
    { value: 1, display: "Structure 1", structure_types: [2] },
    { value: 2, display: "Structure 1", structure_types: [1, 2] },
    { value: 3, display: "Structure 1", structure_types: [3, 4] },
    { value: 4, display: "Structure 1", structure_types: [5] },
  ];

  const limitedStructures = getAssociations(
    StructureTypes,
    Structures,
    "structure_types"
  );
  expect(limitedStructures.length).toBe(2);
  expect(limitedStructures[1].structure_types).toEqual(
    expect.arrayContaining([1, 2])
  );
});
