// Libs
import { cookies } from "next/headers";
import type { Metadata } from "next";
import Head from "next/head";

// Context
import { ThemeProvider } from "@/context/theme";

// Constants
import { METADATA_IMAGE, STORAGES } from "@/constants";

// Fonts
import { Inter } from "next/font/google";

// Styles
import "@/styles/global.css";

// Themes
import { color } from "@/themes";

// Helpers
import { getTheme } from "@/helpers";

export const metadata: Metadata = {
  metadataBase: new URL("https://tremor-dashboard-gamma.vercel.app"),
  title: "Tremor Dashboard - System manage budgets, products and users",
  description:
    "Tremor Dashboard is one dashboard to manage budgets, products and users of one organization.",
  openGraph: {
    title: "Tremor Dashboard - System manage budgets, products and users",
    description:
      "Tremor Dashboard is one dashboard to manage budgets, products and systems of one organization",
    url: "https://tremor-dashboard-gamma.vercel.app/",
    siteName: "https://tremor-dashboard-gamma.vercel.app/",
    images: [
      {
        url: METADATA_IMAGE.HOME_PREVIEW,
        width: 1200,
        height: 628,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const generateViewport = () => {
  const cookieStore = cookies();
  const theme = cookieStore
    .getAll()
    .find(cookie => cookie.name === STORAGES.IS_DARK_THEME);
  return {
    width: "device-width",
    initialScale: 1,
    themeColor:
      theme && JSON.parse(theme.value) ? color["primary"] : color["seldom"],
  };
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/assets/images/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: getTheme }} defer></script>
      </Head>
      <body className={`${inter.className} dark:bg-dark-primary`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
