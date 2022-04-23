import React from 'react';
import type { Content } from '~/types';
import PostItem from './PostItem';

interface Props {
  contents: Content[];
}

const PostGrid: React.FC<Props> = ({ contents }) => {
  return (
    <ul className="grid grid-cols-2 xl:grid-cols-3 gap-y-8 md:gap-x-8 lg:gap-10">
      {contents.map((content) => (
        <PostItem key={content.id} content={content} />
      ))}
    </ul>
  );
};

export default PostGrid;
