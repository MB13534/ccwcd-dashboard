import { getAssociations, validateDependentSelections } from "../util/";

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

test("validateDependentSelections()", () => {
  const previousParentSelections = [1, 2];
  const newParentSelections = [1];
  const childData = [
    { ndx: 8, display: "option 1", assoc_ndx: [1] },
    { ndx: 9, display: "option 2", assoc_ndx: [1] },
    { ndx: 4, display: "option 3", assoc_ndx: [2] },
    { ndx: 5, display: "option 4", assoc_ndx: [2] },
  ];
  const previousChildSelections = [8, 9, 4, 5];
  const assocField = "assoc_ndx";
  const valueField = "ndx";

  const updatedSelections = validateDependentSelections({
    previousParentSelections,
    newParentSelections,
    childData,
    previousChildSelections,
    assocField,
    valueField,
  });
  expect(updatedSelections.length).toBe(2);
  expect(updatedSelections).toEqual(expect.arrayContaining([8, 9]));
});
