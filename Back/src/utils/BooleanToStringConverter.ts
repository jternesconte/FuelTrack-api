import { ValueTransformer } from "typeorm";

export class BooleanToStringConverter implements ValueTransformer {
  to(value: boolean): string {
    return value ? "Y" : "N";
  }

  from(value: string): boolean {
    return value === "Y";
  }
}
