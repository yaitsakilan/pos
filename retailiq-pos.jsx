import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#5B4CDD",
  primaryLight: "#EEF0FF",
  primaryDark: "#3D2FA8",
  accent: "#10B981",
  accentLight: "#ECFDF5",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  danger: "#EF4444",
  dangerLight: "#FEF2F2",
  surface: "#FFFFFF",
  bg: "#F8F7FE",
  border: "#E8E6F0",
  text: "#1A1523",
  textMuted: "#6B6880",
  textLight: "#9D9AB0",
};

const mockProducts = [
  { id: 1, sku: "GR001", name: "Basmati Rice 5kg", category: "Grocery", stock: 142, purchasePrice: 280, sellingPrice: 340, status: "in_stock", brand: "India Gate", image: "🌾" },
  { id: 2, sku: "BV001", name: "Coca-Cola 2L", category: "Beverages", stock: 8, purchasePrice: 65, sellingPrice: 90, status: "low_stock", brand: "Coca-Cola", image: "🥤" },
  { id: 3, sku: "SN001", name: "Lays Classic 52g", category: "Snacks", stock: 0, purchasePrice: 15, sellingPrice: 20, status: "out_of_stock", brand: "Lays", image: "🍿" },
  { id: 4, sku: "DC001", name: "Amul Full Cream Milk 1L", category: "Dairy", stock: 56, purchasePrice: 58, sellingPrice: 68, status: "in_stock", brand: "Amul", image: "🥛" },
  { id: 5, sku: "PC001", name: "Colgate MaxFresh 150g", category: "Personal Care", stock: 23, purchasePrice: 78, sellingPrice: 105, status: "in_stock", brand: "Colgate", image: "🪥" },
  { id: 6, sku: "GR002", name: "Toor Dal 1kg", category: "Grocery", stock: 4, purchasePrice: 110, sellingPrice: 145, status: "low_stock", brand: "Tata Sampann", image: "🫘" },
  { id: 7, sku: "BV002", name: "Minute Maid Orange 1L", category: "Beverages", stock: 34, purchasePrice: 55, sellingPrice: 75, status: "in_stock", brand: "Coca-Cola", image: "🍊" },
  { id: 8, sku: "SN002", name: "Parle-G Biscuits 800g", category: "Snacks", stock: 88, purchasePrice: 50, sellingPrice: 65, status: "in_stock", brand: "Parle", image: "🍪" },
  { id: 9, sku: "DC002", name: "Amul Butter 500g", category: "Dairy", stock: 15, purchasePrice: 220, sellingPrice: 265, status: "in_stock", brand: "Amul", image: "🧈" },
  { id: 10, sku: "PC002", name: "Dove Soap 100g", category: "Personal Care", stock: 62, purchasePrice: 42, sellingPrice: 58, status: "in_stock", brand: "Dove", image: "🧼" },
  { id: 11, sku: "GR003", name: "Sunflower Oil 5L", category: "Grocery", stock: 29, purchasePrice: 620, sellingPrice: 750, status: "in_stock", brand: "Fortune", image: "🛢️" },
  { id: 12, sku: "BV003", name: "Red Bull 250ml", category: "Beverages", stock: 3, purchasePrice: 95, sellingPrice: 130, status: "low_stock", brand: "Red Bull", image: "⚡" },
];

const mockCustomers = [
  { id: 1, name: "Priya Sharma", mobile: "9876543210", email: "priya@email.com", totalPurchases: 45680, lastVisit: "2026-06-12", loyaltyPoints: 456, outstanding: 0 },
  { id: 2, name: "Rahul Verma", mobile: "9988776655", email: "rahul@email.com", totalPurchases: 23400, lastVisit: "2026-06-10", loyaltyPoints: 234, outstanding: 1200 },
  { id: 3, name: "Anita Patel", mobile: "9123456789", email: "anita@email.com", totalPurchases: 87320, lastVisit: "2026-06-13", loyaltyPoints: 873, outstanding: 0 },
  { id: 4, name: "Vikram Singh", mobile: "9654321098", email: "vikram@email.com", totalPurchases: 12500, lastVisit: "2026-06-08", loyaltyPoints: 125, outstanding: 500 },
  { id: 5, name: "Meera Nair", mobile: "9741852963", email: "meera@email.com", totalPurchases: 65200, lastVisit: "2026-06-11", loyaltyPoints: 652, outstanding: 0 },
];

const mockSuppliers = [
  { id: 1, name: "ABC Distributors", contact: "Suresh Kumar", mobile: "9811223344", products: 45, outstanding: 125000, rating: 4.8 },
  { id: 2, name: "Metro Wholesale", contact: "Deepak Gupta", mobile: "9922334455", products: 28, outstanding: 48000, rating: 4.2 },
  { id: 3, name: "Fresh Farm Direct", contact: "Rajesh Yadav", mobile: "9833445566", products: 16, outstanding: 0, rating: 4.6 },
  { id: 4, name: "National Beverages", contact: "Anil Sharma", mobile: "9744556677", products: 32, outstanding: 85000, rating: 3.9 },
];

const mockTransactions = [
  { id: "INV-2026-1284", customer: "Priya Sharma", items: 8, total: 1245, payment: "UPI", time: "14:32", status: "completed" },
  { id: "INV-2026-1283", customer: "Walk-in Customer", items: 3, total: 456, payment: "Cash", time: "14:18", status: "completed" },
  { id: "INV-2026-1282", customer: "Rahul Verma", items: 12, total: 2890, payment: "Card", time: "13:55", status: "completed" },
  { id: "INV-2026-1281", customer: "Anita Patel", items: 5, total: 780, payment: "UPI", time: "13:40", status: "completed" },
  { id: "INV-2026-1280", customer: "Walk-in Customer", items: 2, total: 215, payment: "Cash", time: "13:22", status: "completed" },
];

const mockEmployees = [
  { id: 1, name: "Kavitha Reddy", role: "Store Manager", store: "HSR Layout", sales: 284500, attendance: "98%", status: "active" },
  { id: 2, name: "Arjun Das", role: "Cashier", store: "HSR Layout", sales: 142300, attendance: "95%", status: "active" },
  { id: 3, name: "Sunita Roy", role: "Cashier", store: "Koramangala", sales: 198700, attendance: "92%", status: "active" },
  { id: 4, name: "Mohit Jain", role: "Accountant", store: "Head Office", sales: 0, attendance: "100%", status: "active" },
];

const mockPOs = [
  { id: "PO-2026-001", supplier: "ABC Distributors", date: "2026-06-10", total: 125000, status: "approved", items: 12 },
  { id: "PO-2026-002", supplier: "Metro Wholesale", date: "2026-06-11", total: 48500, status: "pending", items: 8 },
  { id: "PO-2026-003", supplier: "Fresh Farm Direct", date: "2026-06-12", total: 22000, status: "delivered", items: 5 },
  { id: "PO-2026-004", supplier: "National Beverages", date: "2026-06-13", total: 67000, status: "pending", items: 15 },
];

