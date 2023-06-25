# JSON-CREATOR

## Documentation

Based on JSON Forms framework - [jsonforms.io](https://jsonforms.io)

## Getting started

**Node 14.21.0**

1. Clone the app with `git clone https://github.com/AStrap/json-creator.git`
2. Update `src/assets/schemas/service.json` (default file)
3. Install dependencies with `npm ci`
4. Run the app with `npm run start`

## Build desktop app

1. Clone the app with `git clone https://github.com/AStrap/json-creator.git`
2. Update `src/assets/schemas/service.json` (default file)
3. Install dependencies with `npm ci`
4. LINUX: create desktop app with `npm run build:package:linux`
5. WINDOWS: create desktop app with `npm run build:package:windows`

## Add an available project (feature created due to the need to create configuration files for various projects)

1. Through the application, upload the "service.json" and download the basic schema with the "export schema" feature.
2. In the folder src/assets/schemas/projects create a folder for the project (if it doesn't already exists)
3. In the folder src/assets/schemas/projects/{projectName} create a folder for the version to add
4. In the file src/assets/schemas/projects.json add information about the current version of the project
   `{"project": "test", "versions": ["1.0.0","1.1.0"]}`
5. In the folder src/assets/schemas/projects/{projectName}/{projectVersion} create "service.json" file with an example of possible output
6. Move the "schema.json" file (downloaded in first point) in src/assets/schemas/projects/{projectName}/{projectVersion}
7. Enrich the schema.json file by specifying the characteristics to be checked for in the input phase

## Source

Started from MIT Projects - [jsonforms-react-seed](https://github.com/eclipsesource/jsonforms-react-seed.git)
