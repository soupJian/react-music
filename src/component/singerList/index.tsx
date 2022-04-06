import React from 'react';
import { history } from 'umi';
import { Row, Col } from 'antd';
import styles from './index.less';
import { singerListType } from '@/services/singer/type';

interface props {
  singerlist: singerListType[];
}
const index = (props: props) => {
  const toSinger = (item: singerListType) => {
    history.push(`/singer/${item.id}`);
  };
  const singerlist = props.singerlist;
  return (
    <Row gutter={[30, 10]} className={styles.singerlist}>
      {singerlist.map((item: singerListType) => {
        return (
          <Col
            span={6}
            key={item.id}
            onClick={() => {
              toSinger(item);
            }}
          >
            <img src={item.picUrl} />
            <p>{item.name}</p>
          </Col>
        );
      })}
    </Row>
  );
};

export default index;
