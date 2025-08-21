import { useCreateParcelMutation } from "@/app/api/apiSlice";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateParcel() {
  const [createParcel, { isLoading }] = useCreateParcelMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    receiverName: '',
    receiverPhoneNumber: '',
    receiverAddress: '',
    pickupAddress: '',
    parcelDescription: '',
    parcelWeight: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createParcel({
        ...formData,
        parcelWeight: parseFloat(formData.parcelWeight)
      }).unwrap();
      toast.success("Parcel created successfully!");
      navigate('/dashboard/my-parcels');
    } catch (err) {
      toast.error("Failed to create parcel.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a New Parcel</h1>
      <form onSubmit={handleSubmit} className="max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Receiver Info */}
        <div className="form-control md:col-span-2">
          <label className="label"><span className="label-text">Receiver Name</span></label>
          <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Receiver Phone</span></label>
          <input type="tel" name="receiverPhoneNumber" value={formData.receiverPhoneNumber} onChange={handleChange} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Receiver Address</span></label>
          <input type="text" name="receiverAddress" value={formData.receiverAddress} onChange={handleChange} className="input input-bordered" required />
        </div>
        
        {/* Parcel Info */}
        <div className="form-control">
          <label className="label"><span className="label-text">Pickup Address</span></label>
          <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Parcel Weight (kg)</span></label>
          <input type="number" name="parcelWeight" value={formData.parcelWeight} onChange={handleChange} className="input input-bordered" required min="0.1" step="0.1" />
        </div>
        <div className="form-control md:col-span-2">
          <label className="label"><span className="label-text">Parcel Description</span></label>
          <textarea name="parcelDescription" value={formData.parcelDescription} onChange={handleChange} className="textarea textarea-bordered h-24" required></textarea>
        </div>

        <div className="form-control md:col-span-2 mt-4">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner"></span> : "Create Parcel"}
          </button>
        </div>
      </form>
    </div>
  );
}