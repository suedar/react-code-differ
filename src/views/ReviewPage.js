import DiffFileBlock from "./content/diffFileBlock";
import DiffMenu from './menu/diffMenu';

const ReviewPage = ({ json }) => {
  console.log(json, 'json')
  return (
    <div id="review-page">
      {/* Diff details */}
      {/* File List, etc.. */}
      {/* Render diff file blocks */}
      <DiffMenu json={json}></DiffMenu>  
      <div>
        {json.map((blocks, idx) => (
          <DiffFileBlock {...blocks} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
