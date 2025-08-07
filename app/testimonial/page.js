"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";

const initialTestimonials = [
  {
    img: "https://c.top4top.io/p_3506prg6k1.jpg",
    produk: "Jasa Claim Nitro Trial",
    customer: "Anonim",
    harga: "Rp 10.000",
    respon: "Cepat & Aman!",
    bintang: 5,
  },
  {
    img: "https://d.top4top.io/p_3506c5zjg2.jpg",
    produk: "Jasa Claim Nitro Trial",
    customer: "Anonim",
    harga: "Rp 10.000",
    respon: "Mantap, trusted!",
    bintang: 5,
  },
  {
    img: "https://e.top4top.io/p_3506l56gw3.jpg",
    produk: "Joki Quest Discord",
    customer: "Anonim",
    harga: "Rp 5.000",
    respon: "Selesai sesuai request!",
    bintang: 5,
  },
  {
    img: "https://f.top4top.io/p_3506vcfop4.jpg",
    produk: "Akun Telegram Old",
    customer: "Anonim",
    harga: "Rp 15.000",
    respon: "Akun ready, proses cepat!",
    bintang: 5,
  },
  {
    img: "https://g.top4top.io/p_35067ihh65.jpg",
    produk: "Joki Quest Discord",
    customer: "Anonim",
    harga: "Rp 5.000",
    respon: "Langsung selesai, recommended!",
    bintang: 5,
  },
  {
    img: "https://h.top4top.io/p_350653ezy6.jpg",
    produk: "Xbox Gamepass 1 Month",
    customer: "Anonim",
    harga: "Rp 20.000",
    respon: "Aman, murah, mantap!",
    bintang: 5,
  },
  {
    img: "https://i.top4top.io/p_350631men7.jpg",
    produk: "YT Premium 1 Month Invite",
    customer: "Anonim",
    harga: "Rp 10.000",
    respon: "Langsung masuk, trusted!",
    bintang: 5,
  },
];

export default function Testimoni() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [modal, setModal] = useState({ open: false, img: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    img: "",
    produk: "",
    customer: "",
    harga: "",
    respon: "",
    bintang: 5,
  });

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const addTestimoni = (e) => {
    e.preventDefault();
    if (!form.img || !form.produk || !form.customer || !form.harga || !form.respon) return;
    setTestimonials([form, ...testimonials]);
    setForm({ img: "", produk: "", customer: "", harga: "", respon: "", bintang: 5 });
  };

  const deleteTestimoni = (index) => {
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    setTestimonials(newTestimonials);
  };

  return (
    <div className="cyberpunk-bg min-h-screen flex flex-col justify-between">
      <main className="max-w-3xl mx-auto w-full py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="cyber-title text-4xl md:text-5xl font-bold">Ryven Store</h1>
          {isAdmin ? (
            <button onClick={handleLogout} className="cyber-btn-sm">Logout</button>
          ) : (
            <Link href="/testi/admin" className="text-cyber-accent hover:text-cyber-secondary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          )}
        </div>
        <p className="text-cyber-accent text-center mb-8 text-lg">Testimoni Customer</p>

        {isAdmin && (
          <>
            <div className="mb-10 p-4 rounded-xl border-2 border-cyber-accent bg-cyber-dark shadow-cyber">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyber-accent">Admin Panel</h2>
                <button onClick={handleLogout} className="cyber-btn">Logout</button>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={addTestimoni}>
            <input className="cyber-input" name="img" value={form.img} onChange={handleForm} placeholder="Link Foto Testimoni" required />
            <input className="cyber-input" name="produk" value={form.produk} onChange={handleForm} placeholder="Nama Produk" required />
            <input className="cyber-input" name="customer" value={form.customer} onChange={handleForm} placeholder="Nama Customer" required />
            <input className="cyber-input" name="harga" value={form.harga} onChange={handleForm} placeholder="Harga" required />
            <input className="cyber-input" name="respon" value={form.respon} onChange={handleForm} placeholder="Respon" required />
            <select className="cyber-input" name="bintang" value={form.bintang} onChange={handleForm}>
              {[5,4,3,2,1].map((b) => (
                <option key={b} value={b}>{b} Bintang</option>
              ))}
            </select>
            <button className="cyber-btn col-span-1 md:col-span-2 mt-2" type="submit">Tambah Testimoni</button>
          </form>
        </div>
          </>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="cyber-card p-4 rounded-xl relative">
              <div className="cursor-pointer group" onClick={() => setModal({ open: true, img: t.img })}>
                <img src={t.img} alt={t.produk} className="rounded-lg w-full h-48 object-cover cyber-img group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 right-2 bg-cyber-accent text-black text-xs px-2 py-1 rounded shadow">Preview</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-cyber-accent font-bold">{t.produk}</span>
                  <span className="text-cyber-price font-bold">{t.harga}</span>
                </div>
                <div className="text-white text-sm">{t.customer}</div>
                <div className="text-gray-300 text-xs mt-1">{t.respon}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: t.bintang }).map((_, idx) => (
                      <span key={idx} className="text-yellow-400">★</span>
                    ))}
                    {Array.from({ length: 5 - t.bintang }).map((_, idx) => (
                      <span key={idx} className="text-gray-600">★</span>
                    ))}
                  </div>
                  {isAdmin && (
                    <button onClick={() => deleteTestimoni(i)} className="delete-btn">
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {modal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setModal({ open: false, img: "" })}>
            <img src={modal.img} alt="Preview" className="max-w-full max-h-[80vh] rounded-xl border-4 border-cyber-accent shadow-cyber-lg animate__animated animate__zoomIn" />
          </div>
        )}
      </main>
      <footer className="w-full py-6 px-4 text-center border-t-2 border-cyber-accent bg-cyber-dark shadow-cyber mt-10">
        <div className="text-cyber-accent text-lg font-bold mb-2">Ikuti Kami</div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/628991103457" target="_blank" rel="noopener noreferrer" className="cyber-link hover:text-cyber-accent transition-colors"><i className="fab fa-whatsapp"></i> Whatsapp</a>
          <a href="https://instagram.com/fikrinrirham" target="_blank" rel="noopener noreferrer" className="cyber-link hover:text-cyber-accent transition-colors"><i className="fab fa-instagram"></i> Instagram</a>
        </div>
        <div className="mt-2 text-xs text-gray-400">&copy; {new Date().getFullYear()} Ryven Store. All rights reserved.</div>
      </footer>
    </div>
  );
}
