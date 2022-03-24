import React from 'react';
import { history } from 'umi';
import { Row, Col, Image } from 'antd';
import styles from './index.less';
import { singerType } from '@/tsType/index';
const index = (props: { singerlist: [] }) => {
  const toSinger = (item: singerType) => {
    history.push(`/singer/${item.id}`);
  };
  const singerlist = props.singerlist;
  return (
    <Row gutter={[30, 10]} className={styles.singerlist}>
      {singerlist.map((item: singerType) => {
        return (
          <Col
            span={4}
            key={item.id}
            onClick={() => {
              toSinger(item);
            }}
          >
            <Image src={item.picUrl} />
            <p>{item.name}</p>
          </Col>
        );
      })}
    </Row>
  );
};

export default index;
