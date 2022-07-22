import Document, { Html, Head, Main, NextScript } from 'next/document'
import loadable from '@loadable/component'
const GoogleAnalytics = loadable(()=>import("../components/GoogleAnalytics-Component"))
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name='application-name' content='SC Property' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='SC Property' />
          <meta name='description' content='Investasi Murah dan Mudah? SC Property saja!!' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />        
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta property="og:title" content="SC Property" />
          <meta property="og:description" content="Investasi Murah dan Mudah? SC Property saja!!" />
          <meta property="og:image" content="/logo2.webp" />
          <meta name='theme-color' content='#000000' />
          <link rel="manifest" href="/manifest.json"/>
          <link rel="apple-touch-icon" href="/logo2.webp"/>
          <meta name="theme-color" content="#fff"></meta>                     
        </Head>
        <body>
          <GoogleAnalytics/>
          <Main />
          <NextScript />          
        </body>
      </Html>
    )
  }
}

export default MyDocument
