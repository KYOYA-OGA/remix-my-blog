import React from 'react';
import { Link } from '@remix-run/react';
import { format } from 'date-fns';
import type { Content } from '~/types';
import Button from '../Button';

interface Props {
  content: Content;
}

const PostItem: React.FC<Props> = ({ content }) => {
  return (
    <li className="shadow-lg flex flex-col h-full rounded-md overflow-hidden">
      <div className="">
        {content.eyecatch ? (
          <img
            src={content.eyecatch.url}
            alt={content.title}
            className="aspect-[4/3]"
          />
        ) : (
          <img
            src="/images/under-construction.jpg"
            alt="no eyecatch"
            className="aspect-[4/3]"
          />
        )}
      </div>
      <div className="flex-grow h-full flex flex-col py-5 px-3 lg:px-5 lg:pb-8">
        <h2 className="text-lg pb-3 lg:pb-5 lg:text-2xl">
          <Link to={`/posts/${content.id}`}>{content.title}</Link>
        </h2>
        <div className="mt-auto">
          <div className="text-right text-lg">
            {format(new Date(content.createdAt), 'yyyy/MM/dd')}
          </div>
          <div className="mt-3 lg:mt-5 text-center">
            <Link to={`/posts/${content.id}`}>
              <Button color="primary">記事を読む</Button>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostItem;
