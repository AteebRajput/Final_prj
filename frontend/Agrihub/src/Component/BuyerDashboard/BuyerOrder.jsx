import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../slices/orderSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";

const BuyerOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders); // Use Redux state for orders
  const [localOrders, setLocalOrders] = useState([]); // If you need local state for orders

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await dispatch(fetchOrders()).unwrap(); // Use `unwrap` for asyncThunk response
        console.log("Response Order is",response.orders);
        
        setLocalOrders(response.orders); // Assuming `orders` is part of the API response
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrdersData();
  }, [dispatch]);
  console.log("local order",localOrders);
  
  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(localOrders.length > 0 ? localOrders : orders).map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.sellerId?.name || "N/A"}</TableCell>
              <TableCell>{order.productId?.name || "N/A"}</TableCell>
              <TableCell>${order.totalAmount?.toFixed(2) || "0.00"}</TableCell>
              <TableCell>{order.quantity} Kg</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuyerOrder;
