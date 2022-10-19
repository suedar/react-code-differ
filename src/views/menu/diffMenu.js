import { getFileStatus } from '../../utils/utils';
import './diff-menu.scss';
import { useEffect, useState } from "react";

const DiffMenu = ({json}) => {

    const [currentList, setCurrentList] = useState([]);

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

    const toggleThis = (row, indexList) => {
        // const currentList = currentList
        let head = currentList;
        let temp = head;
        for (let i = 0; i < indexList.length - 1; i++) {
            console.log(indexList[i], temp[indexList[i]].children)
            temp = temp[indexList[i]].children;
        }
        console.log(temp, indexList[indexList.length - 1], indexList, 'indexList')
        temp[indexList[indexList.length - 1]].clicked = !row.clicked;
        console.log(head, 'test')
        setCurrentList([...head])
        // row.clicked = !row.clicked;

    }

    const renderChildren = (list, indexList) => {
        return list.map((item, index) => {
            if (item.children) {
                return <div className='diff-menu-list-item'
                    key={item.name}
                >
                    <div className={{
                        'diff-menu-list-item-space': true,
                        'diff-menu-list-item-space__clicked': item.clicked,
                    }}
                         onClick={() => toggleThis(item, [...indexList, index])}
                    >
                        <img src="https://antd-scss.cdn.bcebos.com/code-diff/%E7%AE%AD%E5%A4%B4%20%E4%B8%8B.svg" alt="箭头"/>
                    </div>
                    <div className={'diff-menu-list-item-container'}>
                        <div className='diff-menu-list-item-name' onClick={() => toggleThis(item, [...indexList, index])}>
                            <span><img src="https://antd-scss.cdn.bcebos.com/code-diff/%E6%96%87%E4%BB%B6%E5%A4%B9.svg" alt="目录"/></span>
                            <span>{ item.name }</span>
                        </div>
                        <div className={{
                            'diff-menu-list-item-children': true,
                            'diff-menu-list-item-children-hidden': item.clicked,
                        }}>
                            { renderChildren(item.children, [...indexList, index]) }
                        </div>
                    </div>
                </div>;
            }
            return <div className='diff-menu-list-item' key={item.name}>
                <div className='diff-menu-list-item-name diff-menu-list-item-file'>
                    <span><img src="https://antd-scss.cdn.bcebos.com/code-diff/file-text.png" alt="文件"/></span>
                    <span>{item.name}</span>
                </div>
            </div>
        })
    }

    useEffect(() => {
        const content = init();
        console.log(content, 'test')
        setCurrentList(content);
    }, [json])
    
    // const renderContent = () => {
    //     // const content = init();
    //     // setCurrentList(content);
    //     return renderChildren(currentList);
    // }

    return (
        <div className="diff-menu">
            {renderChildren(currentList, [])}
        </div>
    );
};

export default DiffMenu;
