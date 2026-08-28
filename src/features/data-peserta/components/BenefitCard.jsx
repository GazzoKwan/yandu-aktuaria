import React from 'react';
import { styles } from '../../../styles/themeStyles';
import { formatRupiah } from '../../../utils/formatters';

export default function BenefitCard({ title, oldVal, newVal }) {
  const diff = newVal - oldVal;
  return (
    <div style={styles.benefitCard}>
      <div style={{ fontSize: 11, fontWeight: 'bold', color: '#334155' }}>{title}</div>
      <div style={{ margin: '6px 0', fontSize: 12 }}>
        <div style={{ color: '#94a3b8', textDecoration: 'line-through' }}>Awal: {formatRupiah(oldVal)}</div>
        <div style={{ color: '#2563eb', fontWeight: 'bold' }}>Koreksi: {formatRupiah(newVal)}</div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 'bold', color: diff >= 0 ? '#16a34a' : '#dc2626', textAlign: 'right' }}>
        {diff >= 0 ? '+' : ''}{formatRupiah(diff)}
      </div>
    </div>
  );
}
