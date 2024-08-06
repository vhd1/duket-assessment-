import Table from '../components/datatable/DataTable'; // Ensure this path is correct

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'address', label: 'Address' }
];

const data = [
  { id: 1, name: "Christina Bersh", age: 45, address: "4222 River Rd, Columbus" },
  // ... other data
];

export default function TablePage() {
  return (
    <div className="bg-white container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      <Table columns={columns} data={data} />
    </div>
  );
}
