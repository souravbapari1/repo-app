import fs from "fs";
import path from "path";

// Path to the routes directory (where your route files are stored)

const routesFilePath = path.join(__dirname, "../routes", "routes.ts"); // The file where the routes array is stored
const directory = path.join(__dirname, "../routes");
// This function finds the route names by scanning the file name
const getRouteNameFromFile = (fileName: string): string | null => {
  const match = fileName.match(/^(\w+)\.routes\.ts$/);
  return match ? match[1] : null;
};

// This function adds route imports and the route array to the routes.ts file
const addRoutesToFile = (routeNames: string[], routePaths: string[]): void => {
  const importStatements = routeNames
    .map((route, index) => {
      const relativePath = routePaths[index].replace(/\.ts$/, ""); // Remove .ts extension
      return `import ${route}Routes from './${relativePath}';`;
    })
    .join("\n");

  const routesArray = routeNames.map((route) => `${route}Routes`).join(",\n  ");

  // Read the content of the routes.ts file
  const fileContent = fs.readFileSync(routesFilePath, "utf-8");

  // If the imports and routes array are already in place, do nothing
  const importCheck = importStatements + "\n\n" + "export const routes = [";
  if (fileContent.includes(importCheck)) {
    console.log("Routes are already up-to-date.");
    return;
  }

  // Add the imports and the routes array
  const updatedContent = `// This file is auto generate please not modify by hand
//Last Update: ${new Date()} \n
  ${importStatements}\n\nexport const routes = [\n  ${routesArray},\n];`;

  // Write the updated content back to routes.ts
  fs.writeFileSync(routesFilePath, updatedContent, "utf-8");
  console.log("Routes updated in routes.ts");
};

// This function recursively processes all route files in the routes directory
export const processRouteFiles = (): void => {
  const routeNames: string[] = [];
  const routePaths: string[] = [];

  const readRoutes = (dir: string, subPath: string = ""): void => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const relativePath = path.join(subPath, file).replace(/\\/g, "/"); // Ensure forward slashes for paths

      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        readRoutes(fullPath, relativePath); // Recursively process subdirectories
      } else if (stats.isFile()) {
        const routeName = getRouteNameFromFile(file);
        if (routeName) {
          routeNames.push(routeName);
          routePaths.push(relativePath);
        }
      }
    });
  };

  readRoutes(directory);

  if (routeNames.length > 0) {
    addRoutesToFile(routeNames, routePaths);
  } else {
    console.log("No route files found.");
  }
};

// Execute the script on your routes directory
