"use client";
import Head from 'next/head';
import Datepicker from '../../components/datepicker/DatePicker'; 

export default function DatepickerPage() {
  return (
    <div className="bg-white container mx-auto p-4">
      <Head>
        <title>Datepicker Page</title>
        <meta name="description" content="Datepicker Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">Datepicker</h1>
        <Datepicker />
      </main>
    </div>
  );
}
