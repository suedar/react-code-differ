import { getFileStatus } from '../../utils/utils';
import './diff-menu.scss';

const DiffMenu = ({json}) => {

    const getNodeTree = (nodes, list, type) => {
        let currentNode = nodes;
        for (let i = 0; i < list.length - 1; i++) {
            if (list[i] === '') {
                i++;
            }

            let nodeIndex = Number.MAX_SAFE_INTEGER;
            for (let j = 0; j < currentNode.length; j++) {
                if (currentNode[j].name === list[i]) { // 如果有这一列
                    // currentNode = currentNode[i].children;
                    nodeIndex = j;
                }
            }

            if (nodeIndex === Number.MAX_SAFE_INTEGER) { // 没找到这一列
                let node = {
                    name: list[i],
                    children: [],
                };
                currentNode.push(node);
                nodeIndex = currentNode.length - 1;
            }
            currentNode = currentNode[nodeIndex].children;
        }
        currentNode.push({
            name: list[list.length - 1],
            type,
        })
    };

    const sortListByName = (a, b) => {
        const aList = a.name.split('');
        const bList = b.name.split('');
        const maxLen = aList > bList ? aList.length : bList.length;
        for (let i = 0; i < maxLen; i++) {
            if (i > aList.length - 1) {
                return -1;
            }
            else if (i > bList.length - 1) {
                return 1;
            }
            else if (aList[i] < bList[i]) {
                return -1;
            }
            return 1;
        }
    }

    const sortList = (list) => {
        const listWithChildren = [];
        const normalList = [];
        for (let i in list) {
            if (list[i].children) {
                list[i].children = sortList(list[i].children);
                listWithChildren.push(list[i]);
            }
            else {
                normalList.push(list[i]);
            }
        }
        listWithChildren.sort(sortListByName);
        normalList.sort(sortListByName);
        list = [...listWithChildren, ...normalList];

        return list;
    }

    const init = () => {
        let nodes = [];
        for (let i in json) {
            const row = json[i];
            const type = getFileStatus(row.checksumBefore, row.checksumAfter);
            if (type === 'added') {
                getNodeTree(nodes, row.newName.split('/'), 'added');
                getNodeTree(nodes, row.oldName.split('/'), 'deleted');
            }
            else if (type === 'deleted') {
                getNodeTree(nodes, row.oldName.split('/'), 'deleted');
            }
            else if (type === 'changed') {
                getNodeTree(nodes, row.newName.split('/'), 'changed');

            }
        }
        const res = sortList(nodes);
        return res;
    }

    const renderChildren = (list) => {
        return list.map(item => {
            if (item.children) {
                return <div className='diff-menu-list-item'>
                    <div className={'diff-menu-list-item-space diff-menu-list-item-space__clicked'}>
                        <img src="https://antd-scss.cdn.bcebos.com/code-diff/%E7%AE%AD%E5%A4%B4%20%E4%B8%8B.svg" alt="箭头"/>
                    </div>
                    <div className={'diff-menu-list-item-container'}>
                        <div className='diff-menu-list-item-name'>
                            <span><img src="https://antd-scss.cdn.bcebos.com/code-diff/%E6%96%87%E4%BB%B6%E5%A4%B9.svg" alt="目录"/></span>
                            <span>{ item.name }</span>
                        </div>
                        <div className='diff-menu-list-item-children'>
                            { renderChildren(item.children) }
                        </div>
                    </div>
                </div>;
            }
            return <div className='diff-menu-list-item'>
                <div className='diff-menu-list-item-name diff-menu-list-item-file'>
                    <span><img src="https://antd-scss.cdn.bcebos.com/code-diff/file-text.png" alt="文件"/></span>
                    <span>{item.name}</span>
                </div>
            </div>
        })
    }

    
    const renderContent = () => {
        const content = init();
        let res = '';
        // renderChildren(res, content);
        console.log(res, renderChildren(content), 'res');
        return renderChildren(content);
    }

    return (
        <div id="diff-menu">
            {renderContent()}
        </div>
    );
};

export default DiffMenu;
