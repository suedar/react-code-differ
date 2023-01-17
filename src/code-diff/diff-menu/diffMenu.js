import { useEffect, useRef, useState } from "react";

import { getFileStatus } from '../utils/utils';
import './diff-menu.scss';

const DiffMenu = ({json}) => {


    const diffObj = {
        added: 'https://antd-scss.cdn.bcebos.com/code-diff/round_add%20(1).svg',
        deleted: 'https://antd-scss.cdn.bcebos.com/code-diff/reduce_b.svg',
        changed: 'https://antd-scss.cdn.bcebos.com/code-diff/round_add%20(2).svg',
    }

    const [currentList, setCurrentList] = useState([]);
    const diffMenuRef = useRef();

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
            fullPath: list.join('-')
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
        list = [...normalList, ...listWithChildren];

        return list;
    }

    const clickFile = (id, type) => {
        if (type === 'deleted') {
            return;
        }
        const queryDom = document.getElementById(id);
        queryDom.scrollIntoView({behavior: "smooth"})
    }

    const toggleThis = (row, indexList) => {
        let head = currentList;
        let temp = head;
        for (let i = 0; i < indexList.length - 1; i++) {
            temp = temp[indexList[i]].children;
        }
        temp[indexList[indexList.length - 1]].clicked = !row.clicked;
        setCurrentList([...head])
    }

    const renderChildren = (list, indexList, position) => {
        return list.map((item, index) => {
            // 如果存在子节点
            if (item.children) {
                return <div className='diff-menu-list-item'
                    key={item.name}
                >
                    <div className={
                        item.clicked
                          ? 'diff-menu-list-item-space diff-menu-list-item-space__clicked'
                          : 'diff-menu-list-item-space'
                    }
                         onClick={() => toggleThis(item, [...indexList, index])}
                    >
                        <img src="https://antd-scss.cdn.bcebos.com/code-diff/%E7%AE%AD%E5%A4%B4%20%E4%B8%8B.svg" alt="箭头"/>
                    </div>
                    <div className={'diff-menu-list-item-container'}>
                        <div className='diff-menu-list-item-name diff-menu-list-item-owner' onClick={() => toggleThis(item, [...indexList, index])}>
                            <span><img src="https://antd-scss.cdn.bcebos.com/code-diff/%E6%96%87%E4%BB%B6%E5%A4%B9.svg" alt="目录"/></span>
                            <span>{ item.name }</span>
                        </div>
                        <div className={
                            item.clicked
                              ? 'diff-diff-menu-list-item-children diff-menu-list-item-children-hidden'
                              : 'diff-diff-menu-list-item-children'}>
                            { renderChildren(item.children, [...indexList, index]) }
                        </div>
                    </div>
                </div>;
            }
            // 如果不存在子节点
            return <div className='diff-menu-list-item diff-menu-list-item-file' key={item.name} onClick={() => clickFile(item.fullPath, item.type)}>
                {/* 如果是最外层 */}
                {position === 'first' && <div className={'diff-menu-list-item-space'}></div>}
                <div className='diff-menu-list-item-name diff-menu-list-item-file-left'>
                    <span><img src="https://antd-scss.cdn.bcebos.com/code-diff/file-text.png" alt="文件"/></span>
                    <span>{item.type === 'deleted' ? <del>{item.name}</del> : item.name}</span>
                </div>
                <div className="diff-menu-list-item-icon">
                    <img src={diffObj[item.type]} alt="图标"/>
                </div>
            </div>
        })
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

    useEffect(() => {
        const content = init();
        setCurrentList(content);

        // 确保目录不坍塌
        setTimeout(() => {
            document.getElementById('diff-menu').style.width = diffMenuRef.current?.clientWidth + 'px'
            document.getElementById('diff-menu').style.minWidth = diffMenuRef.current?.clientWidth + 'px'
        }, 0)

    // eslint-disable-next-line
    }, [json])

    return (
        <div id={"diff-menu"}  className="diff-menu" ref={diffMenuRef}>
            {renderChildren(currentList, [], 'first')}
        </div>
    );
};

export default DiffMenu;
