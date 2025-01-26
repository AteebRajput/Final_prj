import React from 'react';
import { Clock, Tag, ShoppingCart, Gavel } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/product-ui/Card';

const ProductCard = ({ product, onBid, onPurchase }) => {
  const isAuctionActive = product.upForAuction && new Date(product.bidEndTime) > new Date();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-sm border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="relative">
          <img 
            src={product.images[0] || '/api/placeholder/300/200'} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {isAuctionActive && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Gavel className="w-4 h-4 mr-1" />
              Auction Live
            </div>
          )}
        </div>
        <CardTitle className="text-xl font-bold mt-2">{product.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Tag className="w-4 h-4 mr-2" />
          Base Price: ${product.basePrice.toFixed(2)}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Quantity: {product.quantity} {product.unit}
        </div>
        
        {product.upForAuction && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            Auction Ends: {formatDate(product.bidEndTime)}
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          Harvest Date: {formatDate(product.harvestDate)}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {isAuctionActive ? (
          <Button 
            variant="outline" 
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => onBid(product)}
          >
            <Gavel className="w-4 h-4 mr-2" />
            Place Bid
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full bg-green-500 text-white hover:bg-green-600"
            onClick={() => onPurchase(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Purchase
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;