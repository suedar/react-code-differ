import React, { useEffect, useState } from "react";
import * as Diff2Html from "diff2html";
import ReviewPage from "./review-page";

import "./index.scss";

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


/**
 *
 * @param type url
 * @param path
 * @returns {JSX.Element}
 * @constructor
 */
const Index = function ({
    type, path
}) {

  const [diffJson, setDiffJson] = useState([]);

  const init = async () => {
    // const res = await getDiff();
    setDiffJson(parseDiffJson(rawText))
  }

  /**
   * 允许三种数据传输方式
   * 本地文件
   * github url
   * gitlab url 暂未支持
   * @returns {Promise<string|string>}
   */
  const getDiffTextFromUrl = async (url) => {
    let requestUrl = url
    if (type === "github") {
      const githubReg = /.*\/pull\/\d+/g
      if (githubReg.test(url)) {
        requestUrl = githubReg.match(url)?.[0]
      }
    }
    const fileText = await fetch(url)
        .then((response) => response.text(requestUrl))
        .then((data) => {
          return data;
        });

    return fileText ?? "";
  };


  useEffect(() => {
    init();
  }, []);

  return (
      <div className="App">
        <ReviewPage json={diffJson} />
      </div>
  );
}

export default Index;
