import { getFileStatus } from '../../utils/utils';

const DiffMenu = ({json}) => {
    const nodes = {};
    for (let i in json) {
        const row = json[i];
        const type = getFileStatus(row.checksumBefore, row.checksumAfter);
        // newName oldName
        if (type === 'added') {

        }
    }

    const setValue = (obj, list) => {
        for (let i = 0; i < list.length - 1; i++) {
            if (!obj[list[i]]) {
                // obj[list[i]] = {}
            }
        }
    };

    return (
        <div id="diff-menu">
        
        </div>
    );
};

export default DiffMenu;
