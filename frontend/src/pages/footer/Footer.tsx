

export default function Footer() {
  return (
<div className="max-w-5xl mx-auto px-4 py-12">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-slate-800 mb-4">About Us</h1>
    <p className="text-lg text-slate-600">
      Welcome to <span className="font-semibold text-blue-600">Aptigen Stays</span>, your trusted platform for
      seamless <span className="font-semibold">home rentals</span> and
      <span className="font-semibold"> hotel bookings</span>.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-3">Our Mission</h2>
      <p className="text-slate-600 leading-relaxed">
        We aim to simplify travel by connecting guests with comfortable, affordable, and verified
        accommodations. Whether you're booking a family vacation or a solo business trip, we ensure a secure
        and smooth experience.
      </p>
    </div>

    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md">
      <ul className="space-y-3 text-slate-700 text-base">
        <li>🏠 1000+ Verified Properties</li>
        <li>🛏️ Instant Hotel Bookings</li>
        <li>🔐 Secure Payment Gateway</li>
        <li>📞 24/7 Customer Support</li>
        <li>🌍 Trusted by travelers worldwide</li>
      </ul>
    </div>
  </div>

  <div className="mt-16 text-center">
    <h3 className="text-xl font-semibold text-slate-800 mb-2">Built by <span className="text-blue-600">Aptigen</span></h3>
    <p className="text-slate-600">
      Powered by advanced technology, automation, and AI – we’re redefining hospitality one stay at a time.
    </p>
  </div>
</div>

  )
}
