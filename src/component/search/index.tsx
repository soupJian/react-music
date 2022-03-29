import React, { useEffect, useState } from 'react';
import { connect, MusicModelState, history } from 'umi';
import { formatTime } from '@/utils/common';
import { getHotSearch, getSeachResult, getAlbumImg } from '@/api/api';
import {
  hotSearchType,
  searchResultType,
  searchArtistType,
  searchAlbumType,
  searchSongType,
  userPlayListItemType,
} from '@/api/interface';
import { Input, Dropdown, Spin } from 'antd';
import { singerListItemType, songItemType } from '@/api/interface';
import Confirm from '@/component/modal/index';
import '../../asset/font/iconfont.css';
import styles from './index.less';
interface props {
  dispatch: Function;
}
const index = (props: props) => {
  // 热门搜索
  const [hotSearch, setHotSearch] = useState<hotSearchType[]>([]);
  //  历史搜索
  const [historySearch, setHistorySearch] = useState<string[]>([]);
  // 输入框内容
  const [value, setValue] = useState<string>('');
  // 输入框定时器
  const [timer, setTimer] = useState<any>(-1);
  const [visible, setVisible] = useState<boolean>(false);
  // 搜索结果列表
  const [resultList, setResultList] = useState<searchResultType | null>({});
  // 搜索loading
  const [showload, setShowload] = useState<boolean>(false);
  // 搜索结果为空
  const [empetyResult, setEmptyResult] = useState<boolean>(false);
  // 是否删除本地存储数据弹窗
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  // 单曲专辑
  useEffect(() => {
    getHot();
  }, []);
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(searchValue, 1000));
    searchValue();
  }, [value]);
  // 获取热门搜索
  const getHot = async () => {
    const res = await getHotSearch();
    setHotSearch(res);
  };
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
    setResultList(null);
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
    const res = await getSeachResult(value);
    setShowload(false);
    if (res.order) {
      // 有搜索结果的时候取消加载load
      setResultList(res);
    } else {
      // 搜索结果为空的时候战术noresult
      setEmptyResult(true);
    }
  };
  // 设置搜索下拉框显示隐藏
  const handleVisibleChange = (flag: boolean) => {
    if (flag) {
      const localHistorySearch: string | null = localStorage.getItem(
        'historySearch',
      );
      if (localHistorySearch) {
        setHistorySearch(JSON.parse(localHistorySearch));
      }
    }
    setVisible(flag);
  };
  // 获取歌曲封面
  const chooseSong = async (item: searchSongType) => {
    const picUrl = await getAlbumImg(item.album.id);
    const song: songItemType = {
      name: item.name,
      dt: item.duration,
      id: item.id,
      ar: item.artists,
      al: {
        id: item.album.id,
        picUrl: picUrl,
      },
    };
    props.dispatch({
      type: 'music/setCurrentSong',
      currentSong: song,
    });
    props.dispatch({
      type: 'music/setPlayList',
      playList: JSON.parse(JSON.stringify([song])),
    });
    // 设置随机播放列表
    props.dispatch({
      type: 'music/setRandowList',
      randowList: JSON.parse(JSON.stringify([song])),
    });
    props.dispatch({
      type: 'music/setCurrentIndex',
      currentIndex: 0,
    });
    handleVisibleChange(false);
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
  const toSong = (item: userPlayListItemType) => {
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
  // 进行本地存储
  const local = () => {
    for (let i = 0; i < historySearch.length; i++) {
      const item = historySearch[i];
      if (item === value) {
        historySearch.splice(i, 1);
        return;
      }
    }
    historySearch.unshift(value);
    localStorage.setItem('historySearch', JSON.stringify(historySearch));
    setHistorySearch(JSON.parse(localStorage.getItem('historySearch') || ''));
  };
  return (
    <div className={styles.search}>
      <Dropdown
        arrow={true}
        onVisibleChange={handleVisibleChange}
        visible={visible}
        // visible={true}
        overlay={
          <>
            {value == '' ? (
              <div className={styles.search_container}>
                <div className={styles.hot_search}>
                  <div className={styles.search_title}>热门搜索</div>
                  <div className={styles.itemList}>
                    {hotSearch.map((item: hotSearchType, index: number) => {
                      return (
                        <div
                          key={index}
                          className={styles.item}
                          onClick={() => {
                            searchItem(item.searchWord);
                          }}
                        >
                          <div className={styles.left}>
                            {item.iconUrl ? (
                              <img src={item.iconUrl} alt="" />
                            ) : null}
                            <span>{item.searchWord}</span>
                          </div>
                          <span>{item.score}</span>
                        </div>
                      );
                    })}
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
                  {resultList && resultList.artists ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>歌手</div>
                      <div className={styles.result_container}>
                        {resultList &&
                          resultList.artists.map((item: searchArtistType) => {
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
                                <span>{item.name}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : null}
                  {resultList && resultList.songs ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>单曲</div>
                      <div className={styles.result_container}>
                        {resultList.songs.map((item: searchSongType) => {
                          return (
                            <div
                              key={item.id}
                              className={styles.result_item}
                              onClick={() => {
                                chooseSong(item);
                              }}
                            >
                              <div className={styles.left}>{item.name}</div>
                              <div className={styles.right}>
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {resultList && resultList.playlists ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>歌单</div>
                      <div className={styles.result_container}>
                        {resultList &&
                          resultList.playlists.map(
                            (item: userPlayListItemType) => {
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
                            },
                          )}
                      </div>
                    </div>
                  ) : null}
                  {resultList && resultList.albums ? (
                    <div className={styles.result_wrap}>
                      <div className={styles.result_title}>专辑</div>
                      <div className={styles.result_container}>
                        {resultList &&
                          resultList.albums.map((item: searchAlbumType) => {
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
                          })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </>
        }
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
