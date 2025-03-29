// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { ILoggedInEmployeeStore } from "../models/users.model";

// interface ParkingSlot {
//   _id: string;
//   status: boolean;
//   bookedBy: number | null;
//   bookingId: string | null;
//   date: string;
//   defaultAllocatedUntil: string;
//   bookedFor: number | null;
//   slotNumber: number;
// }

// const GetParkingSlots = () => {
//   const [slots, setSlots] = useState<ParkingSlot[]>([]);
//   const [filteredSlots, setFilteredSlots] = useState<ParkingSlot[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

//   const userDetails = useSelector(
//     (state: ILoggedInEmployeeStore) => state?.loggedInUser?.data
//   );

//   const sapId = userDetails?.[0]?.sapId;

//   useEffect(() => {
//     fetchSlots();
//   }, []);

//   useEffect(() => {
//     filterSlotsByDate(selectedDate);
//   }, [selectedDate, slots]);

//   const fetchSlots = async () => {
//     try {
//       const response = await axios.get("http://localhost:8090/api/v1/parkingSlots/park");
//       setSlots(response.data);
//       setFilteredSlots(response.data);
//     } catch (error) {
//       console.error("Error fetching slots", error);
//     }
//   };

//   const filterSlotsByDate = (date: string) => {
//     const filtered = slots.filter(slot => slot.date.split("T")[0] === date);
//     setFilteredSlots(filtered);
//   };

//   const releaseSlot = async (bookingId: string, sapId: number, slotId: string) => {
//     console.log(bookingId, sapId, slotId);
//     try {
//       await axios.patch("http://localhost:8080/api/v1/release-slot", {
//         bookingId,
//         sapId,
//         slotId
//       });
//       alert("Slot released successfully");
//       fetchSlots(); // Refresh the slots after releasing
//     } catch (error) {
//       console.error("Error releasing slot", error);
//       alert("Error releasing slot");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Parking Slots</h2>

//       {/* Date Picker */}
//       <div className="mb-4">
//         <label className="text-lg font-semibold">Select Date:</label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border rounded p-2 ml-2"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Slot Number</th>
//               <th className="border p-2">Status</th>
            
//               <th className="border p-2">Date</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSlots.length > 0 ? (
//               filteredSlots.map((slot) => (
//                 <tr key={slot._id} className="hover:bg-gray-100">
//                   <td className="border p-2 text-center">{slot.slotNumber}</td>
//                   <td className="border p-2 text-center">{slot.status ? "Booked" : "Available"}</td>
                
//                   <td className="border p-2 text-center">{slot.date.split("T")[0]}</td>
//                   <td className="border p-2 text-center">
//                     {slot.status && slot.bookedBy === sapId ? (
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                         onClick={() => releaseSlot(slot.bookingId!, sapId!, slot._id)}
//                       >
//                         Release
//                       </button>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} className="text-center p-4">
//                   No slots available for the selected date.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default GetParkingSlots;

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ILoggedInEmployeeStore } from "../models/users.model";

interface ParkingSlot {
  _id: string;
  status: boolean;
  bookedBy: number | null;
  bookingId: string | null;
  date: string;
  defaultAllocatedUntil: string;
  bookedFor: number | null;
  slotNumber: number;
}

const GetParkingSlots = () => {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<ParkingSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const userDetails = useSelector(
    (state: ILoggedInEmployeeStore) => state?.loggedInUser?.data
  );

  const sapId = userDetails?.[0]?.sapId;

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    filterSlotsByDate(selectedDate);
  }, [selectedDate, slots]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/v1/parkingSlots/park");
      setSlots(response.data);
      setFilteredSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots", error);
    }
  };

  const filterSlotsByDate = (date: string) => {
    const filtered = slots.filter(slot => slot.date.split("T")[0] === date);
    setFilteredSlots(filtered);
  };

  const releaseSlot = async (bookingId: string, sapId: number, slotId: string) => {
    console.log(bookingId, sapId, slotId);
    try {
      await axios.patch("http://localhost:8080/api/v1/release-slot", {
        bookingId,
        sapId,
        slotId
      });
      alert("Slot released successfully");
      fetchSlots(); // Refresh the slots after releasing
    } catch (error) {
      console.error("Error releasing slot", error);
      alert("Error releasing slot");
    }
  };

  const bookSlot = async (slotId: string) => {
    try {
      await axios.patch(`http://localhost:8090/api/v1/parking/getAllParkingslots`, {
        sapId,
        slotId
      });
      alert("Slot booked successfully");
      fetchSlots(); // Refresh the slots after booking
    } catch (error) {
      console.error("Error booking slot", error);
      alert("Error booking slot");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Parking Slots</h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="text-lg font-semibold">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-2 ml-2"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Slot Number</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <tr key={slot._id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{slot.slotNumber}</td>
                  <td className={`border p-2 text-center ${slot.status ? "text-red-500" : "text-green-500"}`}>
                    {slot.status ? "Booked" : "Available"}
                  </td>
                  <td className="border p-2 text-center">{slot.date.split("T")[0]}</td>
                  <td className="border p-2 text-center">
                    {slot.status && slot.bookedBy === sapId ? (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => releaseSlot(slot.bookingId!, sapId!, slot._id)}
                      >
                        Release
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => bookSlot(slot._id)}
                      >
                        Book
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No slots available for the selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetParkingSlots