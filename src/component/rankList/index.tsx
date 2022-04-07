import React from 'react';
import { Row, Col } from 'antd';
import { history } from 'umi';
import { track, rankListType } from '@/services/song/type';
import styles from './index.less';
interface props {
  ranklist: rankListType[];
}
const index = (props: props) => {
  const rankList = props.ranklist;
  const toDetail = (item: rankListType) => {
    history.push('/song/' + item.id);
  };
  return (
    <Row gutter={[30, 20]} className={styles.ranklist}>
      {rankList.map((item: rankListType) => {
        return (
          <Col span={6} key={item.id}>
            <div
              className={styles.rankItem}
              style={{
                background: `url(${item.coverImgUrl}) no-repeat`,
                backgroundPosition: '25% 50%',
                backgroundSize: '100%',
              }}
              onClick={() => toDetail(item)}
            >
              <p>{item.updateFrequency}</p>
            </div>
            {item.tracks.length > 0 && (
              <div className={styles.trackWrap}>
                {item.tracks.map((item: track, index: number) => {
                  return (
                    <p key={item.first + item.second}>
                      <span className={styles.left}>
                        <span style={{ marginRight: '5px' }}>{index + 1}</span>
                        {item.first}
                      </span>
                      <span className={styles.right}>{item.second}</span>
                    </p>
                  );
                })}
              </div>
            )}
          </Col>
        );
      })}
    </Row>
  );
};

export default index;
