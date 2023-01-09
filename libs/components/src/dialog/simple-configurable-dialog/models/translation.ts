export interface Translation {
  key: string;
  placeholderValues?: Array<string | number>;
}

export function isTranslation(obj: any): obj is Translation {
  return (
    typeof obj === "object" &&
    typeof obj.key === "string" &&
    (obj.placeholderValues === undefined || Array.isArray(obj.placeholderValues))
  );
}
