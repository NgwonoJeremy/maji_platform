import React, { useState } from 'react';

const CustomerDashboard = () => {
  // Mock customer info centered around  "maji_platform" theme
  const [customerInfo] = useState({
    name: "Alex Amina",
    estate: "Greenwood Estates, Block B",
    walletBalance: 2450,
    totalLitersOrdered: 160,
    activeOrders: 1
  });

  // Recent orders matching your water/vendors application data context
  const [recentOrders] = useState([
    { id: "MAJI-9821", date: "2026-06-23", vendor: "AquaPure Springs", quantity: "3 x 20L Bottles", total: 1500, status: "In Transit" },
    { id: "MAJI-9740", date: "2026-06-18", vendor: "Kilimani Waters", quantity: "2 x 20L Bottles", total: 1000, status: "Delivered" },
    { id: "MAJI-9512", date: "2026-06-12", vendor: "AquaPure Springs", quantity: "4 x 20L Bottles", total: 2000, status: "Delivered" }
  ]);

  // Action handlers for when a user clicks your feature cards
  const handleNavigateToOrder = () => {
    alert("Navigating to OrderWater.jsx component! (Wire up your router link here)");
  };

  const handleNavigateToTrack = () => {
    alert("Navigating to TrackOrder.jsx component! (Wire up your router link here)");
  };

  return (
    <div style={styles.container}>
      
      {/* Top Welcome Header Banner */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Welcome back, {customerInfo.name}!</h1>
          <p style={styles.subtitle}>
            Delivery Address: <span style={styles.boldText}>{customerInfo.estate}</span>
          </p>
        </div>
        <div style={styles.dateBadge}>
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      </header>

      {/* Metrics / Analytics Row */}
      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Active Deliveries</span>
          <p style={{ ...styles.statValue, color: '#2563eb' }}>{customerInfo.activeOrders}</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Water Consumed</span>
          <p style={{ ...styles.statValue, color: '#334155' }}>{customerInfo.totalLitersOrdered}L</p>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Wallet Balance</span>
          <p style={{ ...styles.statValue, color: '#16a34a' }}>Ksh {customerInfo.walletBalance.toLocaleString()}</p>
        </div>
      </section>

      {/* Quick Action Navigation Grid */}
      <h2 style={styles.sectionHeading}>Quick Actions</h2>
      <section style={styles.actionGrid}>
        
        {/* Card for OrderWater.jsx */}
        <div onClick={handleNavigateToOrder} style={{ ...styles.actionCard, backgroundImage: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
          <div style={styles.actionContent}>
            <div>
              <h3 style={styles.actionTitle}>Order Clean Water</h3>
              <p style={styles.actionDesc}>Browse vendors serving your local estate and order quick drops.</p>
            </div>
            <div style={styles.arrowIcon}>→</div>
          </div>
        </div>

        {/* Card for TrackOrder.jsx */}
        <div onClick={handleNavigateToTrack} style={{ ...styles.actionCard, backgroundImage: 'linear-gradient(135deg, #4f46e5, #4338ca)' }}>
          <div style={styles.actionContent}>
            <div>
              <h3 style={styles.actionTitle}>Track Live Orders</h3>
              <p style={styles.actionDesc}>Check current dispatch status, live ETA, or contact delivery rider.</p>
            </div>
            <div style={styles.arrowIcon}>→</div>
          </div>
        </div>

      </section>

      {/* Historic Logs / Table Section */}
      <section style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>Recent Orders Log</h2>
          <span style={styles.viewAllBtn}>History Logs</span>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeadRow}>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Vendor</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} style={styles.tableRow}>
                  <td style={{ ...styles.td, fontWeight: '600', color: '#0f172a' }}>{order.id}</td>
                  <td style={styles.td}>{order.date}</td>
                  <td style={styles.td}>{order.vendor}</td>
                  <td style={styles.td}>{order.quantity}</td>
                  <td style={{ ...styles.td, fontWeight: '500' }}>Ksh {order.total}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: order.status === 'Delivered' ? '#f0fdf4' : '#fffbeb',
                      color: order.status === 'Delivered' ? '#166534' : '#92400e',
                    }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

// CSS-in-JS layout configuration matching standard system defaults
const styles = {
  container: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1.5rem', color: '#334155', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' },
  title: { margin: 0, fontSize: '1.6rem', color: '#0f172a', fontWeight: '800' },
  subtitle: { margin: '0.3rem 0 0 0', color: '#64748b', fontSize: '0.95rem' },
  boldText: { fontWeight: '600', color: '#475569' },
  dateBadge: { backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.85rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' },
  statCard: { backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' },
  statLabel: { fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', trackingMultiplier: '0.05em', fontWeight: '600' },
  statValue: { margin: '0.5rem 0 0 0', fontSize: '2rem', fontWeight: '800' },
  sectionHeading: { fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' },
  actionCard: { padding: '1.5rem', borderRadius: '16px', color: '#ffffff', cursor: 'pointer', transition: 'transform 0.2s ease' },
  actionContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' },
  actionTitle: { margin: 0, fontSize: '1.2rem', fontWeight: '700' },
  actionDesc: { margin: '0.4rem 0 0 0', opacity: 0.9, fontSize: '0.88rem', lineHeight: '1.4' },
  arrowIcon: { fontSize: '1.6rem', fontWeight: 'bold' },
  tableContainer: { backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' },
  tableHeader: { padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  viewAllBtn: { color: '#64748b', fontSize: '0.85rem', fontWeight: '500' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' },
  tableHeadRow: { backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: { padding: '1rem 1.5rem', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' },
  tableRow: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#475569' },
  statusBadge: { padding: '0.25rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }
};

export default CustomerDashboard;