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
      (total: any, item: { name: string }) => total.concat(item.name),
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
          pageSize: 8,
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
