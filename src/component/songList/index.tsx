import React from 'react';
import { history } from 'umi';
import { Row, Col, Image } from 'antd';
import '../../asset/font/iconfont.css';
import styles from './index.less';
import { playListype } from '@/services/song/type';
interface props {
  songList: playListype[];
}

const Index = (props: props) => {
  const songList = props.songList;
  const toDetail = (item: playListype) => {
    history.push('/song/' + item.id);
  };
  return (
    <Row gutter={[30, 10]} className={styles.songListWrap}>
      {songList.map((item: playListype) => {
        return (
          <Col
            span={4}
            key={item.id}
            onClick={() => {
              toDetail(item);
            }}
          >
            <Image src={item.picUrl} />
            <div className={styles.shade}>
              <span className="iconfont icon-MusicAcc"></span>
              {item.playCount}
            </div>
            <p className={styles.name}>{item.name}</p>
          </Col>
        );
      })}
    </Row>
  );
};

export default Index;
