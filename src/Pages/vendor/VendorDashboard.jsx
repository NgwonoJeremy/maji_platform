import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet's default marker icons break under most bundlers (Vite/Webpack) unless
// pointed at CDN assets explicitly. This fixes that.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Approximate coordinates for known estates. Add entries here as new estates
// get registered (matches the "Add new estate" flow in VendorRegister).
const ESTATE_COORDS = {
  'Greenwood Estates': [-1.3010, 36.7890],
  'Kilimani Heights': [-1.2917, 36.7856],
  'South C Enclave': [-1.3167, 36.8283]
};
const NAIROBI_CENTER = [-1.2921, 36.8219];

const DEMO_PROFILE = {
  businessName: 'AquaPure Springs Ltd',
  ownerName: 'Demo Vendor',
  phone: '0700 000 000',
  estateCoverage: 'Greenwood Estates',
  capacityLiters: '2000'
};

const findEstateCoords = (address) => {
  const match = Object.keys(ESTATE_COORDS).find(estate => address.includes(estate));
  return match ? ESTATE_COORDS[match] : null;
};

const VendorDashboard = () => {
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [isDemoData, setIsDemoData] = useState(true);

  // Operational metrics not covered by registration (would come from your backend)
  const [vendorMetrics, setVendorMetrics] = useState({
    isAcceptingOrders: true,
    basePrice: 500,
    totalEarnings: 42500,
    litersDelivered: 1720
  });

  const [orders, setOrders] = useState([
    { id: "MAJI-9821", customer: "Alex Amina", address: "Greenwood Estates, Block B", quantity: "3 x 20L", total: 1500, status: "Pending" },
    { id: "MAJI-9822", customer: "Sarah Ochieng", address: "Greenwood Estates, Apt 4C", quantity: "1 x 20L", total: 500, status: "Accepted" },
    { id: "MAJI-9740", customer: "Michael Kamau", address: "Kilimani Heights, Rm 12", quantity: "2 x 20L", total: 1000, status: "Delivered" }
  ]);

  // Pull in whatever VendorRegister saved. Falls back to demo data if the
  // vendor landed here directly without registering yet.
  useEffect(() => {
    const stored = localStorage.getItem('majiVendorProfile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setIsDemoData(false);
      } catch {
        // malformed data in storage — keep demo fallback
      }
    }
  }, []);

  const updateOrderStatus = (orderId, nextStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: nextStatus } : order
      )
    );
  };

  const toggleStoreStatus = () => {
    setVendorMetrics(prev => ({ ...prev, isAcceptingOrders: !prev.isAcceptingOrders }));
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value) || 0;
    setVendorMetrics(prev => ({ ...prev, basePrice: newPrice }));
  };

  const coverageCoords = ESTATE_COORDS[profile.estateCoverage] || NAIROBI_CENTER;

  return (
    <div style={styles.container}>
      {isDemoData && (
        <div style={styles.demoBanner}>
          Showing demo data — no registered vendor profile found in this browser. Register a station to see your own info here.
        </div>
      )}

      {/* Dashboard Top Header Bar */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>{profile.businessName} Portal</h1>
          <p style={styles.subtitle}>Manage your incoming water fulfillment queues</p>
          <p style={styles.coverageTag}>
            📍 Covering <b>{profile.estateCoverage}</b> · Registered capacity: <b>{profile.capacityLiters} L/day</b>
          </p>
        </div>
        <div style={styles.toggleWrapper}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: vendorMetrics.isAcceptingOrders ? '#4ade80' : '#f87171' }}>
            {vendorMetrics.isAcceptingOrders ? "● Online & Accepting Orders" : "○ Offline / Closed"}
          </span>
          <button onClick={toggleStoreStatus} style={{ ...styles.actionBtn, backgroundColor: vendorMetrics.isAcceptingOrders ? '#3f1d1d' : '#123524', color: vendorMetrics.isAcceptingOrders ? '#fca5a5' : '#86efac' }}>
            Toggle Status
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total Revenue</span>
          <p style={{ ...styles.statValue, color: '#4ade80' }}>Ksh {vendorMetrics.totalEarnings.toLocaleString()}</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Volume Dispatched</span>
          <p style={{ ...styles.statValue, color: '#60a5fa' }}>{vendorMetrics.litersDelivered} Liters</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Active Workload</span>
          <p style={{ ...styles.statValue, color: '#fbbf24' }}>
            {orders.filter(o => o.status !== 'Delivered').length} Orders
          </p>
        </div>
      </section>

      {/* Control Panel / Pricing Configuration Layout */}
      <div style={styles.mainGrid}>
        <section style={styles.ordersCard}>
          <h2 style={styles.sectionHeading}>Incoming Order Dispatch Queue</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeadRow}>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Address</th>
                  <th style={styles.th}>Items</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={styles.tableRow}>
                    <td style={{ ...styles.td, fontWeight: '600' }}>{order.id}</td>
                    <td style={styles.td}>{order.customer}</td>
                    <td style={styles.td}>{order.address}</td>
                    <td style={styles.td}>{order.quantity}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: order.status === 'Delivered' ? '#0f3d24' : order.status === 'Accepted' ? '#0f2f52' : '#4a3406',
                        color: order.status === 'Delivered' ? '#86efac' : order.status === 'Accepted' ? '#93c5fd' : '#fcd34d',
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {order.status === 'Pending' && (
                        <button onClick={() => updateOrderStatus(order.id, 'Accepted')} style={{ ...styles.smallBtn, backgroundColor: '#2563eb', color: '#fff' }}>Accept</button>
                      )}
                      {order.status === 'Accepted' && (
                        <button onClick={() => updateOrderStatus(order.id, 'Delivered')} style={{ ...styles.smallBtn, backgroundColor: '#16a34a', color: '#fff' }}>Mark Delivered</button>
                      )}
                      {order.status === 'Delivered' && <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Complete</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delivery Coverage Map */}
          <h2 style={{ ...styles.sectionHeading, marginTop: '1.75rem' }}>Delivery Coverage Map</h2>
          <div style={styles.mapWrapper}>
            <MapContainer center={coverageCoords} zoom={13} style={{ height: '320px', width: '100%' }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <CircleMarker
                center={coverageCoords}
                radius={28}
                pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.15, weight: 2 }}
              >
                <Popup>Your registered coverage: {profile.estateCoverage}</Popup>
              </CircleMarker>
              {orders.map((order) => {
                const coords = findEstateCoords(order.address);
                if (!coords) return null;
                return (
                  <Marker key={order.id} position={coords}>
                    <Popup>
                      <b>{order.id}</b><br />
                      {order.customer}<br />
                      {order.address}<br />
                      Status: {order.status}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </section>

        {/* Pricing Inventory Config Sidebar Panel */}
        <section style={styles.configCard}>
          <h2 style={styles.sectionHeading}>Refill Unit Config</h2>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={styles.label}>Rate per 20L Refill Bottle (Ksh)</label>
            <input
              type="number"
              value={vendorMetrics.basePrice}
              onChange={handlePriceChange}
              style={styles.input}
            />
            <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
              Changes will instantly reflect across customer browsing maps.
            </p>
          </div>
          <div style={styles.infoBox}>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: '700', color: '#e2e8f0' }}>Compliance Status</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>✓ KEBS Safety Verification verified valid until Dec 2026.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0a1929', minHeight: '100vh', padding: '2rem', boxSizing: 'border-box', color: '#e2e8f0' },
  demoBanner: { backgroundColor: '#1e3a5f', color: '#bfdbfe', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #2c5282' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' },
  title: { margin: 0, fontSize: '1.6rem', fontWeight: '800', color: '#f1f5f9' },
  subtitle: { margin: '0.3rem 0 0 0', fontSize: '0.9rem', color: '#94a3b8' },
  coverageTag: { margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#93c5fd' },
  toggleWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' },
  actionBtn: { border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.75rem' },
  statCard: { backgroundColor: '#132743', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.25rem' },
  statLabel: { fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' },
  statValue: { margin: '0.4rem 0 0 0', fontSize: '1.5rem', fontWeight: '800' },
  mainGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' },
  ordersCard: { backgroundColor: '#132743', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' },
  configCard: { backgroundColor: '#132743', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' },
  sectionHeading: { margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#f1f5f9' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeadRow: { borderBottom: '1px solid #1e3a5f' },
  th: { textAlign: 'left', padding: '0.6rem 0.5rem', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.03em' },
  tableRow: { borderBottom: '1px solid #1e3a5f' },
  td: { padding: '0.7rem 0.5rem', fontSize: '0.85rem', color: '#e2e8f0' },
  statusBadge: { padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' },
  smallBtn: { border: 'none', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.4rem' },
  input: { width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #2c5282', fontSize: '0.95rem', boxSizing: 'border-box', backgroundColor: '#0f2748', color: '#f1f5f9' },
  infoBox: { backgroundColor: '#0f2748', border: '1px solid #1e3a5f', borderRadius: '10px', padding: '1rem' },
  mapWrapper: { borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e3a5f' }
};

export default VendorDashboard;
