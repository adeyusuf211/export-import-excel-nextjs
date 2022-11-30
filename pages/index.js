import MainProgram from "../components/mainprogram";
import Head from "next/head";

export default function Home({data}) {
  // Komponen Utama
  return (
    <>
      <Head>
        <title>Eksport Import Excel Next JS</title>
        <meta name="description" content="Latihan menggunakan NextJS untuk eksport dan import data dengan Excel" />
      </Head>
      <MainProgram data={data} />
    </>
  );
}

// Fungsi untuk mengambil data dari api
export async function getStaticProps() {
  const api = await fetch("https://dummyjson.com/products?limit=100");
  const data = await api.json()
  return { props: { data } }
}
