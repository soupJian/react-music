import React from 'react';
import { history } from 'umi';
import { Row, Col, Image } from 'antd';
import { mvType } from '@/services/mv/type';
import styles from './index.less';
interface props {
  list: mvType[];
}
const inex = (props: props) => {
  const list = props.list;
  const toDetail = (id: number) => {
    history.push(`/mv/${id}`);
  };
  return (
    <Row gutter={[20, 20]} className={styles.mvListWrap}>
      {list.map((item: mvType) => {
        return (
          <Col
            span={8}
            key={item.id}
            onClick={() => {
              toDetail(item.id);
            }}
          >
            <Image src={item.cover} />
            <div className={styles.shade}>
              <span
                className="iconfont icon-play"
                style={{ marginRight: '5px' }}
              ></span>
              {item.playCount}
            </div>
            <p className={styles.name}>{item.name}</p>
          </Col>
        );
      })}
    </Row>
  );
};

export default inex;
