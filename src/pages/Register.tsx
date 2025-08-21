import { useRegisterMutation } from "@/app/api/apiSlice";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'sender', // Default role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">
            Join Uthao to send and receive parcels with ease.
          </p>
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name</span></label>
              <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Phone Number</span></label>
              <input type="tel" name="phoneNumber" placeholder="Phone Number" className="input input-bordered" required value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Register as a</span></label>
              <select name="role" className="select select-bordered" value={formData.role} onChange={handleChange}>
                <option value="sender">Sender</option>
                <option value="receiver">Receiver</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner"></span> : "Register"}
              </button>
            </div>
            <div className="text-center mt-4">
              <p>Already have an account? <Link to="/login" className="link link-primary">Login here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}