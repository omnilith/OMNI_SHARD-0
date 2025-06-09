import { validateAndPrepareEntity } from "../core/validateAndPrepareEntity";
import { describe, it, expect } from "vitest";
import { Form } from "@/core/types";

describe("validateAndPrepareEntity", () => {
  it("validates a simple string, number, boolean entity", () => {
    const entity = {
      id: "1",
      type: "Test",
      name: "John Doe",
      age: 30,
      isActive: true,
    };
    const form: Form = {
      id: "form-1",
      type: "Form",
      label: "Test",
      description: "Test",
      properties: [
        { name: "name", type: "string", required: true, label: "Name" },
        { name: "age", type: "number", required: true, label: "Age" },
        { name: "isActive", type: "boolean", required: false, label: "Active" },
      ],
    };
    expect(validateAndPrepareEntity(entity, form)).toEqual({
      valid: true,
      entity,
    });
  });

  it("fails if required field is missing", () => {
    const entity = { id: "2", type: "Test", age: 30 };
    const form: Form = {
      id: "form-2",
      type: "Form",
      label: "Test",
      description: "Test",
      properties: [
        { name: "name", type: "string", required: true, label: "Name" },
        { name: "age", type: "number", required: true, label: "Age" },
      ],
    };
    const result = validateAndPrepareEntity(entity, form);
    expect(result.valid).toBe(false);
    expect(result).toHaveProperty("error");
  });

  it("validates list and object types", () => {
    const entity = {
      id: "3",
      type: "Test",
      tags: ["a", "b"],
      meta: { foo: 1 },
    };
    const form: Form = {
      id: "form-3",
      type: "Form",
      label: "Test",
      description: "Test",
      properties: [
        { name: "tags", type: "list", required: false, label: "Tags" },
        { name: "meta", type: "object", required: false, label: "Meta" },
      ],
    };
    expect(validateAndPrepareEntity(entity, form)).toEqual({
      valid: true,
      entity,
    });
  });

  it("validates relation (single and multiple)", () => {
    const entity = {
      id: "4",
      type: "Test",
      author: "user-1",
      tags: ["tag-1", "tag-2"],
    };
    const form: Form = {
      id: "form-4",
      type: "Form",
      label: "Test",
      description: "Test",
      properties: [
        { name: "author", type: "relation", required: true, label: "Author" },
        {
          name: "tags",
          type: "relation",
          required: false,
          label: "Tags",
          relationMultiple: true,
        },
      ],
    };
    expect(validateAndPrepareEntity(entity, form)).toEqual({
      valid: true,
      entity,
    });
    // Invalid single
    expect(
      validateAndPrepareEntity({ id: "4a", type: "Test", author: 123 }, form)
        .valid
    ).toBe(false);
    // Invalid multiple
    expect(
      validateAndPrepareEntity(
        { id: "4b", type: "Test", author: "user-1", tags: [123] },
        form
      ).valid
    ).toBe(false);
  });

  it("validates datetime", () => {
    const entity = { id: "5", type: "Test", created: "2024-06-09T12:00:00Z" };
    const form: Form = {
      id: "form-5",
      type: "Form",
      label: "Test",
      description: "Test",
      properties: [
        { name: "created", type: "datetime", required: true, label: "Created" },
      ],
    };
    expect(validateAndPrepareEntity(entity, form)).toEqual({
      valid: true,
      entity,
    });
    expect(
      validateAndPrepareEntity({ id: "5a", type: "Test", created: 123 }, form)
        .valid
    ).toBe(false);
  });

  it("validates enum (single and multiple)", () => {
    const entity = {
      id: "6",
      type: "Test",
      color: "red",
      tags: ["red", "blue"],
    };
    const form: Form = {
      id: "form-6",
      type: "Form",
      label: "Test",
      description: "Test",
      properties: [
        {
          name: "color",
          type: "enum",
          required: true,
          label: "Color",
          enumOptions: ["red", "blue"],
        },
        {
          name: "tags",
          type: "enum",
          required: false,
          label: "Tags",
          enumOptions: ["red", "blue"],
          enumMultiple: true,
        },
      ],
    };
    expect(validateAndPrepareEntity(entity, form)).toEqual({
      valid: true,
      entity,
    });
    // Invalid single
    expect(
      validateAndPrepareEntity({ id: "6a", type: "Test", color: "green" }, form)
        .valid
    ).toBe(false);
    // Invalid multiple
    expect(
      validateAndPrepareEntity(
        { id: "6b", type: "Test", color: "red", tags: ["red", "green"] },
        form
      ).valid
    ).toBe(false);
  });
});
