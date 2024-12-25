import mongoose from "mongoose";
const uri = 'mongodb+srv://lavishgehlod:lavishgehlod@cluster0.vp8iwsu.mongodb.net/Dursh';
const uri2 = 'mongodb+srv://durshbeats:lavishgehlod@cluster0.mh3k4.mongodb.net/Durshbeats';

mongoose.connect(uri2)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));








// import React from 'react';
// import { PlayCircle, Download, Clock, Calendar, MoreVertical, Search } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

// const MusicOrdersList = () => {
//     const orders = [
//         {
//             id: "#2024-001",
//             trackName: "Midnight Echoes",
//             artist: "Echo Valley",
//             type: "Album",
//             price: 24.99,
//             purchaseDate: "2024-03-15",
//             status: "Ready to download",
//             albumArt: "/api/placeholder/60/60"
//         },
//         {
//             id: "#2024-002",
//             trackName: "Summer Vibes Collection",
//             artist: "Various Artists",
//             type: "Playlist Bundle",
//             price: 39.99,
//             purchaseDate: "2024-03-14",
//             status: "Processing",
//             albumArt: "/api/placeholder/60/60"
//         },
//         {
//             id: "#2024-003",
//             trackName: "Neon Dreams",
//             artist: "Synthwave Masters",
//             type: "Single Track",
//             price: 1.99,
//             purchaseDate: "2024-03-13",
//             status: "Downloaded",
//             albumArt: "/api/placeholder/60/60"
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
//             {/* Header Section */}
//             <div className="max-w-7xl mx-auto mb-8">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//                         My Music Orders
//                     </h1>
//                     {/* Search Bar */}
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         <input
//                             type="text"
//                             placeholder="Search orders..."
//                             className="bg-gray-800 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                     </div>
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                     {[
//                         { label: "Total Orders", value: "24", icon: Clock },
//                         { label: "This Month", value: "6", icon: Calendar },
//                         { label: "Available Downloads", value: "18", icon: Download }
//                     ].map((stat, index) => (
//                         <Card key={index} className="bg-gray-800 border-gray-700">
//                             <CardContent className="p-4">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-gray-400 text-sm">{stat.label}</p>
//                                         <p className="text-2xl font-bold mt-1">{stat.value}</p>
//                                     </div>
//                                     <stat.icon className="w-8 h-8 text-purple-500 opacity-80" />
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </div>

//                 {/* Orders List */}
//                 <div className="bg-gray-800 rounded-xl overflow-hidden">
//                     {/* Table Header */}
//                     <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-700 text-gray-400 text-sm">
//                         <div className="col-span-2">Track/Album</div>
//                         <div>Type</div>
//                         <div>Purchase Date</div>
//                         <div>Price</div>
//                         <div>Status</div>
//                         <div>Actions</div>
//                     </div>

//                     {/* Order Items */}
//                     {orders.map((order) => (
//                         <div
//                             key={order.id}
//                             className="grid grid-cols-7 gap-4 p-4 border-b border-gray-700 items-center hover:bg-gray-750 transition-colors"
//                         >
//                             <div className="col-span-2 flex items-center space-x-3">
//                                 <img
//                                     src={order.albumArt}
//                                     alt={order.trackName}
//                                     className="w-12 h-12 rounded object-cover"
//                                 />
//                                 <div>
//                                     <p className="font-medium">{order.trackName}</p>
//                                     <p className="text-sm text-gray-400">{order.artist}</p>
//                                 </div>
//                             </div>
//                             <div className="text-gray-300">{order.type}</div>
//                             <div className="text-gray-300">{order.purchaseDate}</div>
//                             <div className="text-gray-300">${order.price}</div>
//                             <div>
//                                 <span className={`px-3 py-1 rounded-full text-xs
//                       ${order.status === 'Ready to download' ? 'bg-green-900 text-green-300' :
//                                         order.status === 'Processing' ? 'bg-yellow-900 text-yellow-300' :
//                                             'bg-blue-900 text-blue-300'}`}>
//                                     {order.status}
//                                 </span>
//                             </div>
//                             <div className="flex space-x-2">
//                                 <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
//                                     <Download className="w-5 h-5" />
//                                 </button>
//                                 <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
//                                     <PlayCircle className="w-5 h-5" />
//                                 </button>
//                                 <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
//                                     <MoreVertical className="w-5 h-5" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MusicOrdersList;










