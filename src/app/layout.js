import './globals.css';
import CinematicBackground from '@/components/layout/CinematicBackground/cinematic-background';
import styles from './layout.module.css';

export const metadata = {
  title: 'Enterprise BI | Executive Control Center',
  description: 'High-stakes betting analytics and risk management dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CinematicBackground />
        <div className={styles.layout}>
          <div className={styles.contentWrapper}>
            <main className={styles.main}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
