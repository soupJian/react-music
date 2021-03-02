import React, { useEffect, useState } from 'react';
import { connect, MusicModelState, history } from 'umi';
import { formatTime } from '../../common/common_ts';
import { Input, Dropdown, Spin } from 'antd';
import { request } from '../../api/index';
import { singerType, SongListItem } from '@/tsType/index';
import '../../asset/font/iconfont.css';
import styles from './index.less';

const index = (props: any) => {
  // 热门搜索
  const [hotSearch, setHotSearch] = useState([] as []);
  //  历史搜索
  const [historySearch, setHistorySearch] = useState([] as []);
  // 输入框内容
  const [value, setValue] = useState('');
  // 输入框定时器
  const [timer, setTimer] = useState<any>(-1);
  const [visible, setVisible] = useState<boolean>(false);
  // 搜索结果列表
  const [resultList, setResultList] = useState({
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
    order: [],
  });
  // 单曲专辑
  useEffect(() => {
    getHotSearch();
  }, []);
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(searchValue, 1000));
    // searchValue()
  }, [value]);
  // 获取热门搜索
  const getHotSearch = async () => {
    const res = await request({
      url: '/search/hot/detail',
    });
    setHotSearch(res.data.data);
  };
  // 清除历史查验数据
  const clearHistory = () => {};
  // 点击列表，进行搜索
  const searchItem = (value: string) => {
    setValue(value);
  };
  // 自我输入框的值改变
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 每次更改输入框的值之前先制空
    setResultList({
      songs: [],
      albums: [],
      artists: [],
      playlists: [],
      order: [],
    });
    setValue(e.target.value);
  };
  // 输入框值改变进行搜索
  const searchValue = async () => {
    if (!value.trim()) {
      return;
    }
    const res = await request({
      url: '/search/suggest?keywords=' + value,
    });
    setResultList(res.data.result);
  };
  // 设置搜索下拉框显示隐藏
  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  let song = {};
  // 获取歌曲封面
  const chooseSong = (item: any) => {
    request({
      url: '/album?id=' + item.album.id,
    })
      .then(data => {
        song = {
          name: item.name,
          id: item.id,
          singer: item.artists,
          dt: item.duration, // 播放时长
          duration: formatTime(item.duration),
          al: {
            id: data.data.album.id,
            picUrl: data.data.album.picUrl,
          },
        };
      })
      .then(() => {
        props.dispatch({
          type: 'music/setPlayList',
          payload: { playList: JSON.parse(JSON.stringify([song])) },
        });
        // 设置随机播放列表
        props.dispatch({
          type: 'music/setRandowList',
          payload: { randowList: JSON.parse(JSON.stringify([song])) },
        });
        const index = 0;
        props.dispatch({
          type: 'music/setCurrentIndex',
          payload: { currentIndex: index },
        });
        handleVisibleChange(false);
      });
  };
  // 点击歌手进入歌手详情
  const toSinger = (item: singerType) => {
    history.push(`/singer/${item.id}`);
    handleVisibleChange(false);
  };
  // 点击歌单进入歌单详情
  const toSong = (item: SongListItem) => {
    history.replace('/song/' + item.id);
  };
  const toAlbum = (item: any) => {
    history.replace('/album/' + item.id);
  };
  return (
    <div className={styles.search}>
      <Dropdown
        overlay={
          <>
            {value == '' ? (
              <div className={styles.search_container}>
                <div className={styles.hot_search}>
                  <div className={styles.search_title}>热门搜索</div>
                  <div className={styles.itemList}>
                    {hotSearch.map(
                      (
                        item: { searchWord: string; score: number },
                        index: number,
                      ) => {
                        return (
                          <p
                            key={index}
                            className={styles.item}
                            onClick={() => {
                              searchItem(item.searchWord);
                            }}
                          >
                            <span>{item.searchWord}</span>
                            <span>{item.score}</span>
                          </p>
                        );
                      },
                    )}
                  </div>
                </div>
                <div className={styles.history_search}>
                  <div className={styles.search_title}>
                    <span>历史搜索</span>
                    <span
                      className="iconfont icon-delete"
                      onClick={clearHistory}
                    ></span>
                  </div>
                </div>
              </div>
            ) : resultList.songs.length > 0 ? (
              <div className={styles.searchResult}>
                <div className={styles.search_title}>
                  <span className={styles.searchMore}>更多搜索</span>
                  <span>{value}</span>
                </div>
                <div className={styles.result}>
                  {resultList.artists ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>歌手</div>
                      <div className={styles.result_container}>
                        {resultList.artists.map(
                          (item: {
                            id: number;
                            picUrl: string;
                            name: string;
                          }) => {
                            return (
                              <div
                                key={item.id}
                                className={styles.result_item}
                                onClick={() => {
                                  toSinger(item);
                                }}
                              >
                                <img
                                  src={item.picUrl}
                                  className={styles.resultImg}
                                />
                                {item.name}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {resultList.songs ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>单曲</div>
                      <div className={styles.result_container}>
                        {resultList.songs.map(
                          (item: {
                            id: number;
                            name: string;
                            artists: any;
                          }) => {
                            return (
                              <div
                                key={item.id}
                                className={styles.result_item}
                                onClick={() => {
                                  chooseSong(item);
                                }}
                              >
                                {item.name} --
                                {item.artists.map(
                                  (item: { name: string; id: number }) => {
                                    return (
                                      <span
                                        key={item.id}
                                        className={styles.result_singer}
                                      >
                                        {item.name}
                                      </span>
                                    );
                                  },
                                )}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {resultList.playlists ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>歌单</div>
                      <div className={styles.result_container}>
                        {resultList.playlists.map((item: SongListItem) => {
                          return (
                            <div
                              key={item.id}
                              className={styles.result_item}
                              onClick={() => {
                                toSong(item);
                              }}
                            >
                              <img
                                src={item.coverImgUrl}
                                className={styles.resultImg}
                              />
                              {item.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {resultList.albums ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>专辑</div>
                      <div className={styles.result_container}>
                        {resultList.albums.map(
                          (item: {
                            id: number;
                            name: string;
                            artist: { picUrl: string };
                          }) => {
                            return (
                              <div
                                key={item.id}
                                className={styles.result_item}
                                onClick={() => {
                                  toAlbum(item);
                                }}
                              >
                                <img
                                  src={item.artist.picUrl}
                                  className={styles.resultImg}
                                />
                                {item.name}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.result_load}>
                <Spin tip="Loading..."></Spin>
              </div>
            )}
          </>
        }
        onVisibleChange={handleVisibleChange}
        visible={visible}
        // visible={true}
      >
        <Input
          onClick={e => e.preventDefault()}
          placeholder="搜一下"
          prefix={<span className="iconfont icon-search"></span>}
          className={styles.searh_input}
          allowClear
          value={value}
          onChange={e => {
            inputChange(e);
          }}
        />
      </Dropdown>
    </div>
  );
};

export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(index);
