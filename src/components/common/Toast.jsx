import React from 'react';
import { styles } from '../../styles/themeStyles';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={styles.toastWrap}>
      {toasts.map(t => (
        <div key={t.id} style={styles.toast}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
