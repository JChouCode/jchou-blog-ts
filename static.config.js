import request from "graphql-request"
import path from 'path'

const GRAPHCMS_endpoint = "https://api-uswest.graphcms.com/v1/cjyt00rv801nc01e3fhxy6izr/master";

const query =
  `{
  posts{
    id
    title
    image {
      handle
    }
    content
  }
}`;

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const {
      posts
    } = await request(GRAPHCMS_endpoint, query);
    return [{
      path: '/',
      getData: () => ({
        posts,
      }),
      children: posts.map((post) => ({
        path: `/post/${post.id}`,
        template: 'src/pages/post',
        getData: () => ({
          post,
        }),
      })),
    }, ]
  },
  plugins: [
    'react-static-plugin-typescript',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}