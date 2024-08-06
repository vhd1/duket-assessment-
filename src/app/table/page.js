"use client";
import Head from 'next/head';
import Table from '../../components/DataTable'; 
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'address', label: 'Address' }
];

const data = [
    { id: 1, name: "Christina Bersh", age: 45, address: "4222 River Rd, Columbus" },
    { id: 2, name: "David Harrison", age: 27, address: "2952 S Peoria Ave, Tulsa" },
    { id: 3, name: "Anne Richard", age: 31, address: "255 Dock Ln, New Tazewell" },
    { id: 4, name: "Emily Davis", age: 29, address: "314 Elm St, Springfield" },
    { id: 5, name: "John Smith", age: 38, address: "678 Oak Dr, Maplewood" },
    { id: 6, name: "Linda Johnson", age: 50, address: "1234 Pine St, Seattle" },
    { id: 7, name: "Michael Brown", age: 42, address: "4567 Maple Ave, Portland" },
    { id: 8, name: "Sarah Wilson", age: 36, address: "789 Birch Rd, Denver" },
    { id: 9, name: "James Lee", age: 33, address: "345 Cedar St, Austin" },
    { id: 10, name: "Laura Martinez", age: 28, address: "678 Willow Ln, San Antonio" },
    { id: 11, name: "Robert Garcia", age: 40, address: "123 Oakwood Dr, Miami" },
    { id: 12, name: "Jessica Anderson", age: 26, address: "2349 Elm St, Nashville" },
    { id: 13, name: "William Clark", age: 55, address: "567 Maple Ave, Boston" },
    { id: 14, name: "Nancy Hall", age: 48, address: "890 Pine St, Philadelphia" },
    { id: 15, name: "Steven Young", age: 31, address: "678 River Rd, Dallas" },
    { id: 16, name: "Elizabeth Allen", age: 37, address: "456 Cedar Dr, San Diego" },
    { id: 17, name: "Joshua King", age: 29, address: "789 Birch St, San Francisco" },
    { id: 18, name: "Olivia Wright", age: 34, address: "1234 Walnut St, Chicago" },
    { id: 19, name: "Daniel Adams", age: 41, address: "567 Oakwood Rd, Atlanta" },
    { id: 20, name: "Sophia Scott", age: 30, address: "890 Willow Dr, Phoenix" }
  ];
export default function TablePage() {
  return (
    <div className="bg-white container mx-auto p-4">
      <Head>
        <title>Table Page</title>
        <meta name="description" content="Table Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>
        <Table columns={columns} data={data} />
      </main>
    </div>
  );
}
