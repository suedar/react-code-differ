import { getFileStatus } from '../../utils/utils';

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

    const renderContent = () => {

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
    }

    init();


    return (
        <div id="diff-menu">

        </div>
    );
};

export default DiffMenu;
