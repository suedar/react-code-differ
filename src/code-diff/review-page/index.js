import DiffFileBlock from "../diff-content/diffFileBlock";
import DiffMenu from '../diff-menu/diffMenu';

import './index.scss';

const Index = ({ json: jsonList }) => {
  if (jsonList.length === 0) {
    return
  }

  const sortJsonList = jsonList.sort((a, b) => {
    const aList = a.newName.split('/');
    const bList = b.newName.split('/');

    const maxLen = aList > bList ? aList.length : bList.length;
    for (let i = 0; i < maxLen; i++) {
      if (aList?.[i] === bList?.[i]) {
        continue
      }

      if (!aList?.[i]) {
        return -1
      }
      else if (!bList?.[i]) {
        return 1
      }
      else if (aList?.[i + 1] && !bList?.[i + 1]) {
        return 1
      }
      else if (bList?.[i + 1] && !aList?.[i + 1]) {
        return -1
      }
      return aList[i] < bList[i] ? -1 : 1
    }
  })


  return (
    <div className="review-page">
      {/* Diff details */}
      {/* File List, etc.. */}
      {/* Render diff file blocks */}
      <DiffMenu json={sortJsonList}></DiffMenu>
      <div className={'review-page-diff-content'}>
        {sortJsonList.map((blocks, idx) => (
          <DiffFileBlock key={idx} {...blocks} />
        ))}
      </div>
    </div>
  );
};

export default Index;
