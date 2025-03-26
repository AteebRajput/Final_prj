import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  
  updateOrderStatus,
  fetchFarmerOrders,
} from "../../../slices/orderSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { Button } from "../ui/Button";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchFarmerOrders()); // Add status as an argument if filtering orders by status is required
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }))
      .unwrap()
      .then(() => alert(`Order status updated to ${status}`))
      .catch((err) => alert(`Error: ${err}`));
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Farmer Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Winner</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.buyerId?.name || "N/A"}</TableCell>
              <TableCell>{order.productId?.name || "N/A"}</TableCell>
              <TableCell>${order.unitPrice.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(order._id, "completed")}
                >
                  Mark as Completed
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleStatusChange(order._id, "cancelled")}
                >
                  Cancel Order
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrders;
