import * as ReactDOMServer from "react-dom/server";
import Mustache from "mustache";

export default function render(title) {
  const template = ReactDOMServer.renderToString(
    <button id="test-button" onClick={() => console.log("it worked")}>
      {"{{title}}"}
    </button>
  );

  return Mustache.render(template, { title: title });
}
