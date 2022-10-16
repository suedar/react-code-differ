import DiffFileBody from "../components/diffFileBody";
import DiffFileHeader from "../components/diffFileHeader";

// UI element for a diff
// Each block represents a single file
const DiffFileBlock = ({ blocks, newName, checksumBefore, checksumAfter }) => {
  return (
    <div id="diff-file-block">
      <div id="" className="d2h-file-wrapper" data-lang="">
        <DiffFileHeader
          filePath={newName}
          checksumBefore={checksumBefore}
          checksumAfter={checksumAfter}
        />
        <div className="d2h-files-diff">
          <DiffFileBody {...blocks} />
        </div>
      </div>
    </div>
  );
};

export default DiffFileBlock;
