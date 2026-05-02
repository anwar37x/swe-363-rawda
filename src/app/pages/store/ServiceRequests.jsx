import { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";

export default function ServiceRequests() {
  const [activeTab, setActiveTab] =
    useState("Pending");

  const [selectedRequest,
    setSelectedRequest] =
    useState(null);

  const [showDetailModal,
    setShowDetailModal] =
    useState(false);

  const [showActionModal,
    setShowActionModal] =
    useState(false);

  const [actionType,
    setActionType] =
    useState("accept");

  const [rejectionNote,
    setRejectionNote] =
    useState("");

  const [toast, setToast] =
    useState(null);

  const [requests,
    setRequests] =
    useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests =
  async () => {
    const res =
    await axios.get(
      "http://localhost:5050/api/service-requests"
    );

    setRequests(res.data);
  };

  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() =>
      setToast(null), 3000
    );
  };

  const handleViewDetails =
  (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleAction =
  (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setShowDetailModal(false);
    setShowActionModal(true);
  };

  const confirmAction =
  async () => {

    const status =
      actionType === "accept"
        ? "Accepted"
        : "Declined";

    await axios.put(
      `http://localhost:5050/api/service-requests/${selectedRequest._id}`,
      {
        status,
        rejectionNote
      }
    );

    fetchRequests();

    showToast(
      status === "Accepted"
        ? "Request approved successfully."
        : "Request declined."
    );

    setShowActionModal(false);
    setSelectedRequest(null);
    setRejectionNote("");
  };

  const filteredRequests =
    requests.filter(
      (r) =>
        r.status === activeTab
    );

  return (
<div className="max-w-7xl mx-auto">

<div className="mb-6">
<h1 className="text-3xl font-bold">
Service Requests
</h1>

<p className="text-gray-600">
Manage incoming requests
</p>
</div>

<div className="bg-white rounded-xl shadow-sm mb-6">
<div className="flex border-b">

{[
"Pending",
"Accepted",
"Declined",
"Completed"
].map((tab) => (

<button
key={tab}
onClick={() =>
setActiveTab(tab)
}
className={`px-6 py-4 font-medium ${
activeTab === tab
? "text-orange-600 border-b-2 border-orange-600"
: "text-gray-600"
}`}
>
{tab} (
{requests.filter(
(r)=>
r.status===tab
).length}
)
</button>

))}

</div>
</div>

<div className="bg-white rounded-xl shadow-sm overflow-hidden">

{filteredRequests.length===0 ? (

<div className="p-12 text-center text-gray-600">
No requests found
</div>

) : (

<table className="w-full">

<thead className="bg-gray-50">
<tr>
<th className="px-6 py-4 text-left">
Customer
</th>
<th className="px-6 py-4 text-left">
Service
</th>
<th className="px-6 py-4 text-left">
Dates
</th>
<th className="px-6 py-4 text-left">
Plants
</th>
<th className="px-6 py-4 text-left">
Actions
</th>
</tr>
</thead>

<tbody>

{filteredRequests.map(
(request)=>(

<tr
key={request._id}
className="border-t"
>

<td className="px-6 py-4">
{request.customerName}
</td>

<td className="px-6 py-4">
{request.service}
</td>

<td className="px-6 py-4">
{request.dates}
</td>

<td className="px-6 py-4">
{request.plantCount}
</td>

<td className="px-6 py-4 flex gap-2">

<button
onClick={() =>
handleViewDetails(
request
)
}
className="text-blue-600"
>
<Eye className="w-4 h-4"/>
</button>

{request.status==="Pending" && (
<>

<button
onClick={() =>
handleAction(
request,
"accept"
)
}
className="text-green-600"
>
<CheckCircle className="w-4 h-4"/>
</button>

<button
onClick={() =>
handleAction(
request,
"reject"
)
}
className="text-red-600"
>
<XCircle className="w-4 h-4"/>
</button>

</>
)}

</td>

</tr>

))}

</tbody>
</table>

)}

</div>

</div>
);
}