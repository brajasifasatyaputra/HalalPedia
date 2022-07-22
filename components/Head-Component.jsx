import Head from 'next/head';

export default function HeadComponent({title, description}){
  return(
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/logo2.webp"/>
    </Head>
  )
}