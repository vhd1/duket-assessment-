"use client";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-4xl bg-black shadow-lg rounded-lg p-6">
        <div className="relative shadow-slate-700 bg-black text-white py-8 px-6 rounded-lg shadow-xl">
          <h1 className="text-3xl font-extrabold relative z-10">Duket Assessment</h1>
        </div>

        <nav className="mt-8 space-y-4">
        <Link
            href="/timeline"
            className="block bg-gradient-to-r from-black via-gray-800 to-gray-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Timeline
          </Link>
          <Link
            href="/datepicker"
            className="block bg-gradient-to-r from-black via-gray-800 to-gray-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Datepicker
          </Link>
          <Link
            href="/table"
            className="block bg-gradient-to-r from-black via-gray-800 to-gray-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            DataTable
          </Link>
          
          
        </nav>
      </main>
    </div>
  );
}
