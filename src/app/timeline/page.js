"use client";
import Head from 'next/head';
import Timeline from '../../components/timeline/Timeline'
export default function TimelinePage() {
  return (
    <div className="bg-white container mx-auto p-4">
      <Head>
        <title>Timeline</title>
        <meta name="description" content="Timeline Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">Timeline</h1>
        <Timeline />
      </main>
    </div>
  );
}
