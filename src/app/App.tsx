import defaultServiceFile from "../assets/schemas/projects/default/1.1.0/service.json";
import defaultSchemaFile from "../assets/schemas/projects//default/1.1.0/schema.json";
import { Fragment, useState, useMemo, useRef } from "react";
import { JsonForms } from "@jsonforms/react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import Header from "./header/Header";
import { ServiceParser } from "./serviceParser/ServiceParser";
import { JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import React from "react";
import { Container, createTheme, ThemeProvider } from "@mui/material";

const renderers: JsonFormsRendererRegistryEntry[] = [...materialRenderers];
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        sx: {
          border: 1,
          borderColor: "#656565",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {},
    },
  },
});
let parser: ServiceParser = new ServiceParser(defaultServiceFile);
parser.schema = defaultSchemaFile;
const App = () => {
  const [data, setData] = useState<any>(parser.initialData);
  const stringifiedData: string = useMemo(
    () => JSON.stringify(JSON.parse(JSON.stringify(data)), null, 2),
    [data]
  );

  const clearData = () => {
    setData({});
  };

  const saveData = () => {
    const json = JSON.stringify(JSON.parse(JSON.stringify(data)), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "service.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const exportSchema = () => {
    const json = JSON.stringify(parser.schema, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "schema.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const copyData = () => {
    navigator.clipboard.writeText(
      JSON.stringify(JSON.parse(JSON.stringify(data)), null, 2)
    );
  };

  const uploadData = async (data: any) => {
    let dataObj: { [key: string]: any } = JSON.parse(data);
    parser = new ServiceParser(dataObj);
    setData(dataObj);
    if (ref.current) {
      (ref.current as any).clearLastProjectAndVersion();
    }
  };

  const handleFile = (file) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      uploadData(reader.result);
    };
    reader.readAsText(file[0]);
  };

  const setProject = (project: string, version: string) => {
    var service = require("../assets/schemas/projects/" +
      project +
      "/" +
      version +
      "/service.json");
    var schema = require("../assets/schemas/projects/" +
      project +
      "/" +
      version +
      "/schema.json");
    uploadData(JSON.stringify(service));
    parser.schema = schema;
  };
  const ref = useRef();

  return (
    <Fragment>
      <div className="App">
        <Header setProject={setProject} ref={ref} />
        <Grid
          container
          justifyContent={"center"}
          spacing={1}
          className="container"
        >
          <Grid item sm={4}>
            <Container className="headerSubContainer">
              <Typography variant={"h4"}>Service.json</Typography>
            </Container>
            <SimpleBarReact className="dataContent">
              <pre id="boundData">{stringifiedData}</pre>
            </SimpleBarReact>
            <Grid container className="footerSubContainer">
              <Grid item sm={4}>
                <Button
                  className="saveButton"
                  onClick={saveData}
                  color="error"
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button
                  className="copyButton"
                  onClick={copyData}
                  color="error"
                  variant="contained"
                >
                  Copy
                </Button>
              </Grid>
              <Grid item sm={4}>
                <Button
                  className="resetButton"
                  onClick={clearData}
                  color="error"
                  variant="contained"
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <Typography variant={"h4"} className="headerSubContainer">
              Input
            </Typography>
            <SimpleBarReact className="demoForm">
              <ThemeProvider theme={theme}>
                <JsonForms
                  schema={parser.schema}
                  uischema={parser.uischema}
                  data={data}
                  renderers={renderers}
                  cells={materialCells}
                  onChange={({ errors, data }) => setData(data)}
                />
              </ThemeProvider>
            </SimpleBarReact>
            <Grid container className="footerSubContainer">
              <Grid item sm={6}>
                <Button
                  variant="contained"
                  component="label"
                  className="exportSchemaButton"
                  color="error"
                  onClick={exportSchema}
                >
                  Export Schema
                </Button>
              </Grid>
              <Grid item sm={6}>
                <Button
                  variant="contained"
                  component="label"
                  className="uploadFileButton"
                  color="error"
                >
                  Upload File
                  <input
                    type="file"
                    accept=".json"
                    className="inputFile"
                    onChange={(e) => handleFile(e.target.files)}
                    hidden
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default App;
