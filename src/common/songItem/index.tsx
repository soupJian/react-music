import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
import { connect, MusicModelState } from 'umi';
import { formatTime } from '../common_ts/index';
import { propsType, songItemType } from '@/tsType/index';
// 获取Body对象高度
let height = document.body.clientHeight;
// 左侧列表区域
let tableHeight = height - 64 - 120 - 10 - 64 - 60; // 64 header高度，120图片高度，10margin-top,32底部分页 60 底部footer
let pageSize = tableHeight / 33;
if (pageSize < 6) {
  pageSize = 6;
}
if (pageSize > 8) {
  pageSize = 8;
}
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
const Index = (props: propsType) => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      // ellipsis: true,
      render: (name: string, data: any) => (
        <p
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          onClick={() => {
            // 点击播放
            playThis(data);
          }}
        >
          {name}
        </p>
      ),
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      width: 60,
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
          <span>播放</span>
          <span>播放</span>
          <span>播放</span>
          <span>播放</span>
        </>
      ),
    },
  ];
  const playThis = (data: any) => {
    const index = dataSource.findIndex((item: any) => {
      return item.id == data.id;
    });
    props.dispatch({
      type: 'music/setCurrentIndex',
      payload: { currentIndex: index },
    });
    props.dispatch({
      type: 'music/setPlayList',
      payload: { playList: JSON.parse(JSON.stringify(dataSource)) },
    });
    // 设置随机播放列表
    props.dispatch({
      type: 'music/setRandowList',
      payload: { randowList: JSON.parse(JSON.stringify(dataSource)) },
    });
  };
  const dataSource = props.songitemlist.map((item: songItemType) => {
    return {
      name: item.name,
      duration: formatTime(item.dt),
      id: item.id,
      singer: formatSinger(item.ar),
      al: item.al, // 专辑
      dt: item.dt, // 播放时长
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
export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(Index);
