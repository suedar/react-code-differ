import DiffFileBlock from "./content/diffFileBlock";
import DiffMenu from './menu/diffMenu';

import './index.scss';

const ReviewPage = ({ json }) => {
  return (
    <div className="review-page">
      {/* Diff details */}
      {/* File List, etc.. */}
      {/* Render diff file blocks */}
      <DiffMenu json={json}></DiffMenu>  
      <div className={'review-page-content'}>
        {json.map((blocks, idx) => (
          <DiffFileBlock key={idx} {...blocks} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
