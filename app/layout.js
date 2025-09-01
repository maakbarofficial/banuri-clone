import "./globals.css";

export const metadata = {
  title: "Banuri Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/jameel-noori@1.1.2/jameel-noori.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