const expenseData = [
  { category: "Rent", amount: 85000, icon: "🏢" },
  { category: "Salaries", amount: 245000, icon: "👥" },
  { category: "Electricity", amount: 18500, icon: "⚡" },
  { category: "Internet", amount: 3500, icon: "🌐" },
  { category: "Miscellaneous", amount: 12400, icon: "📦" },
];

const revenueData = [42000, 58000, 71000, 65000, 89000, 95000, 112000, 98000, 124560, 108000, 142000, 158000];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatINR(n) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + "Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  if (n >= 1000) return "₹" + n.toLocaleString("en-IN");
  return "₹" + n;
}

function Badge({ status }) {
  const styles = {
    in_stock: { bg: "#ECFDF5", color: "#065F46", label: "In Stock" },
    low_stock: { bg: "#FFFBEB", color: "#92400E", label: "Low Stock" },
    out_of_stock: { bg: "#FEF2F2", color: "#991B1B", label: "Out of Stock" },
    approved: { bg: "#ECFDF5", color: "#065F46", label: "Approved" },
    pending: { bg: "#FFFBEB", color: "#92400E", label: "Pending" },
    delivered: { bg: "#EEF0FF", color: "#3D2FA8", label: "Delivered" },
    completed: { bg: "#ECFDF5", color: "#065F46", label: "Completed" },
    active: { bg: "#ECFDF5", color: "#065F46", label: "Active" },
  };
  const s = styles[status] || { bg: "#F3F4F6", color: "#374151", label: status };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>
      {s.label}
    </span>
  );
}

function KPICard({ label, value, sub, icon, color }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
        <span style={{ fontSize: 20, opacity: 0.7 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || COLORS.text, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: COLORS.textLight }}>{sub}</div>}
    </div>
  );
}

function MiniBarChart({ data, labels, color }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: "100%", background: color, borderRadius: "3px 3px 0 0", height: `${(v / max) * 50}px`, opacity: i === data.length - 1 ? 1 : 0.4, transition: "height 0.5s ease" }} />
          <span style={{ fontSize: 9, color: COLORS.textLight }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ==================== LANDING PAGE ====================
function LandingPage({ onEnterApp }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const features = [
    { icon: "🧾", title: "POS Billing", desc: "Lightning-fast billing with barcode scanning, multiple payment modes, and GST-ready invoices." },
    { icon: "📦", title: "Inventory Management", desc: "Real-time stock tracking with batch, expiry, and multi-location support." },
    { icon: "📋", title: "Purchase Orders", desc: "Streamlined PO workflow with supplier selection, approval chains, and GRN." },
    { icon: "📊", title: "Sales Reports", desc: "Deep analytics with daily, weekly, monthly reports and custom date ranges." },
    { icon: "👥", title: "Customer Management", desc: "CRM with loyalty programs, purchase history, and outstanding balance tracking." },
    { icon: "🏭", title: "Supplier Management", desc: "Manage suppliers, track payments, and analyze vendor performance." },
    { icon: "📱", title: "Barcode Scanning", desc: "Scan products instantly with built-in barcode reader support." },
    { icon: "💸", title: "Expense Tracking", desc: "Log and categorize all business expenses with monthly analytics." },
    { icon: "🧮", title: "GST Billing", desc: "Fully GST-compliant billing with CGST, SGST, IGST auto-calculation." },
    { icon: "🏪", title: "Multi-Store", desc: "Manage multiple stores from a single dashboard with consolidated reports." },
    { icon: "👔", title: "Employee Management", desc: "Track attendance, sales performance, and roles across all staff." },
    { icon: "📈", title: "Analytics Center", desc: "Advanced charts and insights to drive smarter business decisions." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#FAFAFA", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: scrolled ? "rgba(255,255,255,0.95)" : "transparent", backdropFilter: "blur(12px)", borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: COLORS.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>R</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.text, letterSpacing: "-0.02em" }}>RetailIQ</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onEnterApp} style={{ background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 14, cursor: "pointer", color: COLORS.textMuted }}>Sign In</button>
          <button onClick={onEnterApp} style={{ background: COLORS.primary, border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, cursor: "pointer", color: "#fff", fontWeight: 600 }}>Start Free Trial</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 5% 60px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.primaryLight, border: `1px solid ${COLORS.primary}30`, borderRadius: 99, padding: "4px 14px", marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, background: COLORS.accent, borderRadius: "50%", display: "inline-block" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>Now with AI-powered analytics</span>
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: COLORS.text, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
          Everything Your Business Needs<br />
          <span style={{ color: COLORS.primary }}>To Sell, Track, And Grow</span>
        </h1>
        <p style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>
          POS Billing, Inventory Management, Purchase Orders, Sales Analytics, Customer Management, and Multi-Store Operations — in one platform.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onEnterApp} style={{ background: COLORS.primary, border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, cursor: "pointer", color: "#fff", fontWeight: 700, boxShadow: `0 4px 24px ${COLORS.primary}40` }}>
            🚀 Start Free Demo
          </button>
          <button onClick={onEnterApp} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "14px 28px", fontSize: 15, cursor: "pointer", color: COLORS.text, fontWeight: 600 }}>
            ▶ Watch Product Tour
          </button>
        </div>

        {/* Dashboard Preview */}
        <div style={{ marginTop: 60, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, boxShadow: "0 20px 80px rgba(91,76,221,0.12)", textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { l: "Today's Sales", v: "₹1,24,560", c: COLORS.primary },
              { l: "Monthly Revenue", v: "₹18,42,300", c: COLORS.accent },
              { l: "Orders", v: "1,284", c: COLORS.warning },
              { l: "Active Customers", v: "8,432", c: "#8B5CF6" },
            ].map((k, i) => (
              <div key={i} style={{ background: COLORS.bg, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 500, marginBottom: 6 }}>{k.l}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: k.c }}>{k.v}</div>
              </div>
            ))}
          </div>
          <MiniBarChart data={revenueData} labels={months} color={COLORS.primary} />
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "60px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: COLORS.text, letterSpacing: "-0.02em", marginBottom: 12 }}>Everything in one platform</h2>
            <p style={{ fontSize: 16, color: COLORS.textMuted }}>12 powerful modules to run your entire retail business</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.primary}15`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text, marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section style={{ padding: "60px 5%", background: COLORS.bg, textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: COLORS.text, marginBottom: 12 }}>Transparent Pricing</h2>
        <p style={{ color: COLORS.textMuted, marginBottom: 36 }}>Start free. Scale as you grow.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {[
            { plan: "Starter", price: "₹999/mo", stores: "1 Store", features: ["POS Billing", "Inventory", "Basic Reports"] },
            { plan: "Growth", price: "₹2,499/mo", stores: "3 Stores", features: ["All Starter +", "Purchase Orders", "Customer CRM", "GST Reports"], popular: true },
            { plan: "Enterprise", price: "Custom", stores: "Unlimited Stores", features: ["All Growth +", "Analytics AI", "API Access", "Dedicated Support"] },
          ].map((p, i) => (
            <div key={i} style={{ background: "#fff", border: p.popular ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`, borderRadius: 14, padding: 24, position: "relative" }}>
              {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: COLORS.primary, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99 }}>MOST POPULAR</div>}
              <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.text }}>{p.plan}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.primary, margin: "8px 0", letterSpacing: "-0.02em" }}>{p.price}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>{p.stores}</div>
              {p.features.map((f, j) => (
                <div key={j} style={{ display: "flex", gap: 8, fontSize: 13, color: COLORS.textMuted, marginBottom: 6 }}>
                  <span style={{ color: COLORS.accent }}>✓</span> {f}
                </div>
              ))}
              <button onClick={onEnterApp} style={{ marginTop: 16, width: "100%", background: p.popular ? COLORS.primary : "transparent", border: `1px solid ${p.popular ? COLORS.primary : COLORS.border}`, color: p.popular ? "#fff" : COLORS.text, borderRadius: 8, padding: "10px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 5%", background: COLORS.primary, textAlign: "center" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Ready to transform your retail business?</h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 32 }}>Join 5,000+ stores already using RetailIQ</p>
        <button onClick={onEnterApp} style={{ background: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 16, cursor: "pointer", color: COLORS.primary, fontWeight: 700 }}>
          Open Dashboard →
        </button>
      </section>
    </div>
  );
}

