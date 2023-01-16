import DiffFileBlock from "../diff-content/diffFileBlock";
import DiffMenu from '../diff-menu/diffMenu';

import './index.scss';

const Index = ({ json }) => {
  return (
    <div className="review-page">
      {/* Diff details */}
      {/* File List, etc.. */}
      {/* Render diff file blocks */}
      <DiffMenu json={json}></DiffMenu>  
      <div className={'review-page-diff-content'}>
        {json.map((blocks, idx) => (
          <DiffFileBlock key={idx} {...blocks} />
        ))}
      </div>
    </div>
  );
};

export default Index;
