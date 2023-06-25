import React, { forwardRef, useImperativeHandle, useState } from "react";
import logo from "../../assets/images/logo.svg";
import projectsFile from "../../assets/schemas/projects.json";
import { Button, Grid, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface HeaderProps {
  setProject: Function;
}

const getProjects = () => {
  let projects: string[] = [];
  for (const e in projectsFile) {
    projects.push(projectsFile[e].project);
  }
  return projects;
};

const getVersions = (project: string) => {
  let versions: string[] = [];
  for (const e in projectsFile) {
    if (projectsFile[e].project === project) {
      for (const v in projectsFile[e].versions) {
        versions.push(projectsFile[e].versions[v]);
      }
    }
  }
  return versions;
};

const projects: string[] = getProjects();
let currentProject: string = projects[0];

let currentVersion: string = getVersions(projects[0])[0];
const Header = forwardRef((props: HeaderProps, ref: any) => {
  const [versions, setVersions] = useState<any>(getVersions(projects[0]));
  const [lastProject, setLastProject] = useState<any>(projects[0]);
  const [lastVersion, setLastVersion] = useState<any>(currentVersion);
  const [selectProject, setSelectProject] = useState<any>(projects[0]);
  const [selectVersion, setSelectVersion] = useState<any>(currentVersion);
  useImperativeHandle(ref, () => ({
    clearLastProjectAndVersion() {
      setLastProject("");
      setLastVersion("");
    },
  }));

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Grid container justifyContent={"center"} spacing={1}>
        <Grid item sm={4} className="Header-container">
          {lastProject !== "" && (
            <Typography variant="h6" className="App-title">
              <b>Current project:</b> {lastProject} - {lastVersion}
            </Typography>
          )}
          {lastProject === "" && (
            <Typography variant="h6" className="App-title">
              <b>Custom project</b>
            </Typography>
          )}
        </Grid>
        <Grid item sm={8} textAlign={"center"}>
          <Select
            className="chooseProjectSelect"
            value={selectProject}
            onChange={(e) => {
              currentProject = e.target.value;
              currentVersion = getVersions(e.target.value)[0];
              setVersions(getVersions(e.target.value));
              setSelectProject(currentProject);
              setSelectVersion(currentVersion);
            }}
            color="error"
          >
            {projects.map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
          <Select
            className="chooseProjectSelect"
            value={selectVersion}
            onChange={(e) => {
              currentVersion = e.target.value;
              setSelectVersion(currentVersion);
            }}
            color="error"
          >
            {versions.map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            component="label"
            className="chooseProjectButton"
            color="error"
            onClick={() => {
              props.setProject(currentProject, currentVersion);
              setLastProject(currentProject);
              setLastVersion(currentVersion);
            }}
          >
            Load project
          </Button>
        </Grid>
      </Grid>
    </header>
  );
});

export default Header;
