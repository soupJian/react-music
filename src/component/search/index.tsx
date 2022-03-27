import React, { useEffect, useState } from 'react';
import { connect, MusicModelState, history } from 'umi';
import { formatTime } from '@/utils/common';
import { Input, Dropdown, Spin } from 'antd';
import { singerListItemType, songItemType } from '@/api/interface';
import Confirm from '@/component/modal/index';
import '../../asset/font/iconfont.css';
import styles from './index.less';

const index = (props: any) => {
  // 热门搜索
  const [hotSearch, setHotSearch] = useState([] as []);
  //  历史搜索
  const [historySearch, setHistorySearch] = useState(
    JSON.parse(localStorage.getItem('historySearch') || '[]'),
  );
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
  // 搜索loading
  const [showload, setShowload] = useState(false);
  // 搜索结果为空
  const [empetyResult, setEmptyResult] = useState(false);
  //
  const [showConfirm, setShowConfirm] = useState(false);
  // 单曲专辑
  useEffect(() => {
    // getHotSearch();
  }, []);
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(searchValue, 1000));
    // searchValue()
  }, [value]);
  // 获取热门搜索
  // const getHotSearch = async () => {
  //   const res = await request({
  //     url: '/search/hot/detail',
  //   });
  //   setHotSearch(res.data.data);
  // };
  // 点击展示清空搜索弹窗
  const showModal = () => {
    if (historySearch.length == 0) {
      return;
    }
    setVisible(false);
    setShowConfirm(true);
  };
  const closeConfirm = () => {
    setShowConfirm(false);
  };
  // 清除历史查验数据
  const clearHistory = () => {
    setShowConfirm(false);
    setHistorySearch([]);
    localStorage.removeItem('historySearch');
  };
  // 点击列表，进行搜索
  const searchItem = (value: string) => {
    // 取消空格
    const query = value.replace(/\s+/g, '');
    setShowload(true);
    setEmptyResult(false);
    setValue(query);
  };
  // 自我输入框的值change事件
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 每次更改输入框的值之前先制空
    setResultList({
      songs: [],
      albums: [],
      artists: [],
      playlists: [],
      order: [],
    });
    setShowload(true);
    setEmptyResult(false);
    setValue(e.target.value);
  };
  // 输入框值改变进行搜索
  const searchValue = async () => {
    if (!value.trim()) {
      return;
    }
    // 发送请求的时候展示load
    // const res = await request({
    //   url: '/search/suggest?keywords=' + value,
    // });
    // setShowload(false);
    // if (res.data.result.order) {
    //   // 有搜索结果的时候取消加载load
    //   setResultList(res.data.result);
    // } else {
    //   // 搜索结果为空的时候战术noresult
    //   setEmptyResult(true);
    // }
  };
  // 设置搜索下拉框显示隐藏
  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  let song = {};
  // 获取歌曲封面
  const chooseSong = (item: any) => {
    // request({
    //   url: '/album?id=' + item.album.id,
    // })
    //   .then(data => {
    //     song = {
    //       name: item.name,
    //       id: item.id,
    //       singer: item.artists,
    //       dt: item.duration, // 播放时长
    //       duration: formatTime(item.duration),
    //       al: {
    //         id: data.data.album.id,
    //         picUrl: data.data.album.picUrl,
    //       },
    //     };
    //   })
    //   .then(() => {
    //     props.dispatch({
    //       type: 'music/setCurrentSong',
    //       currentSong: song,
    //     });
    //     props.dispatch({
    //       type: 'music/setPlayList',
    //       playList: JSON.parse(JSON.stringify([song])),
    //     });
    //     // 设置随机播放列表
    //     props.dispatch({
    //       type: 'music/setRandowList',
    //       randowList: JSON.parse(JSON.stringify([song])),
    //     });
    //     const index = 0;
    //     props.dispatch({
    //       type: 'music/setCurrentIndex',
    //       currentIndex: index,
    //     });
    //     handleVisibleChange(false);
    //   });
    local();
  };
  // 点击歌手进入歌手详情
  const toSinger = (item: singerListItemType) => {
    history.push(`/singer/${item.id}`);
    handleVisibleChange(false);
    local();
    setVisible(false);
  };
  // 点击歌单进入歌单详情
  const toSong = (item: songItemType) => {
    history.replace('/song/' + item.id);
    local();
    setVisible(false);
  };
  // 点击跳转专辑详情
  const toAlbum = (item: any) => {
    history.replace('/album/' + item.id);
    local();
    setVisible(false);
  };
  const local = () => {
    // 进行本地存储
    historySearch.forEach((item: string, index: number) => {
      if (item === value) {
        historySearch.splice(index, 1);
      }
    });
    historySearch.unshift(value);
    localStorage.setItem('historySearch', JSON.stringify(historySearch));
    setHistorySearch(JSON.parse(localStorage.getItem('historySearch') || ''));
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
                      onClick={showModal}
                    ></span>
                  </div>
                  <div className={styles.itemList}>
                    {historySearch.length > 0 ? (
                      historySearch.map((item: string, index: number) => {
                        return (
                          <p
                            key={index}
                            className={styles.item}
                            onClick={() => {
                              searchItem(item);
                            }}
                          >
                            <span>{item}</span>
                          </p>
                        );
                      })
                    ) : (
                      <p className={styles.noResult}>暂无历史搜索</p>
                    )}
                  </div>
                </div>
              </div>
            ) : showload ? (
              <div className={styles.result_load}>
                <Spin tip="Loading..."></Spin>
              </div>
            ) : empetyResult ? (
              <div className={styles.searchResult}>
                <p className={styles.noResult}>暂无搜素结果</p>
              </div>
            ) : (
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
                        {resultList.playlists.map((item: songItemType) => {
                          return (
                            <div
                              key={item.id}
                              className={styles.result_item}
                              onClick={() => {
                                toSong(item);
                              }}
                            >
                              <img
                                src={item.al.picUrl}
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
      <Confirm
        text="确定清空所有历史记录么???"
        showConfirm={showConfirm}
        onCloseConfirm={closeConfirm}
        onClear={clearHistory}
        cancelText="取消"
        okText="确定"
      ></Confirm>
    </div>
  );
};

export default connect(({ music }: { music: MusicModelState }) => ({
  music,
}))(index);
