import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        console.log("Form submitted:", formData);
        toast.success("Thank you for your message! We'll get back to you soon.");
        // Clear the form
        setFormData({ name: '', email: '', message: '' });
    };

  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Get in Touch!</h1>
          <p className="py-6">
            Have a question or feedback? We'd love to hear from you. Fill out the form, and our team will get back to you as soon as possible.
          </p>
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input type="text" name="name" placeholder="John Doe" className="input input-bordered" required value={formData.name} onChange={handleChange}/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required value={formData.email} onChange={handleChange} />
            </div>
             <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea name="message" placeholder="Your message..." className="textarea textarea-bordered h-24" required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}