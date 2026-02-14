"use client";

import { useState } from 'react';
import { Share2, Globe, TrendingUp, Search, MessageCircle, Play } from 'lucide-react';
import Modal from '@/components/Modal/modal';
import styles from './traffic.module.css';

const TrafficModal = ({ isOpen, onClose, data }) => {
    const [page, setPage] = useState(1);
    const totalPages = 2; // Simulado

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Detalhamento de Origem de Tráfego">
            <div className={styles.modalContent}>
                <table className={styles.modalTable}>
                    <thead>
                        <tr>
                            <th>Plataforma</th>
                            <th className={styles.alignRight}>Usuários</th>
                            <th className={styles.alignRight}>Sessões</th>
                            <th className={styles.alignRight}>Tx. Conversão</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td className={styles.nameCell}>
                                    {item.icon}
                                    {item.name}
                                </td>
                                <td className={`tabular-nums ${styles.alignRight}`}>{item.users.toLocaleString('pt-BR')}</td>
                                <td className={`tabular-nums ${styles.alignRight}`}>{Math.round(item.users * 1.4).toLocaleString('pt-BR')}</td>
                                <td className={`tabular-nums ${styles.alignRight}`} style={{ color: '#059669' }}>
                                    {(2 + Math.random() * 5).toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.pagination}>
                    <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(1)}>Anterior</button>
                    <div className={styles.pageInfo}>Página <strong>{page}</strong> de {totalPages}</div>
                    <button className={styles.pageBtn} disabled={page === 2} onClick={() => setPage(2)}>Próximo</button>
                </div>
            </div>
        </Modal>
    );
};

const TrafficSource = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sources = [
        { name: 'Google Ads', users: 304855, color: '#4285F4', icon: <img src="https://www.google.com/images/branding/product/2x/ads_64dp.png" alt="Google Ads" style={{ width: 28, height: 28, objectFit: 'contain' }} /> },
        { name: 'Google Search', users: 277712, color: '#4285F4', icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSJ9tCs_c8VgKsjcJ4Vz86GitwFiP_HQdvMg&s" alt="Google Search" style={{ width: 28, height: 28, objectFit: 'contain' }} /> },
        { name: 'Meta Ads', users: 159492, color: '#0668E1', icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPvmoWPQv26Ao1wU7yXdSXQBffYouhRyLWw&s" alt="Meta Ads" style={{ width: 28, height: 28, objectFit: 'contain' }} /> },
        { name: 'TikTok', users: 102482, color: '#000000', icon: <img src="https://www.cidademarketing.com.br/marketing/wp-content/uploads/2020/05/tiktok.png" alt="TikTok" style={{ width: 28, height: 28, objectFit: 'contain' }} /> },
        { name: 'YouTube', users: 52380, color: '#FF0000', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/YouTube_social_white_square_%282024%29.svg" alt="YouTube" style={{ width: 28, height: 28, objectFit: 'contain' }} /> },
    ];

    const maxUsers = Math.max(...sources.map(s => s.users));

    return (
        <div className={styles.container} onClick={() => setIsModalOpen(true)}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h3 className={styles.title}>Origem do Tráfego</h3>
                    <span className={styles.subtitle}>Volume de usuários por canal</span>
                </div>
                <button className={styles.viewAllBtn} onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                }}>Ver Todos</button>
            </div>

            <div className={styles.chart}>
                {sources.map((source, i) => (
                    <div key={i} className={styles.row}>
                        <div className={styles.info}>
                            <div className={styles.label}>
                                {source.icon}
                                <span>{source.name}</span>
                            </div>
                            <span className={`tabular-nums ${styles.value}`}>
                                {source.users.toLocaleString('pt-BR')}
                            </span>
                        </div>
                        <div className={styles.barContainer}>
                            <div
                                className={styles.bar}
                                style={{
                                    width: `${(source.users / maxUsers) * 100}%`,
                                    backgroundColor: source.color
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <TrafficModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={sources} />
        </div>
    );
};

export default TrafficSource;
