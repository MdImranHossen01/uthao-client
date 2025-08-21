import { useGetAllParcelsQuery } from "@/app/api/apiSlice";
import ParcelStatusChart from "@/components/dashboard/ParcelStatusChart";
import StatsCard from "@/components/dashboard/StatsCard";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const { data: parcels, isLoading } = useGetAllParcelsQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><span className="loading loading-lg"></span></div>;
  }

  const totalParcels = parcels?.length || 0;
  const delivered = parcels?.filter(p => p.status === 'delivered').length || 0;
  const inTransit = parcels?.filter(p => p.status === 'in-transit').length || 0;
  const cancelled = parcels?.filter(p => p.status === 'cancelled').length || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Total Parcels" value={totalParcels} icon={Package} />
        <StatsCard title="Parcels Delivered" value={delivered} icon={CheckCircle} />
        <StatsCard title="In Transit" value={inTransit} icon={Truck} />
        <StatsCard title="Cancelled" value={cancelled} icon={XCircle} />
      </div>
      <ParcelStatusChart parcels={parcels || []} />
    </div>
  );
}