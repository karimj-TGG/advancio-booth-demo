import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Choose Your Bottleneck | Advancio",
  description: "A self-guided ITC experience from Advancio. Choose an insurance workflow bottleneck and see the future on the other side.",
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
};

// Zoho PageSense (analytics/heatmaps). Skipped on local dev so `pnpm dev` traffic never
// reaches the account. Production (/booth) and test (/booth_test) both load it and are
// told apart in the PageSense dashboard by page URL/path — see docs/MARKETING_PLATFORM.md.
const pageSenseSnippet = `if (!/^(localhost|127\\.0\\.0\\.1)$/.test(window.location.hostname)) {
!function(){var e="1.0",t=document,a=window,n="zps-page-screen",r=t.head||t.getElementsByTagName("head")[0],i=t.getElementById("pagesenseCode");if(!t.getElementById(n)){var o=t.createElement("style");o.type="text/css",o.id=n;var s="body { background: transparent !important; opacity: 0 !important; visibility: hidden !important; } html { opacity: 0 !important; visibility: hidden !important; }";o.styleSheet?o.styleSheet.cssText=s:o.appendChild(t.createTextNode(s)),r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),a._ps_conf={};var c={addScript:function(e){try{var n=t.createElement("script");if(n.type="text/javascript",n.async=!0,e.src?n.src=e.src:e.text&&(void 0!==n.text?n.text=e.text:n.appendChild(t.createTextNode(e.text))),i&&i.getAttribute){var o=i.getAttribute("nonce");o&&n.setAttribute("nonce",o)}n.onload=n.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(n.onload=n.onreadystatechange=null,a._ps_conf&&a._ps_conf.pauseRenderForManualActivation?clearTimeout(d):c.revealPage())},n.onerror=function(){c.revealPage()},r.appendChild(n)}catch(e){throw c.revealPage(),e}},revealPage:function(){var e=t.getElementById(n);e&&e.parentNode&&e.parentNode.removeChild(e)}},d=setTimeout((function(){c.revealPage()}),1e4),p=c.revealPage;c.revealPage=function(){clearTimeout(d),p()};try{a._ps_conf&&a._ps_conf.pauseRenderForManualActivation&&(a.pagesense=a.pagesense||[],a.pagesense.push=function(e){e&&"activate"==e[0]&&c&&c.revealPage()}),a._ps_conf?a._ps_conf.version=e:a._ps_conf={version:e},c.addScript({src:"https://cdn.pagesense.io/js/advancio/9b36b1f8c1164b779d29175ce0f91755.js"})}catch(e){c.revealPage()}}}();
}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Script id="pagesenseCode" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: pageSenseSnippet }} />
        {children}
      </body>
    </html>
  );
}