// ==================== MAIN APP ====================
function App() {
  const [view, setView] = useState("landing");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [posCategory, setPosCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (view === "landing") return <LandingPage onEnterApp={() => setView("app")} />;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "pos", label: "POS Billing", icon: "🧾" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "purchases", label: "Purchase Orders", icon: "📋" },
    { id: "reports", label: "Sales Reports", icon: "📈" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "suppliers", label: "Suppliers", icon: "🏭" },
    { id: "employees", label: "Employees", icon: "👔" },
    { id: "expenses", label: "Expenses", icon: "💸" },
    { id: "analytics", label: "Analytics", icon: "🔬" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", background: COLORS.bg, overflow: "hidden" }}>
      {/* NOTIFICATION */}
      {notification && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: notification.type === "success" ? COLORS.accent : COLORS.danger, color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", animation: "slideIn 0.3s ease" }}>
          {notification.type === "success" ? "✓" : "✕"} {notification.msg}
        </div>
      )}

      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 220 : 64, background: "#fff", borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
            <div style={{ width: 32, height: 32, background: COLORS.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>R</div>
            {sidebarOpen && <span style={{ fontWeight: 700, fontSize: 16, color: COLORS.text, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>RetailIQ</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: COLORS.textMuted, padding: 4, flexShrink: 0 }}>
            {sidebarOpen ? "◂" : "▸"}
          </button>
        </div>

        {sidebarOpen && (
          <div style={{ padding: "10px 12px", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ background: COLORS.bg, borderRadius: 8, padding: "6px 10px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, color: COLORS.textLight }}>🏪</span>
              <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>HSR Layout Store</span>
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: "8px", overflowY: "auto" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveModule(item.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: sidebarOpen ? "10px 12px" : "10px", borderRadius: 8, border: "none", background: activeModule === item.id ? COLORS.primaryLight : "transparent", color: activeModule === item.id ? COLORS.primary : COLORS.textMuted, fontSize: 13, fontWeight: activeModule === item.id ? 600 : 400, cursor: "pointer", textAlign: "left", transition: "all 0.15s", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ padding: 12, borderTop: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, background: "#EEF0FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: COLORS.primary }}>KR</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Kavitha Reddy</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>Store Manager</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOP BAR */}
        <div style={{ background: "#fff", borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>
              {navItems.find(n => n.id === activeModule)?.label}
            </span>
            <span style={{ fontSize: 12, color: COLORS.textLight }}>/</span>
            <span style={{ fontSize: 12, color: COLORS.textMuted }}>HSR Layout</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 12px", display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 14 }}>🔍</span>
              <input placeholder="Search anything..." style={{ border: "none", background: "transparent", fontSize: 13, color: COLORS.text, outline: "none", width: 160 }} />
            </div>
            <div style={{ position: "relative" }}>
              <button style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 16 }}>🔔</button>
              <span style={{ position: "absolute", top: -4, right: -4, background: COLORS.danger, color: "#fff", fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
            </div>
            <button onClick={() => setView("landing")} style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: COLORS.textMuted }}>← Landing</button>
          </div>
        </div>

        {/* MODULE CONTENT */}
        <div style={{ flex: 1, overflow: "auto" }}>
          {activeModule === "dashboard" && <Dashboard setActiveModule={setActiveModule} />}
          {activeModule === "pos" && <POSBilling cartItems={cartItems} setCartItems={setCartItems} posCategory={posCategory} setPosCategory={setPosCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} showNotif={showNotif} paymentModal={paymentModal} setPaymentModal={setPaymentModal} />}
          {activeModule === "inventory" && <InventoryModule showNotif={showNotif} />}
          {activeModule === "purchases" && <PurchaseOrders showNotif={showNotif} />}
          {activeModule === "reports" && <SalesReports />}
          {activeModule === "customers" && <CustomerManagement selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />}
          {activeModule === "suppliers" && <SupplierManagement />}
          {activeModule === "employees" && <EmployeeManagement />}
          {activeModule === "expenses" && <ExpenseManagement />}
          {activeModule === "analytics" && <AnalyticsCenter />}
        </div>
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  );
}

// ==================== DASHBOARD ====================
function Dashboard({ setActiveModule }) {
  const kpis = [
    { label: "Today's Sales", value: "₹1,24,560", sub: "↑ 12% vs yesterday", icon: "💰", color: COLORS.primary },
    { label: "Monthly Revenue", value: "₹18,42,300", sub: "↑ 8% vs last month", icon: "📈", color: COLORS.accent },
    { label: "Orders Today", value: "1,284", sub: "284 pending", icon: "🛒", color: COLORS.warning },
    { label: "Total Products", value: "2,564", sub: "34 low stock", icon: "📦", color: "#8B5CF6" },
    { label: "Low Stock Items", value: "34", sub: "Action needed", icon: "⚠️", color: COLORS.danger },
    { label: "Active Customers", value: "8,432", sub: "128 new this month", icon: "👥", color: "#06B6D4" },
  ];

  const topProducts = [
    { name: "Basmati Rice 5kg", sales: 8420, qty: 320, trend: "+12%" },
    { name: "Amul Full Cream Milk", sales: 6380, qty: 940, trend: "+5%" },
    { name: "Sunflower Oil 5L", sales: 5650, qty: 180, trend: "+18%" },
    { name: "Colgate MaxFresh", sales: 4280, qty: 408, trend: "+3%" },
    { name: "Parle-G Biscuits", sales: 3900, qty: 600, trend: "-2%" },
  ];

  const storePerf = [
    { store: "HSR Layout", sales: 524000, orders: 428, growth: "+15%" },
    { store: "Koramangala", sales: 489000, orders: 392, growth: "+9%" },
    { store: "Indiranagar", sales: 412000, orders: 344, growth: "+22%" },
    { store: "BTM Layout", sales: 318000, orders: 281, growth: "-3%" },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {kpis.map((k, i) => <KPICard key={i} {...k} />)}
      </div>

      {/* Revenue Chart */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 16 }}>Revenue Overview</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Monthly performance this year</div>
            </div>
            <select style={{ fontSize: 12, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "4px 8px", color: COLORS.textMuted, background: "#fff" }}>
              <option>2026</option><option>2025</option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
            {revenueData.map((v, i) => {
              const max = Math.max(...revenueData);
              const h = Math.round((v / max) * 120);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", background: i === 8 ? COLORS.primary : `${COLORS.primary}40`, borderRadius: "4px 4px 0 0", height: h, transition: "height 0.6s ease", cursor: "pointer" }}
                    title={`${months[i]}: ₹${(v / 100000).toFixed(1)}L`} />
                  <span style={{ fontSize: 9, color: COLORS.textLight }}>{months[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 4 }}>Payment Split</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>Today's transactions</div>
          {[
            { mode: "UPI", pct: 45, color: COLORS.primary, val: "₹56,052" },
            { mode: "Cash", pct: 30, color: COLORS.accent, val: "₹37,368" },
            { mode: "Card", pct: 20, color: COLORS.warning, val: "₹24,912" },
            { mode: "Split", pct: 5, color: "#8B5CF6", val: "₹6,228" },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: COLORS.textMuted, fontWeight: 500 }}>{p.mode}</span>
                <span style={{ color: COLORS.text, fontWeight: 600 }}>{p.val}</span>
              </div>
              <div style={{ height: 6, background: COLORS.bg, borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${p.pct}%`, background: p.color, borderRadius: 99, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Top Products */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 16 }}>Top Products</div>
          {topProducts.map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < topProducts.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 28, height: 28, background: COLORS.primaryLight, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: COLORS.primary }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{p.qty} units sold</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>₹{p.sales.toLocaleString("en-IN")}</div>
                <div style={{ fontSize: 11, color: p.trend.startsWith("+") ? COLORS.accent : COLORS.danger }}>{p.trend}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 16 }}>Recent Transactions</div>
          {mockTransactions.map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < mockTransactions.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{t.id}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{t.customer} · {t.time}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>₹{t.total}</div>
                <Badge status={t.status} />
              </div>
            </div>
          ))}
        </div>

        {/* Store Performance */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 16 }}>Store Performance</div>
          {storePerf.map((s, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < storePerf.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{s.store}</div>
                <div style={{ fontSize: 11, color: s.growth.startsWith("+") ? COLORS.accent : COLORS.danger, fontWeight: 600 }}>{s.growth}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.textMuted }}>
                <span>₹{(s.sales / 100000).toFixed(1)}L sales</span>
                <span>{s.orders} orders</span>
              </div>
              <div style={{ height: 4, background: COLORS.bg, borderRadius: 99, marginTop: 6 }}>
                <div style={{ height: "100%", width: `${(s.sales / 600000) * 100}%`, background: COLORS.primary, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== POS BILLING ====================
function POSBilling({ cartItems, setCartItems, posCategory, setPosCategory, searchQuery, setSearchQuery, showNotif, paymentModal, setPaymentModal }) {
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [discount, setDiscount] = useState(0);

  const categories = ["All", "Grocery", "Beverages", "Snacks", "Personal Care", "Dairy"];
  const filtered = mockProducts.filter(p =>
    (posCategory === "All" || p.category === posCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToCart = (product) => {
    if (product.stock === 0) { showNotif("Product out of stock!", "error"); return; }
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i);
      return updated.filter(i => i.qty > 0);
    });
  };

  const subtotal = cartItems.reduce((s, i) => s + i.sellingPrice * i.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const discountAmt = Math.round(subtotal * discount / 100);
  const total = subtotal + gst - discountAmt;

  const completeSale = () => {
    setPaymentModal(false);
    setCartItems([]);
    setDiscount(0);
    showNotif(`Sale completed! Invoice INV-2026-1285 generated for ₹${total.toLocaleString("en-IN")}`);
  };

  return (
    <div style={{ display: "flex", height: "100%", gap: 0 }}>
      {/* LEFT: Product Selector */}
      <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Search */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by product name or SKU..." style={{ border: "none", background: "transparent", fontSize: 14, color: COLORS.text, outline: "none", flex: 1 }} />
          <span style={{ fontSize: 20, cursor: "pointer", color: COLORS.textMuted }}>📷</span>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setPosCategory(c)} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${posCategory === c ? COLORS.primary : COLORS.border}`, background: posCategory === c ? COLORS.primaryLight : "#fff", color: posCategory === c ? COLORS.primary : COLORS.textMuted, fontSize: 13, fontWeight: posCategory === c ? 600 : 400, cursor: "pointer" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
          {filtered.map(p => (
            <button key={p.id} onClick={() => addToCart(p)} style={{ background: "#fff", border: `1px solid ${p.stock === 0 ? COLORS.border : COLORS.border}`, borderRadius: 10, padding: 14, textAlign: "left", cursor: p.stock === 0 ? "not-allowed" : "pointer", opacity: p.stock === 0 ? 0.5 : 1, transition: "all 0.15s" }}
              onMouseEnter={e => { if (p.stock > 0) { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.transform = "translateY(-1px)"; }}}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "none"; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.image}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>{p.sku}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.primary }}>₹{p.sellingPrice}</span>
                <Badge status={p.status} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Cart */}
      <div style={{ width: 340, background: "#fff", borderLeft: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Cart Header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>Current Bill</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>INV-2026-1285</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ fontSize: 11, background: COLORS.primaryLight, color: COLORS.primary, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>Hold</button>
            <button onClick={() => setCartItems([])} style={{ fontSize: 11, background: COLORS.dangerLight, color: COLORS.danger, border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>Clear</button>
          </div>
        </div>

        {/* Customer */}
        <div style={{ padding: "10px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 14 }}>👤</span>
          <span style={{ fontSize: 13, color: COLORS.textMuted }}>Walk-in Customer</span>
          <button style={{ marginLeft: "auto", fontSize: 11, color: COLORS.primary, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Add</button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: COLORS.textLight }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
              <div style={{ fontSize: 13 }}>Scan or tap a product to start billing</div>
            </div>
          ) : cartItems.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{item.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>₹{item.sellingPrice} × {item.qty}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${COLORS.border}`, background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, minWidth: 56, textAlign: "right" }}>₹{(item.sellingPrice * item.qty).toLocaleString("en-IN")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${COLORS.border}` }}>
          {[
            { label: "Subtotal", value: `₹${subtotal.toLocaleString("en-IN")}` },
            { label: "GST (18%)", value: `₹${gst.toLocaleString("en-IN")}` },
            { label: "Discount", value: `-₹${discountAmt.toLocaleString("en-IN")}`, action: true },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>
              <span>{row.label} {row.action && <select value={discount} onChange={e => setDiscount(+e.target.value)} style={{ fontSize: 11, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "1px 4px" }}>{[0, 5, 10, 15, 20].map(d => <option key={d}>{d}%</option>)}</select>}</span>
              <span style={{ color: row.label === "Discount" ? COLORS.accent : COLORS.textMuted }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: COLORS.text, padding: "10px 0 0", borderTop: `1px solid ${COLORS.border}`, marginTop: 6 }}>
            <span>Total</span>
            <span style={{ color: COLORS.primary }}>₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Payment Modes */}
        <div style={{ padding: "0 20px 12px" }}>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Payment Mode</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {["Cash", "UPI", "Card", "Split"].map(m => (
              <button key={m} onClick={() => setPaymentMode(m)} style={{ padding: "8px", borderRadius: 8, border: `1px solid ${paymentMode === m ? COLORS.primary : COLORS.border}`, background: paymentMode === m ? COLORS.primaryLight : "#fff", color: paymentMode === m ? COLORS.primary : COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {m === "Cash" ? "💵" : m === "UPI" ? "📲" : m === "Card" ? "💳" : "🔀"} {m}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={() => { if (cartItems.length === 0) { showNotif("Add items to cart first!", "error"); return; } setPaymentModal(true); }} style={{ width: "100%", background: COLORS.primary, border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
            ✓ Complete Sale — ₹{total.toLocaleString("en-IN")}
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, fontSize: 12, cursor: "pointer", color: COLORS.textMuted, fontWeight: 600 }}>📌 Hold Bill</button>
            <button style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, fontSize: 12, cursor: "pointer", color: COLORS.textMuted, fontWeight: 600 }}>🖨 Print</button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {paymentModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📲</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: COLORS.text }}>Confirm Payment</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 4 }}>via {paymentMode}</div>
            </div>
            <div style={{ background: COLORS.bg, borderRadius: 10, padding: 16, marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.primary }}>₹{total.toLocaleString("en-IN")}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>{cartItems.length} items · Invoice INV-2026-1285</div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setPaymentModal(false)} style={{ flex: 1, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 12, fontSize: 14, cursor: "pointer", color: COLORS.textMuted, fontWeight: 600 }}>Cancel</button>
              <button onClick={completeSale} style={{ flex: 2, background: COLORS.accent, border: "none", borderRadius: 8, padding: 12, fontSize: 14, cursor: "pointer", color: "#fff", fontWeight: 700 }}>✓ Confirm Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== INVENTORY ====================
function InventoryModule({ showNotif }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCat, setFilterCat] = useState("all");

  const filtered = mockProducts.filter(p =>
    (filterStatus === "all" || p.status === filterStatus) &&
    (filterCat === "all" || p.category === filterCat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = {
    total: mockProducts.length,
    inStock: mockProducts.filter(p => p.status === "in_stock").length,
    lowStock: mockProducts.filter(p => p.status === "low_stock").length,
    outOfStock: mockProducts.filter(p => p.status === "out_of_stock").length,
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KPICard label="Total Products" value={stats.total} icon="📦" />
        <KPICard label="In Stock" value={stats.inStock} icon="✅" color={COLORS.accent} />
        <KPICard label="Low Stock" value={stats.lowStock} icon="⚠️" color={COLORS.warning} />
        <KPICard label="Out of Stock" value={stats.outOfStock} icon="🚫" color={COLORS.danger} />
      </div>

      <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, background: COLORS.bg, borderRadius: 8, padding: "8px 12px", display: "flex", gap: 8, alignItems: "center" }}>
            <span>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ border: "none", background: "transparent", fontSize: 13, outline: "none", flex: 1 }} />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ fontSize: 13, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", background: "#fff" }}>
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ fontSize: 13, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", background: "#fff" }}>
            <option value="all">All Categories</option>
            {["Grocery", "Beverages", "Snacks", "Dairy", "Personal Care"].map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => showNotif("New product form opened")} style={{ background: COLORS.primary, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>+ Add Product</button>
          <button onClick={() => showNotif("Exported to Excel")} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: COLORS.textMuted, cursor: "pointer" }}>📥 Export</button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: COLORS.bg }}>
                {["SKU", "Product", "Category", "Stock", "Purchase ₹", "Selling ₹", "Margin", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const margin = Math.round(((p.sellingPrice - p.purchasePrice) / p.purchasePrice) * 100);
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "12px 16px", color: COLORS.textMuted, fontFamily: "monospace" }}>{p.sku}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 20 }}>{p.image}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: COLORS.text }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: COLORS.textMuted }}>{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{p.category}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontWeight: 700, color: p.stock === 0 ? COLORS.danger : p.stock < 10 ? COLORS.warning : COLORS.text }}>{p.stock}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>₹{p.purchasePrice}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: COLORS.text }}>₹{p.sellingPrice}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ color: margin > 20 ? COLORS.accent : COLORS.warning, fontWeight: 600 }}>{margin}%</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}><Badge status={p.status} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => showNotif(`Editing ${p.name}`)} style={{ background: COLORS.primaryLight, color: COLORS.primary, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Edit</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ padding: "12px 20px", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textMuted }}>
          <span>Showing {filtered.length} of {mockProducts.length} products</span>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3].map(n => <button key={n} style={{ width: 28, height: 28, border: `1px solid ${n === 1 ? COLORS.primary : COLORS.border}`, borderRadius: 6, background: n === 1 ? COLORS.primary : "#fff", color: n === 1 ? "#fff" : COLORS.textMuted, fontSize: 12, cursor: "pointer" }}>{n}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PURCHASE ORDERS ====================
function PurchaseOrders({ showNotif }) {
  const [selected, setSelected] = useState(null);

  const poItems = [
    { sku: "GR001", product: "Basmati Rice 5kg", qty: 100, rate: 280, total: 28000 },
    { sku: "GR002", product: "Toor Dal 1kg", qty: 200, rate: 110, total: 22000 },
    { sku: "GR003", product: "Sunflower Oil 5L", qty: 50, rate: 620, total: 31000 },
    { sku: "BV001", product: "Coca-Cola 2L", qty: 120, rate: 65, total: 7800 },
    { sku: "DC001", product: "Amul Full Cream Milk 1L", qty: 300, rate: 58, total: 17400 },
    { sku: "PC001", product: "Colgate MaxFresh 150g", qty: 150, rate: 78, total: 11700 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KPICard label="Total POs" value="28" icon="📋" />
        <KPICard label="Pending" value="8" icon="⏳" color={COLORS.warning} />
        <KPICard label="This Month" value="₹4.2L" icon="💰" color={COLORS.accent} />
        <KPICard label="Avg Lead Time" value="3.2 days" icon="🚚" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 20 }}>
        {/* PO List */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15 }}>Purchase Orders</div>
            <button onClick={() => showNotif("New PO created: PO-2026-005")} style={{ background: COLORS.primary, border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer" }}>+ Create PO</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: COLORS.bg }}>
                {["PO Number", "Supplier", "Date", "Items", "Total", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPOs.map(po => (
                <tr key={po.id} style={{ borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer", background: selected?.id === po.id ? COLORS.primaryLight : "transparent" }}
                  onClick={() => setSelected(selected?.id === po.id ? null : po)}
                  onMouseEnter={e => { if (selected?.id !== po.id) e.currentTarget.style.background = COLORS.bg; }}
                  onMouseLeave={e => { if (selected?.id !== po.id) e.currentTarget.style.background = "transparent"; }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: COLORS.primary, fontFamily: "monospace" }}>{po.id}</td>
                  <td style={{ padding: "12px 16px", color: COLORS.text }}>{po.supplier}</td>
                  <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{po.date}</td>
                  <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{po.items}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: COLORS.text }}>₹{po.total.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={po.status} /></td>
                  <td style={{ padding: "12px 16px" }}>
                    <button onClick={e => { e.stopPropagation(); setSelected(po); }} style={{ background: "none", border: "none", color: COLORS.primary, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PO Detail */}
        {selected && (
          <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700, color: COLORS.primary, fontSize: 16, fontFamily: "monospace" }}>{selected.id}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{selected.date} · {selected.supplier}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge status={selected.status} />
                {selected.status === "pending" && (
                  <button onClick={() => { showNotif(`${selected.id} approved!`); setSelected({ ...selected, status: "approved" }); }} style={{ background: COLORS.accent, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#fff", cursor: "pointer", fontWeight: 600 }}>Approve</button>
                )}
              </div>
            </div>

            {/* Supplier Info */}
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bg }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontSize: 12 }}>
                <div><div style={{ color: COLORS.textMuted }}>Supplier</div><div style={{ fontWeight: 600, color: COLORS.text }}>{selected.supplier}</div></div>
                <div><div style={{ color: COLORS.textMuted }}>Expected Delivery</div><div style={{ fontWeight: 600, color: COLORS.text }}>2026-06-17</div></div>
                <div><div style={{ color: COLORS.textMuted }}>Payment Terms</div><div style={{ fontWeight: 600, color: COLORS.text }}>Net 30</div></div>
              </div>
            </div>

            {/* Line Items */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: COLORS.bg }}>
                    {["SKU", "Product", "Qty", "Rate", "Total"].map(h => (
                      <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontWeight: 600, color: COLORS.textMuted, fontSize: 11 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {poItems.map((item, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: "10px 14px", fontFamily: "monospace", color: COLORS.textMuted }}>{item.sku}</td>
                      <td style={{ padding: "10px 14px", color: COLORS.text, fontWeight: 500 }}>{item.product}</td>
                      <td style={{ padding: "10px 14px", color: COLORS.textMuted }}>{item.qty}</td>
                      <td style={{ padding: "10px 14px", color: COLORS.textMuted }}>₹{item.rate}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 700, color: COLORS.text }}>₹{item.total.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: "16px 20px", borderTop: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                {[["Subtotal", "₹1,17,900"], ["GST (18%)", "₹21,222"], ["Grand Total", "₹1,39,122"]].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", gap: 32, fontSize: i === 2 ? 15 : 13, fontWeight: i === 2 ? 800 : 400, color: i === 2 ? COLORS.primary : COLORS.textMuted }}>
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button onClick={() => showNotif("PO exported to PDF")} style={{ flex: 1, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 10, fontSize: 12, cursor: "pointer", color: COLORS.textMuted, fontWeight: 600 }}>📄 Export PDF</button>
                <button onClick={() => showNotif("PO sent to supplier")} style={{ flex: 1, background: COLORS.primary, border: "none", borderRadius: 8, padding: 10, fontSize: 12, cursor: "pointer", color: "#fff", fontWeight: 700 }}>📧 Send to Supplier</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== SALES REPORTS ====================
function SalesReports() {
  const [period, setPeriod] = useState("monthly");
  const [reportType, setReportType] = useState("sales");

  const dailyData = [8420, 12350, 9800, 14200, 11600, 13400, 15800, 12900, 16200, 14800, 11200, 18600, 15400, 13200, 17800];

  return (
    <div style={{ padding: 24 }}>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 4 }}>
          {["daily", "weekly", "monthly", "yearly"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: period === p ? COLORS.primary : "transparent", color: period === p ? "#fff" : COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{p}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          {["PDF", "Excel", "CSV"].map(f => (
            <button key={f} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 12, color: COLORS.textMuted, cursor: "pointer", fontWeight: 600 }}>📥 {f}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Gross Sales", value: "₹18.4L", sub: "↑ 8%", color: COLORS.primary },
          { label: "Net Revenue", value: "₹15.2L", sub: "After GST & disc.", color: COLORS.accent },
          { label: "Gross Profit", value: "₹4.8L", sub: "26.2% margin", color: "#8B5CF6" },
          { label: "Total Orders", value: "4,284", sub: "↑ 12%", color: COLORS.warning },
          { label: "Avg Order Value", value: "₹428", sub: "↑ 3%", color: "#06B6D4" },
        ].map((k, i) => <KPICard key={i} {...k} />)}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Revenue Trend */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 4 }}>Revenue Trend</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 20 }}>Daily revenue — current month</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120 }}>
            {dailyData.map((v, i) => {
              const max = Math.max(...dailyData);
              return (
                <div key={i} style={{ flex: 1, position: "relative" }}>
                  <div style={{ width: "100%", background: i === dailyData.length - 1 ? COLORS.primary : `${COLORS.primary}50`, borderRadius: "3px 3px 0 0", height: `${(v / max) * 110}px`, transition: "all 0.5s ease" }}
                    title={`Day ${i + 1}: ₹${v.toLocaleString("en-IN")}`} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.textLight, marginTop: 4 }}>
            <span>Jun 1</span><span>Jun 15</span>
          </div>
        </div>

        {/* Category Performance */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 16 }}>Category Sales</div>
          {[
            { cat: "Grocery", pct: 38, val: "₹6.9L", color: COLORS.primary },
            { cat: "Dairy", pct: 22, val: "₹4.0L", color: COLORS.accent },
            { cat: "Beverages", pct: 18, val: "₹3.3L", color: COLORS.warning },
            { cat: "Snacks", pct: 14, val: "₹2.6L", color: "#8B5CF6" },
            { cat: "Personal Care", pct: 8, val: "₹1.4L", color: "#06B6D4" },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: COLORS.textMuted, fontWeight: 500 }}>{c.cat}</span>
                <span style={{ fontWeight: 600, color: COLORS.text }}>{c.val} <span style={{ color: COLORS.textLight, fontWeight: 400 }}>({c.pct}%)</span></span>
              </div>
              <div style={{ height: 6, background: COLORS.bg, borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Table */}
      <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, fontWeight: 700, color: COLORS.text, fontSize: 15 }}>Transaction History</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: COLORS.bg }}>
              {["Invoice", "Customer", "Items", "Payment", "Time", "Amount", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...mockTransactions, ...mockTransactions.map(t => ({ ...t, id: t.id.replace("128", "127") }))].map((t, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px 16px", fontWeight: 600, color: COLORS.primary, fontFamily: "monospace" }}>{t.id}</td>
                <td style={{ padding: "12px 16px", color: COLORS.text }}>{t.customer}</td>
                <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{t.items}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: COLORS.bg, color: COLORS.textMuted, padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{t.payment}</span>
                </td>
                <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{t.time}</td>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: COLORS.text }}>₹{t.total.toLocaleString("en-IN")}</td>
                <td style={{ padding: "12px 16px" }}><Badge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== CUSTOMERS ====================
function CustomerManagement({ selectedCustomer, setSelectedCustomer }) {
  const purchaseHistory = [
    { date: "Jun 13", invoice: "INV-2026-1284", items: 8, total: 1245, payment: "UPI" },
    { date: "Jun 10", invoice: "INV-2026-1201", items: 5, total: 890, payment: "Card" },
    { date: "Jun 5", invoice: "INV-2026-1140", items: 12, total: 2340, payment: "Cash" },
    { date: "May 28", invoice: "INV-2026-1080", items: 4, total: 680, payment: "UPI" },
  ];

  if (selectedCustomer) {
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => setSelectedCustomer(null)} style={{ background: "none", border: "none", color: COLORS.primary, cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
          ← Back to Customers
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
          {/* Profile Card */}
          <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, background: COLORS.primaryLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: COLORS.primary, margin: "0 auto 12px" }}>
                {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>{selectedCustomer.name}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>{selectedCustomer.email}</div>
            </div>
            {[
              { label: "Mobile", value: selectedCustomer.mobile },
              { label: "Total Purchases", value: `₹${selectedCustomer.totalPurchases.toLocaleString("en-IN")}`, color: COLORS.primary },
              { label: "Loyalty Points", value: `${selectedCustomer.loyaltyPoints} pts`, color: COLORS.warning },
              { label: "Outstanding", value: selectedCustomer.outstanding ? `₹${selectedCustomer.outstanding.toLocaleString("en-IN")}` : "Clear", color: selectedCustomer.outstanding ? COLORS.danger : COLORS.accent },
              { label: "Last Visit", value: selectedCustomer.lastVisit },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 13 }}>
                <span style={{ color: COLORS.textMuted }}>{item.label}</span>
                <span style={{ fontWeight: 600, color: item.color || COLORS.text }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Purchase History */}
          <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, fontWeight: 700, color: COLORS.text, fontSize: 15 }}>Purchase History</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: COLORS.bg }}>
                  {["Date", "Invoice", "Items", "Payment", "Amount"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: COLORS.textMuted, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((p, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{p.date}</td>
                    <td style={{ padding: "12px 16px", color: COLORS.primary, fontWeight: 600, fontFamily: "monospace" }}>{p.invoice}</td>
                    <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{p.items} items</td>
                    <td style={{ padding: "12px 16px" }}><span style={{ background: COLORS.bg, color: COLORS.textMuted, padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{p.payment}</span></td>
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: COLORS.text }}>₹{p.total.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KPICard label="Total Customers" value="8,432" icon="👥" />
        <KPICard label="New This Month" value="128" icon="✨" color={COLORS.accent} />
        <KPICard label="Loyalty Members" value="3,240" icon="⭐" color={COLORS.warning} />
        <KPICard label="Outstanding Balance" value="₹48,200" icon="💰" color={COLORS.danger} />
      </div>

      <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 12 }}>
          <div style={{ flex: 1, background: COLORS.bg, borderRadius: 8, padding: "8px 12px", display: "flex", gap: 8 }}>
            <span>🔍</span>
            <input placeholder="Search by name, mobile, or email..." style={{ border: "none", background: "transparent", fontSize: 13, outline: "none", flex: 1 }} />
          </div>
          <button style={{ background: COLORS.primary, border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer" }}>+ Add Customer</button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: COLORS.bg }}>
              {["Name", "Mobile", "Email", "Total Purchases", "Last Visit", "Loyalty Pts", "Outstanding", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((c, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, background: COLORS.primaryLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: COLORS.primary }}>
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span style={{ fontWeight: 600, color: COLORS.text }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{c.mobile}</td>
                <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{c.email}</td>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: COLORS.text }}>₹{c.totalPurchases.toLocaleString("en-IN")}</td>
                <td style={{ padding: "12px 16px", color: COLORS.textMuted }}>{c.lastVisit}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ color: COLORS.warning, fontWeight: 600 }}>⭐ {c.loyaltyPoints}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ color: c.outstanding ? COLORS.danger : COLORS.accent, fontWeight: 600 }}>
                    {c.outstanding ? `₹${c.outstanding.toLocaleString("en-IN")}` : "Clear"}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button onClick={() => setSelectedCustomer(c)} style={{ background: COLORS.primaryLight, color: COLORS.primary, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== SUPPLIERS ====================
function SupplierManagement() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KPICard label="Total Suppliers" value="32" icon="🏭" />
        <KPICard label="Active POs" value="8" icon="📋" color={COLORS.accent} />
        <KPICard label="Payments Due" value="₹2.6L" icon="💰" color={COLORS.danger} />
        <KPICard label="Avg Rating" value="4.3 ⭐" icon="⭐" color={COLORS.warning} />
      </div>

      <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15 }}>Supplier Directory</div>
          <button style={{ background: COLORS.primary, border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer" }}>+ Add Supplier</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: COLORS.bg }}>
              {["Supplier", "Contact Person", "Mobile", "Products", "Outstanding", "Rating", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: COLORS.textMuted, fontSize: 11, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockSuppliers.map((s, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 700, color: COLORS.text }}>{s.name}</div>
                </td>
                <td style={{ padding: "14px 16px", color: COLORS.textMuted }}>{s.contact}</td>
                <td style={{ padding: "14px 16px", color: COLORS.textMuted }}>{s.mobile}</td>
                <td style={{ padding: "14px 16px", color: COLORS.textMuted }}>{s.products} products</td>
                <td style={{ padding: "14px 16px", fontWeight: 600, color: s.outstanding ? COLORS.danger : COLORS.accent }}>
                  {s.outstanding ? `₹${s.outstanding.toLocaleString("en-IN")}` : "Clear"}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: s.rating >= 4.5 ? COLORS.accent : s.rating >= 4 ? COLORS.warning : COLORS.danger, fontWeight: 700 }}>⭐ {s.rating}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button style={{ background: COLORS.primaryLight, color: COLORS.primary, border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== EMPLOYEES ====================
function EmployeeManagement() {
  const roles = ["All", "Cashier", "Store Manager", "Admin", "Accountant"];
  const [roleFilter, setRoleFilter] = useState("All");
  const filtered = roleFilter === "All" ? mockEmployees : mockEmployees.filter(e => e.role === roleFilter);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KPICard label="Total Staff" value="24" icon="👔" />
        <KPICard label="Present Today" value="22" icon="✅" color={COLORS.accent} />
        <KPICard label="On Leave" value="2" icon="🏖️" color={COLORS.warning} />
        <KPICard label="Avg Performance" value="94%" icon="📈" color={COLORS.primary} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {roles.map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} style={{ padding: "6px 14px", borderRadius: 99, border: `1px solid ${roleFilter === r ? COLORS.primary : COLORS.border}`, background: roleFilter === r ? COLORS.primaryLight : "#fff", color: roleFilter === r ? COLORS.primary : COLORS.textMuted, fontSize: 12, fontWeight: roleFilter === r ? 600 : 400, cursor: "pointer" }}>{r}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {filtered.map((emp, i) => (
          <div key={i} style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, background: COLORS.primaryLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: COLORS.primary }}>
                {emp.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15 }}>{emp.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{emp.role} · {emp.store}</div>
              </div>
              <Badge status={emp.status} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Sales", value: emp.sales > 0 ? `₹${(emp.sales / 100000).toFixed(1)}L` : "N/A" },
                { label: "Attendance", value: emp.attendance },
              ].map((stat, j) => (
                <div key={j} style={{ background: COLORS.bg, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== EXPENSES ====================
function ExpenseManagement() {
  const totalExpense = expenseData.reduce((s, e) => s + e.amount, 0);
  const monthlyExpenses = [
    { month: "Jan", amount: 320000 },
    { month: "Feb", amount: 345000 },
    { month: "Mar", amount: 338000 },
    { month: "Apr", amount: 352000 },
    { month: "May", amount: 364000 },
    { month: "Jun", amount: 364400 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <KPICard label="Monthly Expenses" value="₹3.64L" icon="💸" color={COLORS.danger} />
        <KPICard label="vs Last Month" value="+₹0.4L" icon="📈" color={COLORS.warning} />
        <KPICard label="Biggest Category" value="Salaries" icon="👥" />
        <KPICard label="Budget Utilization" value="91%" icon="🎯" color={COLORS.accent} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Breakdown */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 16 }}>Expense Breakdown — June 2026</div>
          {expenseData.map((e, i) => {
            const colors = [COLORS.primary, COLORS.danger, COLORS.warning, COLORS.accent, "#8B5CF6"];
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < expenseData.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{e.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{e.category}</div>
                    <div style={{ height: 4, width: 80, background: COLORS.bg, borderRadius: 99, marginTop: 4 }}>
                      <div style={{ height: "100%", width: `${(e.amount / totalExpense) * 100}%`, background: colors[i], borderRadius: 99 }} />
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>₹{e.amount.toLocaleString("en-IN")}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{Math.round((e.amount / totalExpense) * 100)}%</div>
                </div>
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: 15, fontWeight: 800, color: COLORS.text }}>
            <span>Total</span>
            <span style={{ color: COLORS.danger }}>₹{totalExpense.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Trend */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 4 }}>6-Month Trend</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 20 }}>Total monthly expenses</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 150 }}>
            {monthlyExpenses.map((m, i) => {
              const max = Math.max(...monthlyExpenses.map(x => x.amount));
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 10, color: COLORS.textMuted, fontWeight: 600 }}>₹{(m.amount / 100000).toFixed(1)}L</div>
                  <div style={{ width: "100%", background: i === 5 ? COLORS.danger : `${COLORS.danger}40`, borderRadius: "4px 4px 0 0", height: `${(m.amount / max) * 100}px`, transition: "height 0.5s ease" }} />
                  <span style={{ fontSize: 11, color: COLORS.textLight }}>{m.month}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 20 }}>
            <button style={{ width: "100%", background: COLORS.primaryLight, border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, color: COLORS.primary, cursor: "pointer" }}>+ Add Expense Entry</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== ANALYTICS ====================
function AnalyticsCenter() {
  const profitData = [8400, 12100, 14200, 12800, 18600, 19800, 24200, 21400, 26400, 23200, 28800, 31200];
  const customerGrowth = [620, 680, 750, 820, 910, 980, 1080, 1150, 1240, 1320, 1410, 1500];

  return (
    <div style={{ padding: 24 }}>
      {/* Advanced KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "GMV", value: "₹2.8Cr", color: COLORS.primary },
          { label: "Gross Margin", value: "28.4%", color: COLORS.accent },
          { label: "Inventory Turns", value: "8.2x", color: "#8B5CF6" },
          { label: "Customer LTV", value: "₹24,800", color: COLORS.warning },
          { label: "Churn Rate", value: "3.2%", color: COLORS.danger },
          { label: "NPS Score", value: "72", color: "#06B6D4" },
        ].map((k, i) => <KPICard key={i} {...k} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Revenue vs Profit */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 4 }}>Revenue vs Profit Trend</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>Monthly comparison</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11 }}>
              <div style={{ width: 10, height: 10, background: COLORS.primary, borderRadius: 2 }} />
              <span style={{ color: COLORS.textMuted }}>Revenue</span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11 }}>
              <div style={{ width: 10, height: 10, background: COLORS.accent, borderRadius: 2 }} />
              <span style={{ color: COLORS.textMuted }}>Profit</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120 }}>
            {revenueData.map((v, i) => {
              const max = Math.max(...revenueData);
              const pv = profitData[i];
              const pmax = Math.max(...profitData);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ width: "100%", display: "flex", gap: 1, alignItems: "flex-end", height: 100 }}>
                    <div style={{ flex: 1, background: `${COLORS.primary}70`, borderRadius: "3px 3px 0 0", height: `${(v / max) * 100}px` }} />
                    <div style={{ flex: 1, background: `${COLORS.accent}90`, borderRadius: "3px 3px 0 0", height: `${(pv / max) * 100}px` }} />
                  </div>
                  <span style={{ fontSize: 8, color: COLORS.textLight }}>{months[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Growth */}
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 4 }}>Customer Growth</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>New customers per month</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120 }}>
            {customerGrowth.map((v, i) => {
              const max = Math.max(...customerGrowth);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ width: "100%", background: i === customerGrowth.length - 1 ? "#8B5CF6" : "#8B5CF640", borderRadius: "3px 3px 0 0", height: `${(v / max) * 110}px`, transition: "height 0.5s ease" }} />
                  <span style={{ fontSize: 8, color: COLORS.textLight }}>{months[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inventory Movement & Top SKUs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 16 }}>Top Performing SKUs</div>
          {mockProducts.slice(0, 5).map((p, i) => {
            const revenue = Math.round(p.sellingPrice * (Math.random() * 200 + 100));
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{p.image}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{p.sku}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>₹{revenue.toLocaleString("en-IN")}</div>
                  <div style={{ fontSize: 10, color: COLORS.accent }}>↑ {Math.round(Math.random() * 20 + 5)}%</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 15, marginBottom: 16 }}>Inventory Movement</div>
          {[
            { label: "Fast Moving (A)", count: 420, color: COLORS.accent, pct: 65 },
            { label: "Medium Moving (B)", count: 180, color: COLORS.warning, pct: 28 },
            { label: "Slow Moving (C)", count: 46, color: COLORS.danger, pct: 7 },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: COLORS.text }}>{item.label}</span>
                <span style={{ color: COLORS.textMuted }}>{item.count} SKUs ({item.pct}%)</span>
              </div>
              <div style={{ height: 8, background: COLORS.bg, borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: 14, background: COLORS.primaryLight, borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>💡 AI Insight</div>
            <div style={{ fontSize: 12, color: COLORS.primary, marginTop: 4, lineHeight: 1.5 }}>
              Red Bull (3 units) will stock out in ~2 days based on sales velocity. Consider raising a PO.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
