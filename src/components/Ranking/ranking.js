"use client";

import { useState } from 'react';
import { ExternalLink, Globe, Layout, Clock, MousePointer2, Users, DollarSign, TrendingUp, BarChart3, CheckCircle2 } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
import Chart from '@/components/Chart/chart';
import Modal from '@/components/Modal/modal';
import styles from './ranking.module.css';

const StateDetailModal = ({ isOpen, onClose, state }) => {
    if (!state) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Análise Geográfica: ${state.name}`}>
            <div className={styles.modalContent}>
                <div className={styles.stateDetailHeader}>
                    <div className={styles.stateMainInfo}>
                        <div className={styles.largeFlag}>
                            {state.uf ? (
                                <img src={`https://assets.codante.io/codante-apis/bandeiras-dos-estados/${state.uf.toLowerCase()}-full.svg`} alt={state.name} />
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div className={styles.stateTitleGroup}>
                            <h2>{state.name}</h2>
                            <span>Região: {['Sul', 'Sudeste', 'Norte', 'Nordeste', 'Centro-Oeste'][Math.floor(Math.random() * 5)]}</span>
                        </div>
                    </div>
                    <div className={styles.stateMainMetric}>
                        <span className={styles.metricLabel}>Total de Acessos</span>
                        <strong className="tabular-nums">{state.value.toLocaleString('pt-BR')}</strong>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                        <span className={styles.statLabel}>Taxa de Conversão</span>
                        <strong style={{ color: '#059669' }}>14.2%</strong>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statLabel}>Lead Ranking</span>
                        <strong># {Math.floor(Math.random() * 20) + 1}</strong>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statLabel}>Ticket Médio</span>
                        <strong>R$ 1.842,00</strong>
                    </div>
                </div>

                <div className={styles.citySection}>
                    <h4 className={styles.tableTitle}>Top 5 Cidades com maior engajamento</h4>
                    <table className={styles.modalTable}>
                        <thead>
                            <tr>
                                <th>Cidade</th>
                                <th className={styles.alignRight}>Usuários</th>
                                <th className={styles.alignRight}>Sessão Média</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Capital', users: Math.floor(state.value * 0.4), time: '5m 12s' },
                                { name: 'Cidade B', users: Math.floor(state.value * 0.2), time: '4m 05s' },
                                { name: 'Cidade C', users: Math.floor(state.value * 0.15), time: '3m 50s' },
                                { name: 'Cidade D', users: Math.floor(state.value * 0.12), time: '3m 45s' },
                                { name: 'Cidade E', users: Math.floor(state.value * 0.08), time: '3m 30s' }
                            ].map((c, i) => (
                                <tr key={i}>
                                    <td>{c.name}</td>
                                    <td className={`tabular-nums ${styles.alignRight}`}>{c.users.toLocaleString('pt-BR')}</td>
                                    <td className={`tabular-nums ${styles.alignRight}`}>{c.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button className={styles.viewAllBtn} style={{ marginTop: '24px', width: '100%' }}>Exportar Relatório PDF por Estado</button>
            </div>
        </Modal>
    );
};

const PageDetailModal = ({ isOpen, onClose, page }) => {
    if (!page) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Análise de Performance: ${page.name}`}>
            <div className={styles.modalContent}>
                <div className={styles.pageDetailHeader}>
                    <div className={styles.pageMainInfo}>
                        <div className={styles.largeIconBox}>
                            <Globe size={32} color="var(--slate-400)" />
                        </div>
                        <div className={styles.stateTitleGroup}>
                            <h2>{page.name}</h2>
                            <span>URL Canonical: https://operacao.bi{page.name.toLowerCase()}</span>
                        </div>
                    </div>
                    <div className={styles.stateMainMetric}>
                        <span className={styles.metricLabel}>Visualizações Únicas</span>
                        <strong className="tabular-nums">{page.value.toLocaleString('pt-BR')}</strong>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                        <div className={styles.statHeader}>
                            <Clock size={14} />
                            <span className={styles.statLabel}>Tempo Médio</span>
                        </div>
                        <strong>04m 32s</strong>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.statHeader}>
                            <MousePointer2 size={14} />
                            <span className={styles.statLabel}>Taxa de Rejeição</span>
                        </div>
                        <strong style={{ color: '#dc2626' }}>22.4%</strong>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.statHeader}>
                            <Layout size={14} />
                            <span className={styles.statLabel}>Dispositivos Móveis</span>
                        </div>
                        <strong>68.2%</strong>
                    </div>
                </div>

                <div className={styles.citySection}>
                    <h4 className={styles.tableTitle}>Distribuição por Canal de Entrada</h4>
                    <table className={styles.modalTable}>
                        <thead>
                            <tr>
                                <th>Fonte / Meio</th>
                                <th className={styles.alignRight}>Sessões</th>
                                <th className={styles.alignRight}>Novos Usuários</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { source: 'google / cpc', sessions: Math.floor(page.value * 0.45), news: '82%' },
                                { source: 'meta / ads', sessions: Math.floor(page.value * 0.25), news: '74%' },
                                { source: 'direto', sessions: Math.floor(page.value * 0.15), news: '12%' },
                                { source: 'afiliados', sessions: Math.floor(page.value * 0.10), news: '95%' },
                                { source: 'outros', sessions: Math.floor(page.value * 0.05), news: '60%' }
                            ].map((s, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: 'var(--slate-900)' }}>{s.source}</td>
                                    <td className={`tabular-nums ${styles.alignRight}`}>{s.sessions.toLocaleString('pt-BR')}</td>
                                    <td className={`tabular-nums ${styles.alignRight}`}>{s.news}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.actionRow}>
                    <button className={styles.viewAllBtn} style={{ flex: 1 }}>Ver Mapa de Calor</button>
                    <button className={styles.viewAllBtn} style={{ flex: 1, backgroundColor: 'var(--slate-900)', color: 'white' }}>Audit SEO Completo</button>
                </div>
            </div>
        </Modal>
    );
};

const AffiliateDetailModal = ({ isOpen, onClose, affiliate }) => {
    const [showChart, setShowChart] = useState(false);
    const [contactStatus, setContactStatus] = useState(null); // 'sending', 'sent'

    if (!affiliate) return null;

    const mockHistoryData = [
        { name: 'Jan', value: affiliate.value * 0.1 },
        { name: 'Fev', value: affiliate.value * 0.3 },
        { name: 'Mar', value: affiliate.value * 0.2 },
        { name: 'Abr', value: affiliate.value * 0.5 },
        { name: 'Mai', value: affiliate.value * 0.4 },
        { name: 'Jun', value: affiliate.value * 0.8 },
        { name: 'Jul', value: affiliate.value * 1.0 },
    ];

    const handleContact = () => {
        setContactStatus('sending');
        // Simular integração API
        setTimeout(() => {
            setContactStatus('sent');
            setTimeout(() => setContactStatus(null), 3000);
        }, 1500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Performance de Afiliado: ${affiliate.name}`}>
            <div className={styles.modalContent}>
                {contactStatus === 'sent' && (
                    <div className={styles.successToast}>
                        <CheckCircle2 size={16} />
                        <span>Solicitação enviada com sucesso ao afiliado!</span>
                    </div>
                )}
                <div className={styles.affiliateDetailHeader}>
                    <div className={styles.affiliateMainInfo}>
                        <div className={styles.largeIconBox} style={{ backgroundColor: 'var(--slate-900)', color: 'white' }}>
                            <Users size={32} />
                        </div>
                        <div className={styles.stateTitleGroup}>
                            <h2>{affiliate.name}</h2>
                            <span>ID: AFF-{Math.floor(Math.random() * 90000) + 10000} | Status: Ativo</span>
                        </div>
                    </div>
                    <div className={styles.stateMainMetric}>
                        <span className={styles.metricLabel}>Receita Gerada</span>
                        <strong className="tabular-nums" style={{ color: '#059669' }}>R$ {affiliate.value.toLocaleString('pt-BR')}</strong>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                        <div className={styles.statHeader}>
                            <TrendingUp size={14} color="#059669" />
                            <span className={styles.statLabel}>Leads Totais</span>
                        </div>
                        <strong>{affiliate.leads?.toLocaleString('pt-BR') || '0'}</strong>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.statHeader}>
                            <DollarSign size={14} />
                            <span className={styles.statLabel}>CPA Médio</span>
                        </div>
                        <strong>R$ 42,50</strong>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.statHeader}>
                            <BarChart3 size={14} />
                            <span className={styles.statLabel}>Tx. Conversão</span>
                        </div>
                        <strong style={{ color: '#3b82f6' }}>8.4%</strong>
                    </div>
                </div>

                {showChart && (
                    <div className={styles.chartToggleSection}>
                        <Chart data={mockHistoryData} title="Histórico de Receita Gerada" height={250} />
                    </div>
                )}

                <div className={styles.citySection}>
                    <h4 className={styles.tableTitle}>Histórico Recente de Indicações</h4>
                    <table className={styles.modalTable}>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Origem</th>
                                <th className={styles.alignRight}>Ação</th>
                                <th className={styles.alignRight}>Comissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { date: '12/02 - 14:20', source: 'Instagram / Direct', action: 'Cadastro', com: 'R$ 15,00' },
                                { date: '12/02 - 12:10', source: 'Telegram Group', action: 'Depósito FTD', com: 'R$ 150,00' },
                                { date: '11/02 - 22:45', source: 'YouTube Channel', action: 'Depósito FTD', com: 'R$ 150,00' },
                                { date: '11/02 - 18:30', source: 'Blog Post', action: 'Cadastro', com: 'R$ 15,00' },
                                { date: '11/02 - 14:00', source: 'WhatsApp / Broadcast', action: 'Retenção', com: 'R$ 45,00' }
                            ].map((h, i) => (
                                <tr key={i}>
                                    <td style={{ color: 'var(--slate-400)', fontSize: '11px' }}>{h.date}</td>
                                    <td style={{ fontWeight: 600 }}>{h.source}</td>
                                    <td className={styles.alignRight}>{h.action}</td>
                                    <td className={`tabular-nums ${styles.alignRight}`} style={{ color: '#059669', fontWeight: 700 }}>{h.com}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.actionRow}>
                    <button
                        className={`${styles.viewAllBtn} ${showChart ? styles.activeBtn : ''}`}
                        style={{ flex: 1 }}
                        onClick={() => setShowChart(!showChart)}
                    >
                        {showChart ? 'Recolher Gráfico' : 'Detalhamento Financeiro'}
                    </button>
                    <button
                        className={styles.viewAllBtn}
                        style={{ flex: 1, backgroundColor: 'var(--slate-900)', color: 'white' }}
                        onClick={handleContact}
                        disabled={contactStatus === 'sending'}
                    >
                        {contactStatus === 'sending' ? 'Enviando...' : 'Contatar Afiliado'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const RankingModal = ({ isOpen, onClose, title, items, type, onSelectItem }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Lista Completa: ${title}`}>
            <div className={styles.modalScrollable}>
                <table className={styles.fullTable}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{type === 'estado' ? 'Estado' : type === 'afiliado' ? 'Afiliado' : 'Página'}</th>
                            <th className={styles.alignRight}>{type === 'estado' || type === 'pagina' ? 'Acessos' : 'Receita (R$)'}</th>
                            {type === 'afiliado' && <th className={styles.alignRight}>Leads</th>}
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.map((item, i) => {
                            const globalIndex = (currentPage - 1) * itemsPerPage + i + 1;
                            return (
                                <tr key={globalIndex} className={styles.clickableRow} onClick={() => onSelectItem(item)}>
                                    <td><span className={styles.indexBadge}>{globalIndex}</span></td>
                                    <td className={styles.nameCell}>
                                        {type === 'estado' && (
                                            <div className={styles.flagContainer}>
                                                {item.uf ? (
                                                    <img src={`https://assets.codante.io/codante-apis/bandeiras-dos-estados/${item.uf.toLowerCase()}-full.svg`} alt={item.name} className={styles.flagImg} />
                                                ) : (
                                                    <span className={styles.flag}>-</span>
                                                )}
                                            </div>
                                        )}
                                        {item.name}
                                    </td>
                                    <td className={`tabular-nums ${styles.alignRight}`}>
                                        {type === 'afiliado' ? `R$ ${item.value.toLocaleString('pt-BR')}` : item.value.toLocaleString('pt-BR')}
                                    </td>
                                    {type === 'afiliado' && <td className={`tabular-nums ${styles.alignRight}`}>{item.leads}</td>}
                                    <td className={styles.alignRight}><ExternalLink size={14} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className={styles.pagination}>
                    <button
                        className={styles.pageBtn}
                        disabled={currentPage === 1}
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => prev - 1); }}
                    >
                        Anterior
                    </button>
                    <div className={styles.pageInfo}>
                        Página <strong>{currentPage}</strong> de {totalPages}
                    </div>
                    <button
                        className={styles.pageBtn}
                        disabled={currentPage === totalPages}
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => prev + 1); }}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const RankingList = ({ title, items, type = 'afiliado' }) => {
    const isMobile = useIsMobile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Initial limit of 6 items
    const displayItems = isExpanded ? items : items.slice(0, 6);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <h3 className={styles.title}>{title}</h3>
                    <span className={styles.subtitle}>{items.length} registros encontrados</span>
                </div>
                <button className={styles.viewAllBtn} onClick={() => setIsModalOpen(true)}>
                    {isMobile ? 'Ver Tudo' : 'Ver Todos'}
                </button>
            </div>

            <div className={`${styles.list} ${isExpanded ? styles.expandedList : ''}`}>
                {displayItems.map((item, index) => (
                    <div
                        key={index}
                        className={styles.item}
                        onClick={() => handleItemClick(item)}
                    >
                        <div className={styles.left}>
                            <div className={`${styles.rank} ${index === 0 ? styles.top1 : index === 1 ? styles.top2 : index === 2 ? styles.top3 : ''}`}>
                                {index + 1}
                            </div>
                            <div className={styles.info}>
                                <div className={styles.name}>
                                    {type === 'estado' && (
                                        <div className={styles.flagContainer}>
                                            <img src={`https://assets.codante.io/codante-apis/bandeiras-dos-estados/${item.uf?.toLowerCase()}-full.svg`} alt={item.name} className={styles.flagImg} />
                                        </div>
                                    )}
                                    {type === 'afiliado' && item.avatar && (
                                        <div className={styles.avatarContainer}>
                                            <img src={item.avatar} alt={item.name} className={styles.avatarImg} />
                                        </div>
                                    )}
                                    {item.name}
                                </div>
                                <span className={styles.extra}>{type === 'estado' || type === 'pagina' ? 'Acessos Diretos' : 'Volume de Conversão'}</span>
                            </div>
                        </div>
                        <div className={styles.value}>
                            {type === 'estado' || type === 'pagina'
                                ? item.value.toLocaleString('pt-BR')
                                : `R$ ${item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </div>
                    </div>
                ))}
            </div>

            <RankingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                items={items}
                type={type}
                onSelectItem={(item) => {
                    setSelectedItem(item);
                }}
            />

            {type === 'estado' && (
                <StateDetailModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    state={selectedItem}
                />
            )}

            {type === 'pagina' && (
                <PageDetailModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    page={selectedItem}
                />
            )}

            {type === 'afiliado' && (
                <AffiliateDetailModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    affiliate={selectedItem}
                />
            )}
        </div>
    );
};

export default RankingList;
