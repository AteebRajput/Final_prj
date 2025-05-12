import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/product-ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/product-ui/Tabs";
import { Badge } from "../ui/Badge";

export default function LogisticsPage() {
    return (
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Pakistan Logistics Companies</h1>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Compare rates and services from Pakistan's leading logistics and courier companies for your shipping needs.
          </p>
    
          <div className="grid grid-cols-1 gap-8">
            {/* TCS */}
            <Card className="overflow-hidden border-t-4 border-t-red-600">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-red-600">TCS</CardTitle>
                    <CardDescription>Pakistan's Premier Courier Service</CardDescription>
                  </div>
                  <Badge className="bg-red-600 text-white">Premium Service</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span>CIVIL AVIATION, 101 - 104 Airport Road, Jinnah International Airport, Karachi, 74200</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <span>(021) 111 123 456</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <a href="mailto:customerservices@tcs.com.pk" className="text-blue-600 hover:underline">
                        customerservices@tcs.com.pk
                      </a>
                    </div>
                  </div>
    
                  <div>
                    <Tabs defaultValue="redbox">
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="redbox" className="flex-1">
                          Red Box Courier
                        </TabsTrigger>
                        <TabsTrigger value="overland" className="flex-1">
                          Overland Express
                        </TabsTrigger>
                      </TabsList>
    
                      <TabsContent value="redbox" className="mt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Weight</th>
                                <th className="border px-3 py-2 text-left">Within City</th>
                                <th className="border px-3 py-2 text-left">Same Zone</th>
                                <th className="border px-3 py-2 text-left">Different Zone</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">2 KG</td>
                                <td className="border px-3 py-2">Rs. 87</td>
                                <td className="border px-3 py-2">Rs. 126</td>
                                <td className="border px-3 py-2">Rs. 152</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">5 KG</td>
                                <td className="border px-3 py-2">Rs. 161</td>
                                <td className="border px-3 py-2">Rs. 213</td>
                                <td className="border px-3 py-2">Rs. 326</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">10 KG</td>
                                <td className="border px-3 py-2">Rs. 204</td>
                                <td className="border px-3 py-2">Rs. 300</td>
                                <td className="border px-3 py-2">Rs. 517</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">25 KG</td>
                                <td className="border px-3 py-2">Rs. 300</td>
                                <td className="border px-3 py-2">Rs. 517</td>
                                <td className="border px-3 py-2">Rs. 935</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <p>
                            Additional per KG (2KG & 5KG): Rs. 30 (Within City), Rs. 50 (Same Zone), Rs. 80 (Different Zone)
                          </p>
                          <p>
                            Additional per KG (10KG & 25KG): Rs. 20 (Within City), Rs. 30 (Same Zone), Rs. 50 (Different
                            Zone)
                          </p>
                        </div>
                      </TabsContent>
    
                      <TabsContent value="overland" className="mt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Destination</th>
                                <th className="border px-3 py-2 text-left">Up to 10 KG</th>
                                <th className="border px-3 py-2 text-left">Each Additional 0.5 KG</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Within City</td>
                                <td className="border px-3 py-2">Rs. 150</td>
                                <td className="border px-3 py-2">Rs. 20</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">City to City</td>
                                <td className="border px-3 py-2">Rs. 150</td>
                                <td className="border px-3 py-2">Rs. 20</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* LEOPARD */}
            <Card className="overflow-hidden border-t-4 border-t-yellow-600">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-yellow-600">LEOPARD</CardTitle>
                    <CardDescription>Fast & Reliable Courier Service</CardDescription>
                  </div>
                  <Badge className="bg-yellow-600 text-white">Express Delivery</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>House, 19, Leopards, F, 19-F Imam Ahmed Rd, P.E.C.H.S Block 2 Block 6 PECHS, Karachi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                      <span>(021) 111 300 786</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                      <a href="mailto:customerservice@leopardscourier.com" className="text-blue-600 hover:underline">
                        customerservice@leopardscourier.com
                      </a>
                    </div>
                  </div>
    
                  <div>
                    <h3 className="font-medium mb-3">Leopard Courier Delivery Rates (Minimum 10 kg)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-3 py-2 text-left">Service Type</th>
                            <th className="border px-3 py-2 text-left">Weight</th>
                            <th className="border px-3 py-2 text-left">Within City</th>
                            <th className="border px-3 py-2 text-left">Same Zone</th>
                            <th className="border px-3 py-2 text-left">Other Zone</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-3 py-2">Leopards Box</td>
                            <td className="border px-3 py-2">10 kg</td>
                            <td className="border px-3 py-2">Rs. 1,100</td>
                            <td className="border px-3 py-2">Rs. 1,400</td>
                            <td className="border px-3 py-2">Rs. 1,900</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2">Economy Service</td>
                            <td className="border px-3 py-2">10 kg</td>
                            <td className="border px-3 py-2">Rs. 1,100</td>
                            <td className="border px-3 py-2">Rs. 1,100</td>
                            <td className="border px-3 py-2">Rs. 1,100</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2">Overland Service</td>
                            <td className="border px-3 py-2">10 kg</td>
                            <td className="border px-3 py-2">Rs. 600</td>
                            <td className="border px-3 py-2">Rs. 600</td>
                            <td className="border px-3 py-2">Rs. 600</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Daewoo Fastex */}
            <Card className="overflow-hidden border-t-4 border-t-blue-600">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-blue-600">Daewoo Fastex</CardTitle>
                    <CardDescription>Nationwide Logistics Network</CardDescription>
                  </div>
                  <Badge className="bg-blue-600 text-white">Nationwide Coverage</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>231-A Ferozepur Road, Kalma Chowk Lahore, Punjab Pakistan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>042-111-007-009</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <a href="mailto:fastex@daewoofastex.com" className="text-blue-600 hover:underline">
                        fastex@daewoofastex.com
                      </a>
                    </div>
                  </div>
    
                  <div>
                    <h3 className="font-medium mb-3">Standard Courier Rates (10 kg)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-3 py-2 text-left">Origin</th>
                            <th className="border px-3 py-2 text-left">Destination</th>
                            <th className="border px-3 py-2 text-left">Estimated Rate (PKR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-3 py-2">Lahore</td>
                            <td className="border px-3 py-2">Karachi</td>
                            <td className="border px-3 py-2">2,400</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2">Lahore</td>
                            <td className="border px-3 py-2">Rawalpindi</td>
                            <td className="border px-3 py-2">2,300</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2">Lahore</td>
                            <td className="border px-3 py-2">Jhelum</td>
                            <td className="border px-3 py-2">2,200</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2">Lahore</td>
                            <td className="border px-3 py-2">Multan</td>
                            <td className="border px-3 py-2">2,200</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2">Lahore</td>
                            <td className="border px-3 py-2">Quetta</td>
                            <td className="border px-3 py-2">2,400</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      All rates are for standard courier service (10 kg packages)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Post Ex */}
            <Card className="overflow-hidden border-t-4 border-t-green-600">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-green-600">Post Ex</CardTitle>
                    <CardDescription>Modern Logistics Solutions</CardDescription>
                  </div>
                  <Badge className="bg-green-600 text-white">Affordable Rates</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Lahore, Punjab</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>support@postex.pk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <a href="mailto:support@postex.pk" className="text-blue-600 hover:underline">
                        support@postex.pk
                      </a>
                    </div>
                  </div>
    
                  <div>
                    <h3 className="font-medium mb-3">Delivery Rates</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-3 py-2 text-left">Weight Range</th>
                            <th className="border px-3 py-2 text-left">Base Rate (Rs.)</th>
                            <th className="border px-3 py-2 text-left">Additional Charge per Kg (Rs.)</th>
                            <th className="border px-3 py-2 text-left">Total Estimated Cost (Rs.)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-3 py-2">Up to 5 kg</td>
                            <td className="border px-3 py-2">250</td>
                            <td className="border px-3 py-2">—</td>
                            <td className="border px-3 py-2">250</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2">6 kg</td>
                            <td className="border px-3 py-2">250</td>
                            <td className="border px-3 py-2">60</td>
                            <td className="border px-3 py-2">310</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2">7 kg</td>
                            <td className="border px-3 py-2">250</td>
                            <td className="border px-3 py-2">120</td>
                            <td className="border px-3 py-2">370</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2">8 kg</td>
                            <td className="border px-3 py-2">250</td>
                            <td className="border px-3 py-2">180</td>
                            <td className="border px-3 py-2">430</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2">9 kg</td>
                            <td className="border px-3 py-2">250</td>
                            <td className="border px-3 py-2">240</td>
                            <td className="border px-3 py-2">490</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2">10 kg</td>
                            <td className="border px-3 py-2">250</td>
                            <td className="border px-3 py-2">300</td>
                            <td className="border px-3 py-2">550</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* M&P */}
            <Card className="overflow-hidden border-t-4 border-t-purple-600">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-purple-600">M&P</CardTitle>
                    <CardDescription>Comprehensive Logistics Services</CardDescription>
                  </div>
                  <Badge className="bg-purple-600 text-white">Multiple Services</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>
                        Town, Plot No. C-118 & C-119 Korangi Industrial Area, Karachi 31-A Mehran, Extension, Karachi,
                        Pakistan
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-purple-600 flex-shrink-0" />
                      <span>(021) 111-202-202</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-purple-600 flex-shrink-0" />
                      <a href="mailto:contact@mulphilog.com" className="text-blue-600 hover:underline">
                        contact@mulphilog.com
                      </a>
                    </div>
                  </div>
    
                  <div>
                    <Tabs defaultValue="express">
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="express" className="flex-1">
                          Express Cargo
                        </TabsTrigger>
                        <TabsTrigger value="mybox" className="flex-1">
                          MyBox Shipment
                        </TabsTrigger>
                        <TabsTrigger value="cod" className="flex-1">
                          MyBox COD
                        </TabsTrigger>
                      </TabsList>
    
                      <TabsContent value="express" className="mt-0">
                        <h3 className="font-medium mb-3">Express Cargo Service (72 Hours Delivery)</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Zone</th>
                                <th className="border px-3 py-2 text-left">Rate (10 KG)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Zone A</td>
                                <td className="border px-3 py-2">Rs. 700</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Zone B</td>
                                <td className="border px-3 py-2">Rs. 800</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Minimum chargeable weight is 10 kg.</p>
                      </TabsContent>
    
                      <TabsContent value="mybox" className="mt-0">
                        <h3 className="font-medium mb-3">MyBox Shipment Service</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Delivery Area</th>
                                <th className="border px-3 py-2 text-left">Rate (10 KG)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Within City</td>
                                <td className="border px-3 py-2">Rs. 1,420</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Same Zone</td>
                                <td className="border px-3 py-2">Rs. 2,000</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Different Zone</td>
                                <td className="border px-3 py-2">Rs. 2,750</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Rates exclude packing charges.</p>
                      </TabsContent>
    
                      <TabsContent value="cod" className="mt-0">
                        <h3 className="font-medium mb-3">MyBox COD Service</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Delivery Area</th>
                                <th className="border px-3 py-2 text-left">Rate (10 KG)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Within City</td>
                                <td className="border px-3 py-2">Rs. 1,100</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Same Zone</td>
                                <td className="border px-3 py-2">Rs. 1,500</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Different Zone</td>
                                <td className="border px-3 py-2">Rs. 2,000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Trax */}
            <Card className="overflow-hidden border-t-4 border-t-orange-600">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-orange-600">Trax</CardTitle>
                    <CardDescription>Efficient Delivery Solutions</CardDescription>
                  </div>
                  <Badge className="bg-orange-600 text-white">Multiple Service Tiers</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>Plot 105, Sector 7-A, Mehran Town, Korangi, Karachi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      <span>info@trax.pk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      <a href="mailto:info@trax.pk" className="text-blue-600 hover:underline">
                        info@trax.pk
                      </a>
                    </div>
                  </div>
    
                  <div>
                    <Tabs defaultValue="saver">
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="saver" className="flex-1">
                          Saver Plus
                        </TabsTrigger>
                        <TabsTrigger value="rush" className="flex-1">
                          Rush
                        </TabsTrigger>
                        <TabsTrigger value="swift" className="flex-1">
                          Swift
                        </TabsTrigger>
                        <TabsTrigger value="bulky" className="flex-1">
                          Bulky
                        </TabsTrigger>
                      </TabsList>
    
                      <TabsContent value="saver" className="mt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Destination</th>
                                <th className="border px-3 py-2 text-left">Up to 10 kg</th>
                                <th className="border px-3 py-2 text-left">Additional per kg</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Within City</td>
                                <td className="border px-3 py-2">Rs. 300</td>
                                <td className="border px-3 py-2">Rs. 30</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Zone A</td>
                                <td className="border px-3 py-2">Rs. 300</td>
                                <td className="border px-3 py-2">Rs. 30</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Zone B</td>
                                <td className="border px-3 py-2">Rs. 350</td>
                                <td className="border px-3 py-2">Rs. 30</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Zone C</td>
                                <td className="border px-3 py-2">Rs. 400</td>
                                <td className="border px-3 py-2">Rs. 30</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Zone D</td>
                                <td className="border px-3 py-2">Rs. 450</td>
                                <td className="border px-3 py-2">Rs. 30</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
    
                      <TabsContent value="rush" className="mt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Destination</th>
                                <th className="border px-3 py-2 text-left">Up to 10 kg</th>
                                <th className="border px-3 py-2 text-left">Additional per kg</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Within City</td>
                                <td className="border px-3 py-2">Rs. 120</td>
                                <td className="border px-3 py-2">Rs. 100</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Zone A</td>
                                <td className="border px-3 py-2">Rs. 160</td>
                                <td className="border px-3 py-2">Rs. 100</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Zone B</td>
                                <td className="border px-3 py-2">Rs. 165</td>
                                <td className="border px-3 py-2">Rs. 100</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Zone C</td>
                                <td className="border px-3 py-2">Rs. 170</td>
                                <td className="border px-3 py-2">Rs. 100</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Zone D</td>
                                <td className="border px-3 py-2">Rs. 175</td>
                                <td className="border px-3 py-2">Rs. 100</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
    
                      <TabsContent value="swift" className="mt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Destination</th>
                                <th className="border px-3 py-2 text-left">Up to 10 kg</th>
                                <th className="border px-3 py-2 text-left">Additional per kg</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Within City</td>
                                <td className="border px-3 py-2">Rs. 210</td>
                                <td className="border px-3 py-2">Rs. 70</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Zone A</td>
                                <td className="border px-3 py-2">Rs. 240</td>
                                <td className="border px-3 py-2">Rs. 70</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Zone B</td>
                                <td className="border px-3 py-2">Rs. 250</td>
                                <td className="border px-3 py-2">Rs. 80</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Zone C</td>
                                <td className="border px-3 py-2">Rs. 260</td>
                                <td className="border px-3 py-2">Rs. 80</td>
                              </tr>
                              <tr>
                                <td className="border px-3 py-2">Zone D</td>
                                <td className="border px-3 py-2">Rs. 270</td>
                                <td className="border px-3 py-2">Rs. 80</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
    
                      <TabsContent value="bulky" className="mt-0">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border px-3 py-2 text-left">Destination</th>
                                <th className="border px-3 py-2 text-left">Up to 10 kg</th>
                                <th className="border px-3 py-2 text-left">Additional per kg</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-3 py-2">Local City</td>
                                <td className="border px-3 py-2">Rs. 450</td>
                                <td className="border px-3 py-2">Rs. 40</td>
                              </tr>
                              <tr className="bg-gray-50">
                                <td className="border px-3 py-2">Other City/Province</td>
                                <td className="border px-3 py-2">Rs. 550</td>
                                <td className="border px-3 py-2">Rs. 40</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
}
