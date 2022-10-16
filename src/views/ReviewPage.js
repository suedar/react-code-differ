import DiffFileBlock from "./content/diffFileBlock";

const ReviewPage = ({ json }) => {
  return (
    <div id="review-page">
      {/* Diff details */}
      {/* File List, etc.. */}
      {/* Render diff file blocks */}
      <div>
        {json.map((blocks, idx) => (
          <DiffFileBlock {...blocks} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
