import { useGetMyDeliveriesQuery, useConfirmDeliveryMutation } from "@/app/api/apiSlice";
import { TParcel } from "@/types";
import toast from "react-hot-toast";

export default function MyDeliveries() {
  const { data: parcels, isLoading, isError } = useGetMyDeliveriesQuery();
  const [confirmDelivery, { isLoading: isConfirming }] = useConfirmDeliveryMutation();

  const handleConfirm = async (parcelId: string) => {
    try {
      await confirmDelivery(parcelId).unwrap();
      toast.success("Delivery confirmed successfully!");
    } catch {
      toast.error("Failed to confirm delivery.");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><span className="loading loading-lg"></span></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Failed to load deliveries.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Deliveries</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Description</th>
              <th>Pickup Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels && parcels.length > 0 ? (
              parcels.map((parcel: TParcel) => (
                <tr key={parcel._id}>
                  <td className="font-mono">{parcel.trackingId}</td>
                  <td>{parcel.parcelDescription}</td>
                  <td>{parcel.pickupAddress}</td>
                  <td>
                    <span className={`badge ${
                      parcel.status === 'delivered' ? 'badge-success' :
                      parcel.status === 'cancelled' ? 'badge-error' :
                      parcel.status === 'pending' ? 'badge-warning' : 'badge-info'
                    }`}>{parcel.status}</span>
                  </td>
                  <td>
                    {parcel.status === 'in-transit' && (
                      <button
                        onClick={() => handleConfirm(parcel._id)}
                        className="btn btn-sm btn-success"
                        disabled={isConfirming}
                      >
                        Confirm Delivery
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">You have no incoming deliveries.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}