import { getFileStatus } from "../utils/utils";

const DiffFileStatusTag = ({ checksumBefore, checksumAfter }) => {
  const status = getFileStatus(checksumBefore, checksumAfter);
  return (
    <span className={`d2h-tag d2h-${status} d2h-${status}-tag`}>{status}</span>
  );
};

export default DiffFileStatusTag;
