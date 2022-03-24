import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
import { connect, MusicModelState } from 'umi';
import { formatTime, shuffle } from '../common_ts/index';
import { propsType, songItemType } from '@/tsType/index';
// 获取Body对象高度
let height = document.body.clientHeight;
const Index = (props: any) => {
  const mode = props.music.mode;
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
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
      ellipsis: true,
      render: (singer: any) => (
        <>
          {singer.map((item: { id: number; name: string }) => {
            return (
              <span style={{ marginRight: '5px' }} key={item.id}>
                {item.name}
              </span>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <>
          <span style={{ marginRight: '20px' }}>播放</span>
          <span>下一首</span>
          <span style={{ margin: '0 20px' }}>收藏</span>
          <span>添加到歌单</span>
        </>
      ),
    },
  ];
  const playThis = (data: any) => {
    const index = dataSource.findIndex((item: any) => {
      return item.id == data.id;
    });
    props.dispatch({
      type: 'music/setPlayList',
      playList: JSON.parse(JSON.stringify(dataSource)),
    });
    // 设置随机播放列表
    const arr = shuffle(dataSource);
    if (mode == 'randow') {
      props.dispatch({
        type: 'music/setRandowList',
        randowList: JSON.parse(JSON.stringify(arr)),
      });
    } else {
      props.dispatch({
        type: 'music/setRandowList',
        randowList: JSON.parse(JSON.stringify(dataSource)),
      });
    }
    const currentIndex = arr.findIndex((item: { id: number }) => {
      return item.id == data.id;
    });
    props.dispatch({
      type: 'music/setCurrentIndex',
      currentIndex,
    });
  };
  const dataSource = props.songitemlist.map((item: songItemType) => {
    return {
      name: item.name,
      duration: formatTime(item.dt),
      id: item.id,
      singer: item.ar,
      al: item.al, // 专辑
      dt: item.dt, // 播放时长
    };
  });
  return (
    <div className={styles.songlist_item}>
      <Table
        className={styles.table_item}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showTitle: true,
          showQuickJumper: true,
        }}
        dataSource={dataSource}
        columns={columns}
        rowKey={'id'}
      />
    </div>
  );
};
export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(Index);
