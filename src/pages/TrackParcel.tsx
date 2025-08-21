import { useLazyTrackParcelByIdQuery } from "@/app/api/apiSlice";
// No longer need TParcel, so we remove it from the import
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Package, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';

const statusIcons = {
  pending: <Clock className="h-6 w-6 text-warning" />,
  'in-transit': <Truck className="h-6 w-6 text-info" />,
  delivered: <CheckCircle className="h-6 w-6 text-success" />,
  cancelled: <XCircle className="h-6 w-6 text-error" />,
  'picked-up': <Package className="h-6 w-6 text-info" />,
}

export default function TrackParcelPage() {
  const [trackingId, setTrackingId] = useState('');
  const [trigger, { data: parcel, isLoading, isError }] = useLazyTrackParcelByIdQuery();

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID.");
      return;
    }
    await trigger(trackingId.trim());
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Track Your Parcel</h1>
        <p className="mb-8">Enter your tracking ID below to see the latest status of your shipment.</p>
        <form onSubmit={handleTrack} className="flex gap-2 justify-center">
          <input
            type="text"
            placeholder="Enter Tracking ID (e.g., UT-123456...)"
            className="input input-bordered w-full max-w-md"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner"></span> : "Track"}
          </button>
        </form>
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        {isError && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Parcel not found. Please check the tracking ID and try again.</span>
          </div>
        )}
        {parcel && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Tracking Details for: <span className="font-mono">{parcel.trackingId}</span></h2>
              <p>Current Status: <span className="badge badge-lg badge-primary">{parcel.status}</span></p>
              
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-6">
                {parcel.statusHistory.map((log, index) => (
                   <li key={index}>
                    {index !== parcel.statusHistory.length - 1 && <hr/>}
                    <div className="timeline-middle">
                      {statusIcons[log.status as keyof typeof statusIcons]}
                    </div>
                    <div className={`timeline-${index % 2 === 0 ? 'start' : 'end'} md:text-end mb-10`}>
                      <time className="font-mono italic text-sm">{new Date(log.timestamp).toLocaleString()}</time>
                      <div className="text-lg font-black capitalize">{log.status.replace('-', ' ')}</div>
                      {log.notes && <p>{log.notes}</p>}
                    </div>
                    {index !== parcel.statusHistory.length - 1 && <hr/>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}