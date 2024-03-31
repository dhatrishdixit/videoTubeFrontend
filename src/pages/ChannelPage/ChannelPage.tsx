import React from 'react';
import { useParams } from 'react-router-dom';

function ChannelPage() {
  const { channelId } = useParams();
  return (
    <div>ChannelId : {channelId}</div>
  )
}

export default ChannelPage