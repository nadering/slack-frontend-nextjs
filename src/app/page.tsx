"use client";

import { useQuery } from "react-query"
import type { GetServerSideProps } from "next";
import Main from "./main";
import Header from "./header";
import { API_URL } from "@/apis";

export default function Home() {
  return (
    <div className="vbox bg(--main-background)">
      <Header />
      <Main />
    </div>
  );
}

