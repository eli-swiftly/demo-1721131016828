import React, { useState } from 'react';
import { AppConfig, TabConfig, ChartConfig } from './config';
import { Home, Search, Mail, Phone, MapPin, Clock } from 'lucide-react';

type CustomComponentProps = {
  config: AppConfig;
};

interface CustomComponents {
  [key: string]: React.FC<CustomComponentProps>;
}

interface CustomData {
  [key: string]: any;
}

// =============== CUSTOM COMPONENTS ===============
const SearchComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [postcode, setPostcode] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setSearchResults([
        { name: 'Maison Serviced Apartments', distance: '0.5 miles', available: true },
        { name: 'Crystal Property Shortlets', distance: '1.2 miles', available: false },
        { name: 'London Aspect Apartments', distance: '2.1 miles', available: true },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Property Search</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter postcode"
          className="flex-grow p-2 border rounded-l"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {searchResults.length > 0 && (
        <ul className="divide-y">
          {searchResults.map((result, index) => (
            <li key={index} className="py-2">
              <h3 className="font-semibold">{result.name}</h3>
              <p className="text-sm text-gray-600">Distance: {result.distance}</p>
              <p className={`text-sm ${result.available ? 'text-green-500' : 'text-red-500'}`}>
                {result.available ? 'Available' : 'Not available'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EmailTemplateComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [template, setTemplate] = useState('');

  const handleGenerateTemplate = () => {
    const generatedTemplate = `Dear [Supplier],

We are looking for a fully furnished apartment on behalf of our client with the following requirements:

- Location: [Postcode]
- Dates: [Start Date] to [End Date]
- Number of people: [Number]
- Pets: [Yes/No]
- Bedrooms required: [Number]
- Special requirements: [List any special requirements]

If you have availability, please share the following information with us within the next 2 hours:

1. Property address
2. Number of bedrooms and bathrooms
3. Floor level (if applicable)
4. Parking availability
5. Pet policy
6. Pricing for the requested dates
7. High-quality images or video of the property

Thank you for your prompt attention to this matter.

Best regards,
[Your Name]
Bonjour Investments`;

    setTemplate(generatedTemplate);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Email Template Generator</h2>
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={handleGenerateTemplate}
      >
        Generate Template
      </button>
      {template && (
        <textarea
          className="w-full h-64 p-2 border rounded"
          value={template}
          readOnly
        />
      )}
    </div>
  );
};

const SupplierDatabaseComponent: React.FC<CustomComponentProps> = ({ config }) => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Maison Serviced Apartments', location: 'London', contact: 'info@maison.com' },
    { id: 2, name: 'Crystal Property Shortlets', location: 'Manchester', contact: 'bookings@crystal.com' },
    { id: 3, name: 'London Aspect Apartments', location: 'London', contact: 'reservations@londonaspect.com' },
  ]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Supplier Database</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Location</th>
            <th className="text-left">Contact</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.location}</td>
              <td>{supplier.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// =============== CONFIGURATION ===============
const customConfig: AppConfig = {
  title: "Bonjour Investments - Property Management",
  companyName: "Bonjour Investments",
  logo: "/path/to/bonjour-logo.png",
  primaryColor: "#3B82F6",
  secondaryColor: "#93C5FD",
  userName: "Fan Zhang",
  dashboard: {
    tabs: [
      {
        id: "search",
        label: "Property Search",
        description: "Find suitable properties",
        icon: Search
      },
      {
        id: "emailTemplate",
        label: "Email Template",
        description: "Generate supplier emails",
        icon: Mail
      },
      {
        id: "supplierDatabase",
        label: "Supplier Database",
        description: "Manage supplier information",
        icon: Home
      },
    ] as TabConfig[],
    charts: {
      supplierResponseTime: {
        type: "bar",
        dataKeys: ["avgResponseTime"],
        colors: ["#3B82F6"],
        data: [
          { supplier: 'Maison', avgResponseTime: 1.5 },
          { supplier: 'Crystal', avgResponseTime: 2.1 },
          { supplier: 'London Aspect', avgResponseTime: 1.8 },
        ]
      },
      bookingsByLocation: {
        type: "pie",
        dataKeys: ["value"],
        colors: ["#3B82F6", "#93C5FD", "#BFDBFE"],
        data: [
          { name: 'London', value: 60 },
          { name: 'Manchester', value: 25 },
          { name: 'Birmingham', value: 15 },
        ]
      },
    }
  },
  analytics: {
    charts: {
      monthlyBookings: {
        type: "line",
        dataKeys: ["bookings"],
        colors: ["#3B82F6"],
        data: [
          { month: 'Jan', bookings: 45 },
          { month: 'Feb', bookings: 52 },
          { month: 'Mar', bookings: 61 },
          { month: 'Apr', bookings: 58 },
        ]
      },
      averageStayDuration: {
        type: "bar",
        dataKeys: ["avgDays"],
        colors: ["#93C5FD"],
        data: [
          { year: '2021', avgDays: 14 },
          { year: '2022', avgDays: 16 },
          { year: '2023', avgDays: 18 },
        ]
      },
    }
  },
  clients: [
    { id: "amazon", name: "Amazon", industry: "E-commerce" },
    { id: "insuranceco", name: "InsuranceCo", industry: "Insurance" },
  ],
  features: {
    propertySearch: true,
    emailTemplates: true,
    supplierDatabase: true,
    booking: true,
    reporting: true
  }
};

// =============== CUSTOM COMPONENTS MAPPING ===============
const customComponents: CustomComponents = {
  search: SearchComponent,
  emailTemplate: EmailTemplateComponent,
  supplierDatabase: SupplierDatabaseComponent,
};

// =============== CUSTOM DATA ===============
const customData: CustomData = {
  propertyTypes: ['Apartment', 'House', 'Studio'],
  amenities: ['Parking', 'Pet-friendly', 'Elevator', 'Ground floor'],
  clientTypes: ['Corporate', 'Insurance']
};

// =============== EXPORT ===============
export const customization = {
  config: customConfig,
  components: customComponents,
  data: customData,
};