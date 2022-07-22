import Script from 'next/script'

const YOUR_TRACKING_ID = "G-Y9ZZRPT6FL"

export default function GoogleAnalytics(){
  return(
    <>  
      {(process.env.NODE_ENV === "production" && process.browser) ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${YOUR_TRACKING_ID}`}></Script>
          <Script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());          
            gtag('config', ${YOUR_TRACKING_ID});`
          }}></Script>        
        </>
      ):null}  
    </>
  )
}