import { cleanProfileData } from "../utils";

describe("cleanProfileData", () => {
  it("should remove null values from object", () => {
    const input = {
      name: "John",
      email: null,
      age: 25,
      location: null,
      bio: "Developer",
    };

    const result = cleanProfileData(input);

    expect(result).toEqual({
      name: "John",
      age: 25,
      bio: "Developer",
    });
  });

  it("should keep undefined and empty string values", () => {
    const input = {
      name: "John",
      email: undefined,
      bio: "",
      location: null,
    };

    const result = cleanProfileData(input);

    expect(result).toEqual({
      name: "John",
      email: undefined,
      bio: "",
    });
  });

  it("should return empty object when all values are null", () => {
    const input = {
      field1: null,
      field2: null,
    };

    const result = cleanProfileData(input);

    expect(result).toEqual({});
  });
});
