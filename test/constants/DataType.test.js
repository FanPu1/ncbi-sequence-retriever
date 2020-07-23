const DataType = require("./../../src/constants/DataType");

test ("DataType returns expected enum value", ()=> {
  expect(DataType.DNA).toBe("DNA");
  expect(DataType.RNA).toBe("RNA");
  expect(DataType.PROTEIN).toBe("protein");
  expect(DataType.PDB).toBe("pdb");
  expect(DataType.ALL).toBe("all");
  expect(DataType.NUCLEOTIDES).toBe("nucleotides");
  expect(DataType.UNKNOWN).toBe("unknown");
});

test ("Values in DataType cannot be changed", ()=> {
  // try to change the value in constant
  DataType.DNA = "changed string 1";
  DataType.RNA = "changed string 2";
  DataType.PROTEIN = "changed string 3";
  DataType.PDB = "changed string 4";
  // expect value will not be changed.
  expect(DataType.DNA).toBe("DNA");
  expect(DataType.RNA).toBe("RNA");
  expect(DataType.PROTEIN).toBe("protein");
  expect(DataType.PDB).toBe("pdb");
});