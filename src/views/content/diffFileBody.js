import DiffFileLine from "./diffFileLine";
import { LINE_TYPES } from "../../utils/utils";

const Column = ({ lines }) => {
  return (
    <div className="d2h-file-side-diff">
      <div className="d2h-code-wrapper">
        <table className="d2h-diff-table">
          <tbody className="d2h-diff-tbody">
            {lines?.length
              ? lines.map((line, _idx) => {
                  return (
                    <tr key={_idx}>
                      <DiffFileLine {...line.leftSide} />
                      <DiffFileLine {...line.rightSide} />
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// single column split view
const SingleColumnSplitView = ({ lines }) => {
  const arr = Object.values(lines).reduce((_t, { lines }) => lines, 0);
  const linesArray = [];

  arr.forEach((line, _idx) => {
    if (line.type === LINE_TYPES.CONTEXT) {
      // unchanged lines should mirror on both sides of the body
      linesArray.push({ leftSide: line, rightSide: line });
    } else if (line.type === LINE_TYPES.DELETE) {
      // deleted lines should show changes on left, empty on right
      linesArray.push({
        leftSide: line,
        rightSide: { ...line, type: LINE_TYPES.EMPTY, content: "" }
      });
    } else if (line.type === LINE_TYPES.INSERT) {
      // added lines should show empty on left, changes on right
      linesArray.push({
        leftSide: { ...line, type: LINE_TYPES.EMPTY, content: "" },
        rightSide: line
      });
    }
  });

  return <Column lines={linesArray} />;
};

// Contains the diff line changes
const DiffFileBody = (lines) => {
  return <SingleColumnSplitView lines={lines} />;
};

export default DiffFileBody;
