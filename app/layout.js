import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata = {
  title: "Banuri Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
