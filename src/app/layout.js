"use client";
import "./globals.css";
import "./aos.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import store from "./Store";
import { ToastContainer } from "react-toastify";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Provider store={store}>
        <head>
          <link
            rel="icon"
            href="/favicon.ico"
            type="image/x-icon"
            sizes="any"
          />
          <title>Cripto</title>
          <meta
            name="title"
            content="Cripto"
          />
        </head>
        <body className={inter.className}>
          <div className="main-div">
            <Header />
            <ToastContainer />
            {children}
            <Footer />
          </div>
        </body>
      </Provider>
    </html>
  );
}
