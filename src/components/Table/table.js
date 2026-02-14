"use client";

import { ExternalLink, Mail, Phone, Calendar, User, TrendingUp, Clock, FileText, Share2, ChevronRight } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
import Modal from '@/components/Modal/modal';
import styles from './table.module.css';

const LeadDetailModal = ({ lead, isOpen, onClose }) => {
    if (!lead) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Perfil Completo do Lead">
            <div className={styles.modalGrid}>
                <div className={styles.leftCol}>
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Perfil do Lead</h4>
                        <div className={styles.profileHeader}>
                            <div className={styles.largeAvatar}>{lead.name.charAt(0)}</div>
                            <div>
                                <h3 className={styles.profileName}>{lead.name}</h3>
                                <span className={`${styles.badge} ${styles[lead.status.toLowerCase()]}`}>{lead.status}</span>
                            </div>
                        </div>
                        <ul className={styles.detailsList}>
                            <li><Mail size={14} /> {lead.email}</li>
                            <li><Phone size={14} /> +55 11 98765-4321</li>
                            <li><Share2 size={14} /> {lead.source}</li>
                            <li><Calendar size={14} /> {lead.createdDate}</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Histórico de Atividades</h4>
                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineContent}>
                                    <span className={styles.timelineDate}>Hoje, 14:20</span>
                                    <p className={styles.timelineText}>Tentativa de depósito via PIX (Valor: R$ 500,00)</p>
                                </div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineContent}>
                                    <span className={styles.timelineDate}>Ontem, 09:15</span>
                                    <p className={styles.timelineText}>Lead capturado via campanha Google Ads (Jogos Ao Vivo)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <div className={styles.metricsGrid}>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>Probabilidade</span>
                            <div className={styles.metricValue}>
                                {lead.probability}%
                                <TrendingUp size={16} className={styles.metricTrend} />
                            </div>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${lead.probability}%` }} />
                            </div>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricLabel}>Gerente Responsável</span>
                            <div className={styles.managerInfo}>
                                <div className={styles.smallAvatar}>R</div>
                                <span>Ricardo Mendes</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.financialSection}>
                        <h4 className={styles.sectionTitle}>Métricas Financeiras</h4>
                        <div className={styles.finGrid}>
                            <div className={styles.finItem}>
                                <span>Valor Atual do Lead</span>
                                <span className="tabular-nums">R$ {lead.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className={styles.finItem}>
                                <span>LTV Estimado</span>
                                <span className="tabular-nums">R$ 15.200,00</span>
                            </div>
                            <div className={styles.finItem}>
                                <span>ROI da Aquisição</span>
                                <span className="tabular-nums">12.4x</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Notas Operacionais</h4>
                        <div className={styles.notesBlock}>
                            <FileText size={16} />
                            <p>O lead demonstrou interesse em torneios de alto volume. Requer acompanhamento consultivo imediato para conversão em VIP.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const AllLeadsModal = ({ isOpen, onClose, onSelectLead }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Mock massivo de leads
    const massLeads = Array.from({ length: 50 }, (_, i) => ({
        id: `L-${9000 - i}`,
        name: ['Ricardo Silveira', 'Ana Maria Braga', 'Fábio de Melo', 'Juliana Paes', 'Sérgio Moro', 'Fernando Luiz', 'Patrícia Poeta'][i % 7],
        email: `user${i}@exemplo.com.br`,
        status: ['Confirmado', 'Pendente', 'Cancelado'][i % 3],
        source: ['Google Ads', 'Meta Ads', 'Afiliados', 'Direto'][i % 4],
        createdDate: '2026-02-12',
        value: Math.random() * 15000,
        probability: Math.floor(Math.random() * 100)
    }));

    const totalPages = Math.ceil(massLeads.length / itemsPerPage);
    const paginatedLeads = massLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Console CRM: Lista Completa de Leads">
            <div className={styles.modalContent}>
                <table className={styles.fullTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Origem</th>
                            <th className={styles.alignRight}>Valor</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedLeads.map((lead) => (
                            <tr key={lead.id} className={styles.clickableRow} onClick={() => onSelectLead(lead)}>
                                <td className="tabular-nums">{lead.id}</td>
                                <td className={styles.nameCell}>
                                    <div className={styles.smallAvatar}>{lead.name.charAt(0)}</div>
                                    {lead.name}
                                </td>
                                <td>
                                    <span className={`${styles.badge} ${styles[lead.status.toLowerCase()]}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td>{lead.source}</td>
                                <td className={`tabular-nums ${styles.alignRight}`}>
                                    R$ {lead.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className={styles.alignRight}><ExternalLink size={14} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.pagination}>
                    <button
                        className={styles.pageBtn}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        Anterior
                    </button>
                    <div className={styles.pageInfo}>
                        Página <strong>{currentPage}</strong> de {totalPages}
                    </div>
                    <button
                        className={styles.pageBtn}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const LeadsTable = ({ data }) => {
    const isMobile = useIsMobile();
    const [selectedLead, setSelectedLead] = useState(null);
    const [isViewAllOpen, setIsViewAllOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const displayData = isExpanded ? data : data.slice(0, 5);

    return (
        <div className={styles.container}>
            <div className={styles.tableHeader}>
                <button className={styles.viewAllMainBtn} onClick={() => setIsViewAllOpen(true)}>
                    Exibir Todos os Leads (CRM)
                </button>
            </div>

            {!isMobile ? (
                <div className={`${styles.tableWrapper} ${isExpanded ? styles.expandedTable : ''}`}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>NOME DO LEAD</th>
                                <th>E-MAIL</th>
                                <th>STATUS</th>
                                <th>FONTE</th>
                                <th>DATA CRIAÇÃO</th>
                                <th className={styles.alignRight}>VALOR</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {displayData.map((lead) => (
                                <tr key={lead.id} className={styles.row} onClick={() => setSelectedLead(lead)}>
                                    <td>
                                        <div className={styles.nameCell}>
                                            {lead.avatar ? (
                                                <div className={styles.avatarContainer}>
                                                    <img src={lead.avatar} alt={lead.name} className={styles.avatarImg} />
                                                </div>
                                            ) : (
                                                <div className={styles.avatarPlaceholder}>{lead.name.charAt(0)}</div>
                                            )}
                                            <span className={styles.name}>{lead.name}</span>
                                        </div>
                                    </td>
                                    <td className={styles.emailCell}>{lead.email}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[lead.status.toLowerCase()]}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className={styles.sourceCell}>{lead.source}</td>
                                    <td className={styles.dateCell}>{lead.createdDate}</td>
                                    <td className={`tabular-nums ${styles.currency} ${styles.alignRight}`}>
                                        {`R$ ${lead.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                                    </td>
                                    <td className={styles.actionCell}>
                                        <ExternalLink size={14} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={styles.mobileCardsContainer}>
                    {displayData.map((lead) => (
                        <div key={lead.id} className={styles.mobileCard} onClick={() => setSelectedLead(lead)}>
                            <div className={styles.mobileCardHeader}>
                                <div className={styles.nameCell}>
                                    {lead.avatar ? (
                                        <div className={styles.avatarContainer}>
                                            <img src={lead.avatar} alt={lead.name} className={styles.avatarImg} />
                                        </div>
                                    ) : (
                                        <div className={styles.avatarPlaceholder}>{lead.name.charAt(0)}</div>
                                    )}
                                    <div className={styles.mobileNameInfo}>
                                        <span className={styles.name}>{lead.name}</span>
                                        <span className={styles.mobileDate}>{lead.createdDate}</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className={styles.cardArrow} />
                            </div>
                            <div className={styles.mobileCardFooter}>
                                <span className={`${styles.badge} ${styles[lead.status.toLowerCase()]}`}>
                                    {lead.status}
                                </span>
                                <span className={styles.mobileValue}>
                                    R$ {lead.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isExpanded && data.length > 5 && (
                <button className={styles.expandBtn} onClick={() => setIsExpanded(true)}>
                    Exibir Mais
                </button>
            )}

            <AllLeadsModal
                isOpen={isViewAllOpen}
                onClose={() => setIsViewAllOpen(false)}
                onSelectLead={(lead) => {
                    setSelectedLead(lead);
                    // O usuário pode querer manter o modal de lista aberto ou fechar ao ver um lead?
                    // Geralmente fecha para focar no lead.
                    setIsViewAllOpen(false); // Fechar o modal de lista ao selecionar um lead para detalhe
                }}
            />

            <LeadDetailModal
                lead={selectedLead}
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
            />
        </div>
    );
};

export default LeadsTable;
