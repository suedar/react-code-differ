import * as ReactDOMServer from "react-dom/server";
import Mustache from "mustache";
import { createRoot } from 'react-dom/client'

export default function render(title) {
  const template = ReactDOMServer.renderToString(
    <button id="test-button" onClick={() => console.log("it worked")}>
      {"{{title}}"}
    </button>
  );

  return {}
}
