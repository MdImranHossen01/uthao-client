import { useGetAllParcelsQuery } from "@/app/api/apiSlice";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { TParcel } from "@/types";

export default function AllParcels() {
  const { data: allParcels, isLoading, isError } = useGetAllParcelsQuery();
  const { currentPage, setCurrentPage, totalPages, paginatedData: parcels } = usePagination(allParcels || []);


  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><span className="loading loading-lg"></span></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Failed to load parcels.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Parcels</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Receiver Name</th>
              <th>Receiver Phone</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {parcels && parcels.length > 0 ? (
              parcels.map((parcel: TParcel) => (
                <tr key={parcel._id}>
                  <td className="font-mono">{parcel.trackingId}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverPhoneNumber}</td>
                  <td>
                    <span className={`badge ${
                      parcel.status === 'delivered' ? 'badge-success' :
                      parcel.status === 'cancelled' ? 'badge-error' :
                      parcel.status === 'pending' ? 'badge-warning' : 'badge-info'
                    }`}>{parcel.status}</span>
                  </td>
                  <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">No parcels found in the system.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {allParcels && allParcels.length > 10 && (
         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}