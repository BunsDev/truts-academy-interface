import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return <>
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${`G-MD3Z8PGBZV`}`} />

    <Script id='script' strategy="lazyOnload">
      {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-MD3Z8PGBZV', {
      page_path: window.location.pathname,
      });
`}
    </Script>
    <NextNProgress color="#2e68f5" />
    <Component {...pageProps} />
  </>
}


export default MyApp
