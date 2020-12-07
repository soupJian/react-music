import React, { useState, useEffect } from 'react';
import {propsType,playlistType} from '@/tsType/index'
import { requestCookie } from '@/api/index';
import SongDetail from '@/common/detail/index'

const index = (props:propsType) => {
  const id = props.match.params.id
  const [songdetail, setSongdetail] = useState<playlistType>({
    name: '',
    coverImgUrl: '',
    description: '',
    tracks: [],
  });
  useEffect(() => {
    getsongDetail()
  }, [id]);
  const getsongDetail = async() => {
    const result =  await requestCookie({
        url: '/playlist/detail',
        data: `id=${id}`
    })
    setSongdetail(result.data.playlist);
  }
  return (
    <div>
      <SongDetail detailObj={songdetail}></SongDetail>
    </div>
  );
};

export default index;
