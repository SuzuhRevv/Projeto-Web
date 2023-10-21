import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import config from "./slicemachine.config.json";

export const repositoryName = config.repositoryName;

export function createClient({
  previewData,
  req,
  ...config
}: prismicNext.CreateClientConfig = {}) {
  const client = prismic.createClient('myblogweb', config)

  prismicNext.enableAutoPreviews({ client, previewData, req })

  return client
}


const routes = [
  {
    type: "page",
    path: "/",
  },
  {
    type: "post",
    path: "/posts/:uid",
  },
];
