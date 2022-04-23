import parse from 'html-react-parser';
import { json } from '@remix-run/node';
import type {
  LoaderFunction,
  MetaFunction,
  HeadersFunction,
} from '@remix-run/node';
import { client } from '~/lib/client.server';
import type { Content } from '~/types';
import { Link, useLoaderData } from '@remix-run/react';
import Layout from '~/components/Layout';
import Button from '~/components/Button';
import { format } from 'date-fns';
import Container from '~/components/Container';

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl =
    loaderHeaders.get('Cache-Control') ??
    'max-age-0, s-maxage-60, stale-while-revalidate-60';
  return {
    'Cache-Control': cacheControl,
  };
};

export const meta: MetaFunction = ({ data }: { data?: Content }) => {
  if (!data) {
    return {
      title: '投稿がありません | こっそり生きる',
      description: '投稿がありません',
    };
  }
  return { title: data?.title };
};

export const loader: LoaderFunction = async ({ params, request }) => {
  // 下書き
  const url = new URL(request.url);
  const draftKey = url.searchParams.get('draftKey');

  const content = await client
    .get<Content>({
      endpoint: 'blogs',
      contentId: params.postId,
      queries: { draftKey: draftKey ?? '' },
    })
    .catch(() => {
      throw new Response('Content not found', {
        status: 404,
      });
    });

  // 下書きの場合キャッシュヘッダを変更
  const headers = draftKey
    ? { 'Cache-Control': 'no-store, max-age-0' }
    : undefined;

  return json(content, { headers });
};

export default function PostId() {
  const post = useLoaderData<Content>();

  return (
    <Layout>
      <Container small>
        <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
        <div className="mt-5 lg:mt-10">
          {post.eyecatch ? (
            <img
              src={post.eyecatch.url}
              alt={post.title}
              width={900}
              height={600}
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="mt-3 bg-blue-100 text-blue-800 text-base font-medium inline-flex items-center px-4 py-2 rounded-md lg:mt-5">
          <svg
            className="w-5 h-5 mr-1 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p>{format(new Date(post.createdAt), 'yyyy/MM/dd')}</p>
        </div>
        <div className="mt-5 prose prose-stone max-w-none lg:mt-10 lg:prose-lg">
          {parse(post.content)}
        </div>
        <div className="mt-8 lg:mt-12 text-center">
          <Link to="/">
            <Button color="secondary">ホームに戻る</Button>
          </Link>
        </div>
      </Container>
    </Layout>
  );
}
