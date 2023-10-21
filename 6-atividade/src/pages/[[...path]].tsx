import Head from 'next/head'
import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { createClient } from '../prismicio'
import { PrismicText, SliceZone } from '@prismicio/react'
import { components } from '@/slices'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Page({ page }: PageProps) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='underline'>
          <div className='slices'>
            <SliceZone slices={page?.data?.slices} components={components}></SliceZone>
          </div>
        </div>
        </main>
        </>
        )
}


export async function getStaticProps({
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData })
  

  const page = await client.getByUID('page', 'home') 
  const pages = await client.getAllByType('page', {
    orderings: {
      field: 'document.uid',
      direction: 'desc',
    },})


  return {
    props: {
      page,
      pages,
    },
  }
}

export async function getStaticPaths() {
  const client = createClient()

  const pages = await client.getAllByType('page')

  return {
    paths: pages.map((page: any) => ({
      params: {
        path: page.uid ? [] : [page.uid]
      },
    })),
    fallback: true,
  }
}