import React, { useEffect, useState } from "react";
import * as Diff2Html from "diff2html";
import ReviewPage from "./views/ReviewPage";

import "./styles.css";

// Config options for the view
const diffViewerConfig = {
  outputFormat: "side-by-side",
  drawFileList: true,
  matching: "lines"
};

// Parse diff to json
const parseDiffJson = (diff) => {
  return Diff2Html.parse(diff, diffViewerConfig);
};

// Get diff file from /public
const getDiff = async () => {
  const fileText = await fetch("/diffText")
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
    
  return fileText ?? "";
};

export default function App() {
  const [diffJson, setDiffJson] = useState([]);

  const init = async () => {
    const res = await getDiff();
    setDiffJson(parseDiffJson(res))
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <ReviewPage json={diffJson} />
    </div>
  );
}
