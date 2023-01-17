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
    type = 'local', path
}) {

  const [diffJson, setDiffJson] = useState([]);

  /**
   * 允许三种数据传输方式
   * 本地文件
   * github url
   * gitlab url 暂未支持
   * @returns {Promise<string|string>}
   */
  const getDiffTextFromUrl = async () => {
    let requestUrl = path
    console.log(path, "getDiffTextFromUrl path")
    if (type === "github") {
      const githubReg = /.*\/pull\/\d+/g
      if (githubReg.test(path)) {
        requestUrl = path.match(githubReg)?.[0]
      }
    }

    console.log(type, path, "path ======")

    if (!requestUrl) {
      throw new Error("输入不正确 请进行检查")
    }

    const fileText = await fetch(requestUrl, {
      headers: {
        'accept': "application/vnd.github.v3.diff"
      }
    })
        .then((response) => response.text(requestUrl))
        .then((data) => {
          return data;
        });

    return fileText ?? "";
  };

  const init = async () => {
    const res = await getDiffTextFromUrl();
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

export default Index;
