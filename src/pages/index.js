'use client'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Cartesian3 } from "cesium";

const Cesium = dynamic(
  () => import('../app/components/Cesium'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <Cesium />
    </>
  )
}