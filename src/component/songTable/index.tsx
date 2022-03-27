import React from 'react';
import { Table } from 'antd';
import { connect, MusicModelState } from 'umi';
import { formatTime, shuffle } from '../common_ts/index';
import { singerDetailType, songItemType, singerArray } from '@/api/interface';
import styles from './index.less';
interface props {
  songArray: songItemType[];
  music: MusicModelState;
  dispatch: Function;
}
const Index = (props: props) => {
  const dataSource: songItemType[] = props.songArray;
  const mode = props.music.mode;
  const columns: any = [
    {
      title: '歌名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (name: string, data: songItemType) => (
        <p
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          onClick={() => {
            // 点击播放
            // playThis(data);
          }}
        >
          {name}
        </p>
      ),
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      width: 60,
      align: 'center',
      render: (dt: number) => {
        return formatTime(dt);
      },
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'qr',
      align: 'center',
      ellipsis: true,
      render: (ar: singerArray[]) => (
        <>
          {ar.map((item: singerArray) => {
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
      align: 'center',
      render: () => (
        <>
          <span>下一首</span>
          <span style={{ margin: '0 10px' }}>添加到歌单</span>
          <span>下载</span>
        </>
      ),
    },
  ];
  const playThis = (data: songItemType) => {
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
  return (
    <div className={styles.songlist_item}>
      <Table
        pagination={false}
        className={styles.table_item}
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
