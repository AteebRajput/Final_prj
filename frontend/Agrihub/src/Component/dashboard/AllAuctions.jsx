import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAuctions,
  endAuction,
  fetchAuctionBids,
} from "../../../slices/auctionSlice.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/product-ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Gavel, Clock, CheckCircle, XCircle, List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/product-ui/Dialog";

const AllAuctions = () => {
  const dispatch = useDispatch();
  const { auctions } = useSelector((state) => state.auctions);
  const [selectedAuctionId, setSelectedAuctionId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  //  Get bids and loading state from Redux
  const bids = useSelector(
    (state) => state.auctions.auctionBids[selectedAuctionId] || []
  );

  const loading = useSelector((state) => state.auctions.loading);
  const error = useSelector((state) => state.auctions.error);
  console.log("Auctions are:",auctions);
  
  useEffect(() => {
    dispatch(fetchAuctions());
  }, [dispatch]);

  const handleEndAuction = (auctionId) => {
    dispatch(endAuction(auctionId));
  };

  const handleOpenBids = (auctionId) => {
    setSelectedAuctionId(auctionId);
    setIsOpen(true);
    dispatch(fetchAuctionBids(auctionId));
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-blue-100 text-blue-800",
      ended: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={styles[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return <div>Loading auctions...</div>;
  }

  if (error) {
    return <div className="text-red-500">Failed to load auctions: {error}</div>;
  }

  return (
    <>
      <Card className="shadow-lg border-none">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
          <CardTitle className="flex items-center gap-3 text-green-800">
            <Gavel className="w-7 h-7 text-green-600" strokeWidth={2} />
            <span className="text-xl font-semibold tracking-tight">
              My Auction History
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow>
                {[
                  "Product",
                  "Base Price",
                  "Highest Bid",
                  "Bidders",
                  "Start Time",
                  "End Time",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <TableHead
                    key={header}
                    className="text-green-800 font-semibold uppercase tracking-wider"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {auctions.map((auction) => (
                <TableRow
                  key={auction.id}
                  className="hover:bg-green-50 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-gray-800">
                    {auction.productName}
                  </TableCell>
                  <TableCell className="text-emerald-700">
                    ${auction.basePrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {auction.highestBid ? (
                      <span className="text-lime-700 font-semibold">
                        `${auction.highestBid.amount.toFixed(2)}`
                      </span>
                    ) : (
                      <span className="text-gray-500">No bids</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      {auction.bidderCount || 0}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(auction.startTime).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(auction.endTime).toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(auction.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {auction.status === "active" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleEndAuction(auction.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Clock className="mr-2 w-4 h-4" />
                          End Auction
                        </Button>
                      )}
                      {auction.status === "ended" && (
                        <div className="flex items-center gap-2 text-sm">
                          {auction.winner ? (
                            <>
                              <CheckCircle className="text-green-500 w-5 h-5" />
                              <span className="text-green-700 font-semibold">
                                Winner: {auction.winner.name}
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="text-red-500 w-5 h-5" />
                              <span className="text-red-700">No Winner</span>
                            </>
                          )}
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenBids(auction.id)}
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        <List className="mr-2 w-4 h-4" /> View Bids
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {auctions.length === 0 && (
            <div className="text-center py-6 bg-green-50 rounded-lg text-green-800">
              <Gavel className="mx-auto mb-4 w-12 h-12 text-green-500" />
              <p className="text-lg font-semibold">No auctions found</p>
              <p className="text-sm text-green-600">
                Start a new auction to see your history
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bids Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-white shadow-2xl rounded-xl">
          <DialogHeader className="bg-green-50 p-4 rounded-t-xl border-b border-green-200">
            <DialogTitle className="flex items-center gap-3 text-green-800">
              <List className="w-6 h-6 text-green-600" strokeWidth={2} />
              <span className="text-xl font-semibold">Auction Bids</span>
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin text-green-500 w-8 h-8" />
                <span className="ml-3 text-green-700">Loading bids...</span>
              </div>
            ) : error ? (
              <div className="text-center py-6 bg-red-50 rounded-lg">
                <XCircle className="mx-auto mb-4 w-12 h-12 text-red-500" />
                <p className="text-red-700 font-semibold">
                  Failed to fetch bids
                </p>
                <p className="text-sm text-red-600">
                  Please try again or check your connection
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow>
                    {["Bidder", "Bid Amount", "Bid Time"].map((header) => (
                      <TableHead
                        key={header}
                        className="text-green-800 font-semibold uppercase"
                      >
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan="3" className="text-center py-6">
                        <List className="mx-auto mb-4 w-12 h-12 text-green-300" />
                        <p className="text-gray-500">No bids placed yet</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    bids.map((bid, index) => (
                      <TableRow
                        key={bid._id || index}
                        className="hover:bg-green-50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-700">
                          {bid.bidder.name}
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          ${bid.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(bid.timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="flex justify-end p-4 bg-gray-50 rounded-b-xl border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllAuctions;
