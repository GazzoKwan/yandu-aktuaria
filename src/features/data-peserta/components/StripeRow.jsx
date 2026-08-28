import React from 'react';
import { styles } from '../../../styles/themeStyles';

export default function StripeRow({ label, value, alt, onEdit, valueStyle, isReadOnlyMode = false }) {
  return (
    <div style={{ ...styles.stripeRow, backgroundColor: alt ? '#eaf4fe' : '#ffffff' }}>
      <div style={{ width: '40%', fontWeight: 'bold', color: '#1e293b' }}>{label}</div>
      <div style={{ width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...valueStyle }}>
        <span>{value}</span>
        {onEdit && (
          <button 
            type="button" 
            style={isReadOnlyMode ? styles.eyeBtn : styles.pencilBtn} 
            onClick={onEdit} 
            title={isReadOnlyMode ? "Lihat Detail (Read-Only)" : "Edit Field"}
          >
            {isReadOnlyMode ? '👁️' : '✏️'}
          </button>
        )}
      </div>
    </div>
  );
}
