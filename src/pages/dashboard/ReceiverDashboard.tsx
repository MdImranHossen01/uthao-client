import { useGetMyDeliveriesQuery } from "@/app/api/apiSlice";
import ParcelStatusChart from "@/components/dashboard/ParcelStatusChart";
import StatsCard from "@/components/dashboard/StatsCard";
import { Package, Truck, CheckCircle, History } from "lucide-react";

export default function ReceiverDashboard() {
  const { data: parcels, isLoading } = useGetMyDeliveriesQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><span className="loading loading-lg"></span></div>;
  }
  
  const totalParcels = parcels?.length || 0;
  const delivered = parcels?.filter(p => p.status === 'delivered').length || 0;
  const inTransit = parcels?.filter(p => p.status === 'in-transit').length || 0;
  const deliveryHistory = parcels?.filter(p => p.status === 'delivered' || p.status === 'cancelled').length || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Receiver Overview</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Total Incoming" value={totalParcels} icon={Package} />
        <StatsCard title="Delivered to Me" value={delivered} icon={CheckCircle} />
        <StatsCard title="On The Way" value={inTransit} icon={Truck} />
        <StatsCard title="Delivery History" value={deliveryHistory} icon={History} />
      </div>
      <ParcelStatusChart parcels={parcels || []} />
    </div>
  );
}