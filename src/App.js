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
const getDiff = async (cb) => {
  const fileText = await fetch("/diffText")
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
  cb(fileText ?? "");
};

export default function App() {
  const [diffText, setDiffText] = useState("");

  useEffect(() => {
    getDiff(setDiffText);
  }, []);

  return (
    <div className="App">
      <ReviewPage json={parseDiffJson(diffText)} />
    </div>
  );
}
