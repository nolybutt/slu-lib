// deno-lint-ignore ban-types
type Enum<Keys extends string> = { [Key in Keys as Capitalize<Key>]: Key } & {};

export function enumFromUnion<Union extends string>(obj: Enum<Union>): Enum<Union> {
  return obj;
}
