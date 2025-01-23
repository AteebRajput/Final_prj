import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Gavel, ArrowUpDown, Clock } from 'lucide-react';

const AllBids = () => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Sample bids data
  const bids = [
    {
      id: 'BID001',
      product: 'Organic Wheat',
      farmer: 'John Smith Farm',
      quantity: '500kg',
      yourBid: '$40/kg',
      currentHighest: '$42/kg',
      timeLeft: '2h 30m',
      status: 'Active'
    },
    {
      id: 'BID002',
      product: 'Fresh Corn',
      farmer: 'Green Acres',
      quantity: '200kg',
      yourBid: '$35/kg',
      currentHighest: '$35/kg',
      timeLeft: '1h 15m',
      status: 'Winning'
    },
    {
      id: 'BID003',
      product: 'Soybeans',
      farmer: 'River Valley Farms',
      quantity: '300kg',
      yourBid: '$38/kg',
      currentHighest: '$45/kg',
      timeLeft: 'Ended',
      status: 'Lost'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-blue-100 text-blue-800',
      'Winning': 'bg-green-100 text-green-800',
      'Lost': 'bg-red-100 text-red-800',
      'Won': 'bg-purple-100 text-purple-800'
    };

    return (
      <Badge className={styles[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gavel className="w-6 h-6" />
            <span>All Bids</span>
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Input placeholder="Search bids..." className="max-w-sm" />
            <div className="flex gap-2">
              <Button variant="outline">Active Bids</Button>
              <Button variant="outline">Past Bids</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  Bid ID 
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Your Bid</TableHead>
                <TableHead>Current Highest</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Time Left
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell className="font-medium">{bid.id}</TableCell>
                  <TableCell>{bid.product}</TableCell>
                  <TableCell>{bid.farmer}</TableCell>
                  <TableCell>{bid.quantity}</TableCell>
                  <TableCell>{bid.yourBid}</TableCell>
                  <TableCell>{bid.currentHighest}</TableCell>
                  <TableCell>{bid.timeLeft}</TableCell>
                  <TableCell>{getStatusBadge(bid.status)}</TableCell>
                  <TableCell>
                    {bid.status === 'Active' && (
                      <Button size="sm">Update Bid</Button>
                    )}
                    {bid.status === 'Won' && (
                      <Button size="sm" variant="outline">View Details</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllBids;