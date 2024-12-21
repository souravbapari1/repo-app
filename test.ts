type ParsedValue = string | number | boolean | ParsedObject | ParsedValue[];

interface ParsedObject {
  [key: string]: ParsedValue;
}

function parseObject(
  obj: ParsedValue,
  ignoreKeys: string[] = [],
  currentPath: string = ""
): ParsedValue {
  if (Array.isArray(obj)) {
    return obj.map((item, index) => {
      return parseObject(item, ignoreKeys, `${currentPath}[${index}]`);
    });
  } else if (obj !== null && typeof obj === "object") {
    const parsedObject: ParsedObject = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const path = currentPath ? `${currentPath}.${key}` : key;

        // Check if the current path should be ignored
        if (shouldIgnoreKey(path, ignoreKeys)) {
          parsedObject[key] = obj[key]; // Keep the original value for ignored keys
        } else {
          const value = obj[key];

          if (typeof value === "string") {
            // Try to parse booleans
            if (value.toLowerCase() === "true") {
              parsedObject[key] = true;
            } else if (value.toLowerCase() === "false") {
              parsedObject[key] = false;
            }
            // Try to parse numbers
            else if (!isNaN(value as any) && value.trim() !== "") {
              parsedObject[key] = Number(value);
            }
            // Keep as string if no other type matches
            else {
              parsedObject[key] = value;
            }
          } else {
            // Recursively parse nested objects/arrays
            parsedObject[key] = parseObject(value, ignoreKeys, path);
          }
        }
      }
    }

    return parsedObject;
  } else {
    return obj;
  }
}

// Function to check if a key should be ignored
function shouldIgnoreKey(path: string, ignoreKeys: string[]): boolean {
  return ignoreKeys.some((ignoreKey) => {
    // Check if the path matches an ignoreKey exactly or if the ignoreKey is a prefix (supporting dot notation and array indexes)
    const pattern = new RegExp(
      `^${ignoreKey.replace(/\./g, "\\.").replace(/\[\d+\]/g, "\\[\\d+\\]")}`
    );
    return pattern.test(path);
  });
}
