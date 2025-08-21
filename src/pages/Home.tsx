import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Fast, Reliable, Secure Delivery</h1>
            <p className="py-6">Your trusted partner for delivering parcels on time, every time. Track your package, manage your deliveries, and experience seamless logistics with Uthao.</p>
            <div className="flex justify-center gap-4">
               <Link to="/register" className="btn btn-primary">Get Started</Link>
               <Link to="/track" className="btn btn-outline">Track Parcel</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title justify-center">Real-Time Tracking</h3>
              <p>Know where your parcel is at every moment with our live tracking feature.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title justify-center">Secure Handling</h3>
              <p>We handle every package with the utmost care to ensure it arrives safely.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title justify-center">Role-Based Dashboards</h3>
              <p>Customized experiences for senders, receivers, and administrators.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}