import React, { useEffect, useState } from "react";
import {
  Plus,
  Clock,
  Package,
  Trash2,
  Edit,
  Eye,
  BadgeDollarSign,
  MapPin,
  Calendar,
  Image,
  Tag,
  ClipboardList,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/product-ui/Dialog";
import { Button } from "../ui/product-ui/Button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../ui/product-ui/Tabs";
import { Scale, Timer, AlertCircle } from "lucide-react";
import { Badge } from "../ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/product-ui/Card";
import { Input } from "../ui/product-ui/Input";
import { Label } from "../ui/product-ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/product-ui/Select";
import { Textarea } from "../ui/product-ui/Textarea";
import { Switch } from "../ui/product-ui/Switch";
import axios from "axios";
// import { json } from "express";

const PRODUCT_API_URL = "http://localhost:5000/api/product";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [showAuctionExtend, setShowAuctionExtend] = useState(false);
  const [extendDuration, setExtendDuration] = useState({
    value: 1,
    unit: "hours",
  });

  // Get userId from localStorage
  const data = JSON.parse(localStorage.getItem("userId") || "{}");
  const userId = data.userId;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${PRODUCT_API_URL}/get-all-products/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [userId]);

  const handleUpdateProduct = async (productData) => {
    try {
      // Remove bidDuration if not applicable
      const { bidDuration, ...dataToSend } = productData;
  
      const response = await axios.put(
        `${PRODUCT_API_URL}/update-product/${dataToSend._id}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
  
      if (response.data) {
        await fetchProducts();
        setShowUpdateDialog(false);
        setShowAuctionExtend(false);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update product";
      setError(errorMessage);
      console.error("Error updating product:", err);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${PRODUCT_API_URL}/delete-product/${productId}`);
        await fetchProducts(); // Refresh products after deletion
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  const handleAddProduct = async (productData, imageFiles) => {
    try {
      const formData = new FormData();
  
      // Append all text fields first
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });
  
      // Append image files with correct field name
      imageFiles.forEach((file, index) => {
        formData.append(`images`, file); // Matches backend expectation
      });
  
      
  
      const response = await axios.post(
        `${PRODUCT_API_URL}/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchProducts(); // Refresh products after addition
      // Rest of your code remains the same
    } catch (error) {
      console.error("Add Product Error:", error.response?.data || error);
      setError(error.response?.data?.message || "Failed to add product");
    }
  };

  const filteredProducts = products?.filter((product) => {
    if (selectedTab === "auction") return product.upForAuction;
    if (selectedTab === "normal") return !product.upForAuction;
    return true;
  });

  const ProductForm = ({ product, onSubmit, onClose, isNew = false }) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState(product.images || []);

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setImageFiles((prevFiles) => [...prevFiles, ...files]);

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...previews]);
    };

    const removeImage = (index) => {
      const newFiles = [...imageFiles];
      newFiles.splice(index, 1);
      setImageFiles(newFiles);

      const newPreviews = [...imagePreview];
      newPreviews.splice(index, 1);
      setImagePreview(newPreviews);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
    
      const processedData = {
        _id:product._id,
        ...data,
        seller: userId, // Add this line to include seller
        basePrice: Number(data.basePrice) || 0,
        quantity: Number(data.quantity) || 0,
        upForAuction: data.upForAuction === "true",
        harvestDate: data.harvestDate ? new Date(data.harvestDate) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        bidEndTime: data.upForAuction === "true" && data.bidEndTime ? new Date(data.bidEndTime) : null,
        status: data.status || "draft",
      };
    
      onSubmit(processedData, imageFiles);
    };

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {isNew ? "Add New Product" : "Update Product"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-6">
            {/* Basic Information Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <ClipboardList className="w-5 h-5 text-primary" /> Basic
                Information
              </h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Product Name*
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={product.name}
                    required
                    className="transition-shadow focus:shadow-md"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Description*
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={product.description}
                    required
                    className="min-h-[100px] transition-shadow focus:shadow-md"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-gray-700">
                    Category*
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={product.category}
                    required
                    className="transition-shadow focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Price and Quantity Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <BadgeDollarSign className="w-5 h-5 text-primary" /> Pricing &
                Quantity
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="basePrice" className="text-gray-700">
                      Base Price* (₨)
                    </Label>
                    <Input
                      id="basePrice"
                      name="basePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={product.basePrice}
                      required
                      className="transition-shadow focus:shadow-md"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="quantity" className="text-gray-700">
                      Quantity*
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      defaultValue={product.quantity}
                      required
                      className="transition-shadow focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="unit" className="text-gray-700">
                      Unit*
                    </Label>
                    <Select name="unit" defaultValue={product.unit || "kg"}>
                      <SelectTrigger className="transition-shadow focus:shadow-md">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="liter">Liter</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="box">Box</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="quality" className="text-gray-700">
                      Quality Grade*
                    </Label>
                    <Input
                      id="quality"
                      name="quality"
                      defaultValue={product.quality}
                      required
                      className="transition-shadow focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location and Dates Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <MapPin className="w-5 h-5 text-primary" /> Location & Dates
              </h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="location" className="text-gray-700">
                    Location*
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={product.location}
                    required
                    className="transition-shadow focus:shadow-md"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="harvestDate" className="text-gray-700">
                      Harvest Date*
                    </Label>
                    <Input
                      id="harvestDate"
                      name="harvestDate"
                      type="date"
                      defaultValue={product.harvestDate?.split("T")[0]}
                      required
                      className="transition-shadow focus:shadow-md"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="expiryDate" className="text-gray-700">
                      Expiry Date*
                    </Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      defaultValue={product.expiryDate?.split("T")[0]}
                      required
                      className="transition-shadow focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Auction Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <Tag className="w-5 h-5 text-primary" /> Status & Auction
                Settings
              </h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status" className="text-gray-700">
                      Status
                    </Label>
                    <Select
                      name="status"
                      defaultValue={product.status || "draft"}
                    >
                      <SelectTrigger className="transition-shadow focus:shadow-md">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="upForAuction" className="text-gray-700">
                      Up For Auction
                    </Label>
                    <Switch
                      id="upForAuction"
                      name="upForAuction"
                      defaultChecked={product.upForAuction}
                      value="true"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bidEndTime" className="text-gray-700">
                    Auction End Time (if applicable)
                  </Label>
                  <Input
                    id="bidEndTime"
                    name="bidEndTime"
                    type="datetime-local"
                    defaultValue={product.bidEndTime?.split(".")[0]}
                    className="transition-shadow focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Images Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              <div className="grid gap-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4"
                />
                <div className="grid grid-cols-4 gap-4">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isNew ? "Add Product" : "Update Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const ProductDetail = ({ product, onClose }) => {
    const [timeLeft, setTimeLeft] = useState("");
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
      if (product.upForAuction && product.bidEndTime) {
        const timer = setInterval(() => {
          const now = new Date();
          const end = new Date(product.bidEndTime);
          const diff = end - now;

          if (diff <= 0) {
            setTimeLeft("Auction Ended");
            clearInterval(timer);
          } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
          }
        }, 1000);

        return () => clearInterval(timer);
      }
    }, [product.bidEndTime]);

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-white to-gray-50">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-8 py-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Gallery Section */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={
                      product.images?.[activeImage] ||
                      "/api/placeholder/400/300"
                    }
                    alt={product.name}
                    className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className={`absolute top-4 right-4 shadow-xl ${
                      product.status === "active"
                        ? "bg-green-500/90 hover:bg-green-500"
                        : product.status === "sold"
                        ? "bg-blue-500/90 hover:bg-blue-500"
                        : product.status === "expired"
                        ? "bg-red-500/90 hover:bg-red-500"
                        : "bg-yellow-500/90 hover:bg-yellow-500"
                    } backdrop-blur-sm transition-colors duration-300`}
                  >
                    {product.status.toUpperCase()}
                  </Badge>
                </div>

                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative rounded-lg overflow-hidden ${
                          activeImage === index
                            ? "ring-2 ring-primary ring-offset-2"
                            : "hover:opacity-80"
                        } transition-all duration-200`}
                      >
                        <img
                          src={image || "/api/placeholder/100/100"}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {product.upForAuction && (
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm border border-amber-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Timer className="w-6 h-6 text-amber-600" />
                      <h3 className="font-bold text-lg text-amber-800">
                        Auction Status
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-amber-900 mb-2">
                      {timeLeft ? timeLeft : "Loading..."}
                    </p>
                    <p className="text-sm text-amber-700">
                      Ends: {formatDate(product.bidEndTime)}{" "}
                      {new Date(product.bidEndTime).toLocaleTimeString()}
                    </p>
                  </div>
                )}

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <Scale className="w-5 h-5 text-primary" />
                        <span className="font-medium">Base Price</span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        ₨ {product.basePrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-primary" />
                        <span className="font-medium">Quantity</span>
                      </div>
                      <span className="text-lg font-bold text-gray-700">
                        {product.quantity} {product.unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-medium">Location</span>
                      </div>
                      <span className="text-gray-700">{product.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-4 text-gray-800">
                  Product Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-800">
                      {product.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quality Grade</p>
                    <p className="font-medium text-gray-800">
                      {product.quality}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-4 text-gray-800">
                  Important Dates
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Harvest Date</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(product.harvestDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-medium text-gray-800">
                        {formatDate(product.expiryDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
          <div>
            <h1 className="text-4xl py-2 font-bold bg-gradient-to-r from-green-400 via-green-600 to-blue-900 bg-clip-text text-transparent">
              Empowering Growth: Manage Your Agricultural Products with Ease
            </h1>

            <p className="text-gray-600 mt-1">
              Manage your product inventory efficiently
            </p>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Product
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-red-700 animate-fadeIn">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Tabs Section */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3 p-1 bg-gray-100 rounded-lg">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
            >
              <Package className="w-4 h-4 mr-2" /> All Products
            </TabsTrigger>
            <TabsTrigger
              value="normal"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
            >
              <Package className="w-4 h-4 mr-2" /> Regular
            </TabsTrigger>
            <TabsTrigger
              value="auction"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
            >
              <Clock className="w-4 h-4 mr-2" /> Auction
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map((product) => (
                <Card
                  key={product._id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={product.images?.[0] || "/api/placeholder/400/300"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-4 right-4 ${
                          product.status === "active"
                            ? "bg-green-500"
                            : product.status === "sold"
                            ? "bg-blue-500"
                            : product.status === "expired"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        } shadow-lg`}
                      >
                        {product.status.toUpperCase()}
                      </Badge>
                      {product.upForAuction && (
                        <Badge className="absolute top-4 left-4 bg-amber-500 shadow-lg">
                          <Clock className="w-4 h-4 mr-1" /> AUCTION
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-primary" />
                        <span className="font-semibold">
                          ₨{product.basePrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        <span>
                          {product.quantity} {product.unit}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 p-4 flex justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDetailDialog(true);
                      }}
                      className="hover:bg-primary hover:text-green hover:bg-green-500 transition-colors duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowUpdateDialog(true);
                      }}
                      className="hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product._id)}
                      className="hover:bg-red-600 hover:text-white transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Keep existing dialog components */}
      {showDetailDialog && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => {
            setShowDetailDialog(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {(showUpdateDialog || showAddDialog) && (
        <ProductForm
          product={
            showAddDialog
              ? {
                  name: "",
                  description: "",
                  category: "",
                  basePrice: "",
                  quantity: "",
                  unit: "kg",
                  quality: "",
                  location: "",
                  harvestDate: "",
                  expiryDate: "",
                  status: "draft",
                  upForAuction: false,
                  bidEndTime: "",
                  images: [],
                }
              : selectedProduct
          }
          onSubmit={showAddDialog ? handleAddProduct : handleUpdateProduct}
          onClose={() => {
            showAddDialog
              ? setShowAddDialog(false)
              : setShowUpdateDialog(false);
            setSelectedProduct(null);
          }}
          isNew={showAddDialog}
        />
      )}
    </div>
  );
}
