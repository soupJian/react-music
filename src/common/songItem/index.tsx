import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
    width: 250,
    ellipsis: true,
  },
  {
    title: '时长',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '歌手',
    dataIndex: 'singer',
    key: 'singer',
    width: 200,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <>
        <a target="blank">操作</a>
      </>
    ),
  },
];
interface songItemType {
  name: string;
  dt: number;
  id: number;
  ar: [];
}
// 获取Body对象高度
let height = document.body.clientHeight;
// 左侧列表区域
let tableHeight = height - 64 - 120 - 10 - 64; // 64 header高度，120图片高度，10margin-top,32底部分页
let pageSize = tableHeight / 33;
if (pageSize < 6) {
  pageSize = 6;
}
if (pageSize > 10) {
  pageSize = 10;
}
const formatTime = (time: number) => {
  let minute = Math.floor(time / 1000 / 60);
  let second = Math.floor(time / 1000 - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
};
const formatSinger = (singer: any) => {
  if (singer.length > 1) {
    return singer.reduce(
      (total: any, item: { name: string }) => total.concat(item.name, ' '),
      [],
    );
  } else {
    return [singer[0].name];
  }
};
const Index = (props: { songitemlist: [] }) => {
  const dataSource = props.songitemlist.map((item: songItemType) => {
    return {
      name: item.name,
      duration: formatTime(item.dt),
      id: item.id,
      singer: formatSinger(item.ar),
    };
  });
  return (
    <div className={styles.songlist_item}>
      <Table
        className={styles.table_item}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: false,
          showTitle: true,
          showQuickJumper: true,
        }}
        dataSource={dataSource}
        columns={columns}
        rowKey={(dataSource: { id: number }) => dataSource.id}
      />
    </div>
  );
};

export default Index;
