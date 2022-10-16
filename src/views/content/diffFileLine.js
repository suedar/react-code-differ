import { getLineTypeClass, LINE_TYPES } from "../../utils/utils";

const getLinePrefix = (type) => {
  switch (type) {
    case LINE_TYPES.INSERT:
      return "+";
    case LINE_TYPES.DELETE:
      return "-";
    default:
      return "/";
  }
};

const getLineNumber = (oldNumber, newNumber) => {
  if (oldNumber && newNumber) return newNumber;
  else if (newNumber) return newNumber;
  else if (oldNumber) return oldNumber;
};

const DiffFileLine = (line, prevLine) => {
  const linePrefix = getLinePrefix(line.type);
  const hasLinePrefix = linePrefix?.length;
  const lineContent = hasLinePrefix
    ? line.content.slice(1, line.content.length + 1)
    : line.content;

  return (
    <>
      <td className={`d2h-code-side-linenumber`}>
        {getLineNumber(line.oldNumber, line.newNumber)}
      </td>
      <td className={`d2h-code-side-sp`} />
      <td className={`${getLineTypeClass(line.type)}`}>
        <span className="d2h-code-line-ctn">{lineContent}</span>
      </td>
    </>
  );
};

export default DiffFileLine;
