 import React, { useState } from 'react';

const VendorDashboard = () => {
  // Vendor operational state
  const [vendorMetrics, setVendorMetrics] = useState({
    businessName: "AquaPure Springs Ltd",
    isAcceptingOrders: true,
    basePrice: 500,
    totalEarnings: 42500,
    litersDelivered: 1720
  });

  // Active orders queue coming in from customers
  const [orders, setOrders] = useState([
    { id: "MAJI-9821", customer: "Alex Amina", address: "Greenwood Estates, Block B", quantity: "3 x 20L", total: 1500, status: "Pending" },
    { id: "MAJI-9822", customer: "Sarah Ochieng", address: "Greenwood Estates, Apt 4C", quantity: "1 x 20L", total: 500, status: "Accepted" },
    { id: "MAJI-9740", customer: "Michael Kamau", address: "Kilimani Heights, Rm 12", quantity: "2 x 20L", total: 1000, status: "Delivered" }
  ]);

  // Handle live status workflow changes for deliveries
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

  return (
    <div style={styles.container}>
      {/* Dashboard Top Header Bar */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>{vendorMetrics.businessName} Portal</h1>
          <p style={styles.subtitle}>Manage your incoming water fulfillment queues</p>
        </div>
        <div style={styles.toggleWrapper}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: vendorMetrics.isAcceptingOrders ? '#16a34a' : '#dc2626' }}>
            {vendorMetrics.isAcceptingOrders ? "● Online & Accepting Orders" : "○ Offline / Closed"}
          </span>
          <button onClick={toggleStoreStatus} style={{ ...styles.actionBtn, backgroundColor: vendorMetrics.isAcceptingOrders ? '#fee2e2' : '#dcfce7', color: vendorMetrics.isAcceptingOrders ? '#991b1b' : '#166534' }}>
            Toggle Status
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total Revenue</span>
          <p style={{ ...styles.statValue, color: '#16a34a' }}>Ksh {vendorMetrics.totalEarnings.toLocaleString()}</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Volume Dispatched</span>
          <p style={{ ...styles.statValue, color: '#2563eb' }}>{vendorMetrics.litersDelivered} Liters</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Active Workload</span>
          <p style={{ ...styles.statValue, color: '#b45309' }}>
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
                        backgroundColor: order.status === 'Delivered' ? '#f0fdf4' : order.status === 'Accepted' ? '#eff6ff' : '#fffbeb',
                        color: order.status === 'Delivered' ? '#166534' : order.status === 'Accepted' ? '#1d4ed8' : '#92400e',
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
                      {order.status === 'Delivered' && <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Complete</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
              Changes will instantly reflect across customer browsing maps.
            </p>
          </div>
          <div style={styles.infoBox}>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: '700' }}>Compliance Status</h4>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>✓ KEBS Safety Verification verified valid until Dec 2026.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1.5rem', color: '#334155', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' },
  title: { margin: 0, fontSize: '1.6rem', color: '#0f172a', fontWeight: '800' },
  subtitle: { margin: '0.3rem 0 0 0', color: '#64748b', fontSize: '0.95rem' },
  toggleWrapper: { display: 'flex', alignItems: 'center', gap: '1rem' },
  actionBtn: { padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' },
  statCard: { backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' },
  statLabel: { fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600' },
  statValue: { margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: '800' },
  mainGrid: { display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '2rem', alignItems: 'start', '@media(max-width: 900px)': { gridTemplateColumns: '1fr' } },
  ordersCard: { backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', overflow: 'hidden' },
  configCard: { backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem' },
  sectionHeading: { fontSize: '1.2rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.25rem', marginTop: 0 },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '550px' },
  tableHeadRow: { backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: { padding: '1rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' },
  tableRow: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '1rem', fontSize: '0.9rem', color: '#475569' },
  statusBadge: { padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' },
  smallBtn: { padding: '0.4rem 0.75rem', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' },
  input: { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '1rem' },
  infoBox: { marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '10px', border: '1px solid #bbf7d0' }
};

export default VendorDashboard;

