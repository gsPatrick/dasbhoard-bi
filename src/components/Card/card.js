"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, BarChart3, PieChart, Users } from 'lucide-react';
import Modal from '@/components/Modal/modal';
import styles from './card.module.css';

const KPIModal = ({ isOpen, onClose, title, value }) => {
    const [activeSubModal, setActiveSubModal] = useState(null); // 'users', 'session', 'retention'

    const subModals = {
        users: {
            title: 'Detalhamento de Usuários Únicos',
            content: (
                <div className={styles.modalContent}>
                    <table className={styles.modalTable}>
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Localização</th>
                                <th className={styles.alignRight}>Último Acesso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Carlos Eduardo', loc: 'SP', date: 'Hoje, 10:45' },
                                { name: 'Maria Silva', loc: 'RJ', date: 'Hoje, 09:20' },
                                { name: 'João Pereira', loc: 'MG', date: 'Ontem, 22:15' },
                                { name: 'Fernanda Lima', loc: 'BA', date: 'Ontem, 18:40' }
                            ].map((u, i) => (
                                <tr key={i} className={styles.clickableRow}>
                                    <td className={styles.nameCell}>
                                        <div className={styles.smallAvatar}>{u.name.charAt(0)}</div>
                                        {u.name}
                                    </td>
                                    <td>{u.loc}</td>
                                    <td className={styles.alignRight}>{u.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className={styles.viewAllBtn}>Ver Todos os Usuários</button>
                </div>
            )
        },
        session: {
            title: 'Análise de Sessão Média',
            content: (
                <div className={styles.modalContent}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>Desktop</span>
                            <strong>5m 12s</strong>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>Mobile</span>
                            <strong>3m 05s</strong>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statLabel}>Tablet</span>
                            <strong>4m 50s</strong>
                        </div>
                    </div>
                    <button className={styles.viewAllBtn} style={{ marginTop: '24px' }}>Ver Logs de Sessão</button>
                </div>
            )
        },
        retention: {
            title: 'Métricas de Retenção',
            content: (
                <div className={styles.modalContent}>
                    <div className={styles.retentionChartPlaceholder}>
                        <div className={styles.retentionBar} style={{ height: '80%' }}><span>D1</span></div>
                        <div className={styles.retentionBar} style={{ height: '60%' }}><span>D7</span></div>
                        <div className={styles.retentionBar} style={{ height: '45%' }}><span>D14</span></div>
                        <div className={styles.retentionBar} style={{ height: '30%' }}><span>D30</span></div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginTop: '16px' }}>
                        Curva de retenção baseada em cohort mensal.
                    </p>
                    <button className={styles.viewAllBtn} style={{ marginTop: '24px' }}>Análise de Cohort Completa</button>
                </div>
            )
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title={`Detalhamento: ${title}`}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalMainValue}>
                            <span className={styles.modalLabel}>Total Atual</span>
                            <h2 className="tabular-nums">{value}</h2>
                        </div>
                        <div className={styles.comparison}>
                            <span className={styles.compLabel}>vs. Período Anterior</span>
                            <div className={styles.compValue}>
                                <TrendingUp size={16} />
                                <span className="tabular-nums">+14.2%</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.distributionSection}>
                        <h4 className={styles.subSectionTitle}>Distribuição por Fonte de Tráfego</h4>
                        <div className={styles.distGrid}>
                            {[
                                { label: 'Google Ads', val: '42%' },
                                { label: 'Meta Ads', val: '28%' },
                                { label: 'Afiliados', val: '20%' },
                                { label: 'Busca Orgânica', val: '10%' }
                            ].map((item, i) => (
                                <div key={i} className={styles.distItem}>
                                    <div className={styles.distInfo}>
                                        <span className={styles.distLabel}>{item.label}</span>
                                        <span className="tabular-nums">{item.val}</span>
                                    </div>
                                    <div className={styles.distBar}><div style={{ width: item.val }} /></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.modalMetrics}>
                        <div className={`${styles.miniMetric} ${styles.clickable}`} onClick={() => setActiveSubModal('users')}>
                            <Users size={16} />
                            <div>
                                <span>Usuários Únicos</span>
                                <strong className="tabular-nums">12.402</strong>
                            </div>
                        </div>
                        <div className={`${styles.miniMetric} ${styles.clickable}`} onClick={() => setActiveSubModal('session')}>
                            <BarChart3 size={16} />
                            <div>
                                <span>Sessão Média</span>
                                <strong className="tabular-nums">4m 20s</strong>
                            </div>
                        </div>
                        <div className={`${styles.miniMetric} ${styles.clickable}`} onClick={() => setActiveSubModal('retention')}>
                            <PieChart size={16} />
                            <div>
                                <span>Retenção</span>
                                <strong className="tabular-nums">68%</strong>
                            </div>
                        </div>
                    </div>

                    <button className={styles.viewAllBtn}>Ver Todos os Dados</button>
                </div>
            </Modal>

            {activeSubModal && (
                <Modal
                    isOpen={true}
                    onClose={() => setActiveSubModal(null)}
                    title={subModals[activeSubModal].title}
                >
                    {subModals[activeSubModal].content}
                </Modal>
            )}
        </>
    );
};

const Card = ({ title, value, trend, trendValue, subtitle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={styles.card} onClick={() => setIsModalOpen(true)}>
                <div className={styles.header}>
                    <span className={styles.title}>{title}</span>
                    <ArrowUpRight size={14} className={styles.arrowIcon} />
                </div>

                <div className={styles.mainContent}>
                    <h2 className={`tabular-nums ${styles.value}`}>{value}</h2>

                    <div className={styles.footer}>
                        <div className={`${styles.trend} ${trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span className="tabular-nums">{trendValue}%</span>
                        </div>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </div>
                </div>
            </div>

            <KPIModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                value={value}
            />
        </>
    );
};

export default Card;
