import type { HeadersFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Layout from '~/components/Layout';
import { client } from '~/lib/client.server';
import type { Content } from '~/types';
import PostGrid from '~/components/posts/PostGrid';
import Container from '~/components/Container';

// stale-while-revalidateの設定
export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'max-age=0, s-maxage=60, stale-while-revalidate=60',
  };
};

export const loader: LoaderFunction = async () => {
  // microcms-js-sdkを使って一覧を取得
  const { contents } = await client.getList<Content[]>({
    endpoint: 'blogs',
  });
  return contents;
};

export default function Index() {
  const contents = useLoaderData<Content[]>();

  return (
    <Layout>
      <Container>
        <PostGrid contents={contents} />
      </Container>
    </Layout>
  );
}
