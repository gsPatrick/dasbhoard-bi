"use client";

import { useState } from 'react';
import { Target, TrendingUp, Info } from 'lucide-react';
import Modal from '@/components/Modal/modal';
import styles from './overview.module.css';

const OverviewModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Análise de Performance Executiva">
            <div className={styles.modalContent}>
                <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                        <span className={styles.statLabel}>Meta Mensal (Outubro)</span>
                        <strong className="tabular-nums">R$ 35.000.000,00</strong>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statLabel}>Atingimento atual</span>
                        <strong className="tabular-nums" style={{ color: '#059669' }}>76.5%</strong>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statLabel}>Ticket Médio</span>
                        <strong className="tabular-nums">R$ 1.452,00</strong>
                    </div>
                </div>

                <div className={styles.comparisonGrid}>
                    <div className={styles.compBox}>
                        <div className={styles.compHeader}>
                            <span>Volume vs. Ontem</span>
                            <TrendingUp size={14} color="#059669" />
                        </div>
                        <strong className="tabular-nums">+22.4%</strong>
                    </div>
                    <div className={styles.compBox}>
                        <div className={styles.compHeader}>
                            <span>Volume vs. Semana Passada</span>
                            <TrendingUp size={14} color="#059669" />
                        </div>
                        <strong className="tabular-nums">+8.1%</strong>
                    </div>
                </div>

                <div className={styles.detailedTable}>
                    <h4 className={styles.tableTitle}>Composição de Receita Por Fonte</h4>
                    <table className={styles.modalTable}>
                        <thead>
                            <tr>
                                <th>Canal de Entrada</th>
                                <th className={styles.alignRight}>Total Depósitos</th>
                                <th className={styles.alignRight}>Conversão</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Tráfego Direto</td><td className={styles.alignRight}>R$ 12.450.771</td><td className={styles.alignRight}>12.4%</td></tr>
                            <tr><td>Afiliados (Top Tier)</td><td className={styles.alignRight}>R$ 8.343.978</td><td className={styles.alignRight}>9.2%</td></tr>
                            <tr><td>Ads (Meta/Google)</td><td className={styles.alignRight}>R$ 5.998.000</td><td className={styles.alignRight}>7.5%</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.activationSection}>
                    <h4 className={styles.tableTitle}>Status de Ativação do Funil</h4>
                    <div className={styles.activationBars}>
                        {[
                            { label: 'Leads Capturados', val: '100%', count: '234.567' },
                            { label: 'Contas Criadas', val: '82%', count: '192.345' },
                            { label: 'Primeiro Depósito', val: '9.1%', count: '21.345' }
                        ].map((bar, i) => (
                            <div key={i} className={styles.actItem}>
                                <div className={styles.actHeader}>
                                    <span>{bar.label}</span>
                                    <strong>{bar.count}</strong>
                                </div>
                                <div className={styles.actBar}><div style={{ width: bar.val }} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const Overview = ({ totalValue, ftd, full }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ftdPercent = (ftd / totalValue) * 100;

    return (
        <>
            <div className={styles.container} onClick={() => setIsModalOpen(true)}>
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <h3 className={styles.title}>Visão Geral</h3>
                        <span className={styles.subtitle}>Volume Total de Depósitos</span>
                    </div>
                    <button className={styles.viewAllBtn} onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                    }}>Ver Analítico</button>
                </div>

                <div className={styles.centerSection}>
                    <div className={styles.mainValueGroup}>
                        <h2 className={`tabular-nums ${styles.mainValue}`}>
                            R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </h2>
                        <div className={styles.trendBadge}>
                            <TrendingUp size={14} />
                            <span>+12.4% este mês</span>
                        </div>
                    </div>

                    <div className={styles.progressWrapper}>
                        <div className={styles.progressBar}>
                            <div className={styles.ftdBar} style={{ width: `${ftdPercent}%` }} />
                            <div className={styles.fullBar} style={{ width: `${100 - ftdPercent}%` }} />
                        </div>

                        <div className={styles.legend}>
                            <div className={styles.legendItem}>
                                <div className={styles.dot} style={{ backgroundColor: '#10b981' }} />
                                <span>FTD (Adesão)</span>
                            </div>
                            <div className={styles.legendItem}>
                                <div className={styles.dot} style={{ backgroundColor: '#f59e0b' }} />
                                <span>FULL (LTV)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomStats}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Total FTD</span>
                        <strong className="tabular-nums">R$ {ftd.toLocaleString('pt-BR')}</strong>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Total FULL</span>
                        <strong className="tabular-nums">R$ {full.toLocaleString('pt-BR')}</strong>
                    </div>
                </div>
            </div>
            <OverviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Overview;
