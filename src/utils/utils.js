export const getFileStatus = (checksumBefore, checksumAfter) => {
  switch (true) {
    case checksumBefore === "0000000":
      return "added";
    case checksumAfter === "0000000":
      return "deleted";
    default:
      return "changed";
  }
};

export const LINE_TYPES = {
  CONTEXT: "context",
  DELETE: "delete",
  INSERT: "insert",
  INFO: "info",
  EMPTY: "empty"
};

export const getLineTypeClass = (type) => {
  switch (type) {
    case LINE_TYPES.CONTEXT:
      return "d2h-ctnx d2h-context";
    case LINE_TYPES.DELETE:
      return "d2h-del";
    case LINE_TYPES.INSERT:
      return "d2h-ins";
    case LINE_TYPES.INFO:
      return "d2h-info";
    case LINE_TYPES.EMPTY:
      return "d2h-code-side-emptyplaceholder d2h-cntx d2h-emptyplaceholder";
    default:
      return;
  }
};
