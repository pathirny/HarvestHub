import Head from 'next/head'

export function HeadMetaTags({ metadata }) {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  )
}