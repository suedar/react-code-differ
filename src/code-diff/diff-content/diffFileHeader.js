import DiffFileStatus from "./diffFileStatusTag";
import { transferFilePath } from '../utils/utils';

const DiffFileHeader = ({
  fileHtmlId,
  filePath,
  diffs,
  checksumBefore,
  checksumAfter,
  language
}) => {
  return (
    <div className="d2h-file-header" id={transferFilePath(filePath)}>
      <span className="d2h-file-name-wrapper">
        {/* Icon - TODO add icon component */}
        <svg
          aria-hidden="true"
          className="d2h-icon"
          height="16"
          version="1.1"
          viewBox="0 0 12 16"
          width="12"
        >
          <path d="M6 5H2v-1h4v1zM2 8h7v-1H2v1z m0 2h7v-1H2v1z m0 2h7v-1H2v1z m10-7.5v9.5c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1V2c0-0.55 0.45-1 1-1h7.5l3.5 3.5z m-1 0.5L8 2H1v12h10V5z"></path>
        </svg>
        <span className="d2h-file-name">{`${filePath}`}</span>
        <DiffFileStatus
          checksumBefore={checksumBefore}
          checksumAfter={checksumAfter}
        />
      </span>
    </div>
  );
};

export default DiffFileHeader;
