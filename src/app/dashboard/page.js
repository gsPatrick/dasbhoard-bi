"use client";

import { useState } from 'react';
import Card from '@/components/Card/card';
import Chart from '@/components/Chart/chart';
import LeadsTable from '@/components/Table/table';
import Overview from '@/components/Overview/overview';
import RankingList from '@/components/Ranking/ranking';
import TrafficSource from '@/components/TrafficSource/traffic';
import Header from '@/components/layout/Header/header';
import useIsMobile from '@/hooks/useIsMobile';
import styles from './page.module.css';

// ... (kpiData, chartData, etc. remain the same)

// Dados Mockados - Grau Executivo (V2)
const kpiData = [
    { title: 'RECEITA LÍQUIDA', value: 2764120.00, trend: 'up', trendValue: 12.5, subtitle: 'Total Consolidado', isCurrency: true },
    { title: 'LEADS DE AQUISIÇÃO', value: 234567, trend: 'up', trendValue: 8.2, subtitle: 'Tx. Conv: 4.8%', isCurrency: false },
    { title: 'DEPÓSITOS TOTAIS (FTD)', value: 38794750.12, trend: 'down', trendValue: 2.4, subtitle: 'Operações Ativas', isCurrency: true },
    { title: 'ROI OPERACIONAL', value: 342, trend: 'up', trendValue: 15.1, subtitle: 'Eficiência de Marketing', isCurrency: false, isPercent: true },
];

const chartData = [
    { name: '14/01', value: 24000 }, { name: '16/01', value: 21000 }, { name: '18/01', value: 18000 },
    { name: '20/01', value: 22000 }, { name: '22/01', value: 32000 }, { name: '24/01', value: 28000 },
    { name: '26/01', value: 36000 }, { name: '28/01', value: 12000 }, { name: '30/01', value: 25000 },
    { name: '02/02', value: 29000 }, { name: '04/02', value: 15000 }, { name: '06/02', value: 32000 },
];

const afilliadosData = [
    { name: 'Afiliado FULL', value: 12998486.10, leads: 30623, avatar: 'https://i.pravatar.cc/150?u=full' },
    { name: 'Afiliado ORGANIC', value: 8331203.63, leads: 9727, avatar: 'https://i.pravatar.cc/150?u=organic' },
    { name: 'Afiliado PREMIUM_ADS', value: 2511361.95, leads: 3548, avatar: 'https://i.pravatar.cc/150?u=premium' },
    { name: 'Afiliado MASTER_TRAFFIC', value: 1484166.89, leads: 1946, avatar: 'https://i.pravatar.cc/150?u=master' },
    { name: 'Afiliado DIRECT_LINK', value: 1284090.47, leads: 1254, avatar: 'https://i.pravatar.cc/150?u=direct' },
    { name: 'Afiliado SOCIAL_MEDIA', value: 961320.33, leads: 1445, avatar: 'https://i.pravatar.cc/150?u=social' },
    { name: 'Afiliado INFLUENCER_A', value: 754200.00, leads: 980, avatar: 'https://i.pravatar.cc/150?u=influencer_a' },
    { name: 'Afiliado INFLUENCER_B', value: 642100.00, leads: 820, avatar: 'https://i.pravatar.cc/150?u=influencer_b' },
    { name: 'Afiliado EMAIL_MKG', value: 521300.00, leads: 1240, avatar: 'https://i.pravatar.cc/150?u=email' },
    { name: 'Afiliado SEO_EXPERT', value: 432100.00, leads: 560, avatar: 'https://i.pravatar.cc/150?u=seo' },
    { name: 'Afiliado TIKTOK_ADS', value: 321500.00, leads: 1430, avatar: 'https://i.pravatar.cc/150?u=tiktok' },
    { name: 'Afiliado TWITCH_STREAMS', value: 298400.00, leads: 670, avatar: 'https://i.pravatar.cc/150?u=twitch' },
    { name: 'Afiliado FACEBOOK_ADS', value: 245200.00, leads: 1100, avatar: 'https://i.pravatar.cc/150?u=facebook' },
    { name: 'Afiliado NATIVE_ADS', value: 187200.00, leads: 430, avatar: 'https://i.pravatar.cc/150?u=native' },
    { name: 'Afiliado BLOGGER_PRO', value: 154300.00, leads: 290, avatar: 'https://i.pravatar.cc/150?u=blogger' },
    { name: 'Afiliado TELEGRAM_BOT', value: 122100.00, leads: 890, avatar: 'https://i.pravatar.cc/150?u=telegram' },
    { name: 'Afiliado PODCAST_SPOT', value: 98400.00, leads: 150, avatar: 'https://i.pravatar.cc/150?u=podcast' },
    { name: 'Afiliado REFERRAL_P2P', value: 76500.00, leads: 320, avatar: 'https://i.pravatar.cc/150?u=p2p' },
    { name: 'Afiliado SMS_FLASH', value: 24300.00, leads: 1200, avatar: 'https://i.pravatar.cc/150?u=sms' },
];

const estadosData = [
    { name: 'São Paulo', value: 1340884, uf: 'SP' },
    { name: 'Rio de Janeiro', value: 493164, uf: 'RJ' },
    { name: 'Minas Gerais', value: 397626, uf: 'MG' },
    { name: 'Bahia', value: 275944, uf: 'BA' },
    { name: 'Paraná', value: 248790, uf: 'PR' },
    { name: 'Rio Grande do Sul', value: 245972, uf: 'RS' },
    { name: 'Pernambuco', value: 203642, uf: 'PE' },
    { name: 'Ceará', value: 185200, uf: 'CE' },
    { name: 'Pará', value: 162100, uf: 'PA' },
    { name: 'Santa Catarina', value: 154300, uf: 'SC' },
    { name: 'Goiás', value: 142800, uf: 'GO' },
    { name: 'Maranhão', value: 98500, uf: 'MA' },
    { name: 'Amazonas', value: 92400, uf: 'AM' },
    { name: 'Espírito Santo', value: 87600, uf: 'ES' },
    { name: 'Paraíba', value: 76400, uf: 'PB' },
    { name: 'Rio Grande do Norte', value: 65200, uf: 'RN' },
    { name: 'Mato Grosso', value: 62100, uf: 'MT' },
    { name: 'Alagoas', value: 54300, uf: 'AL' },
    { name: 'Piauí', value: 48900, uf: 'PI' },
    { name: 'Distrito Federal', value: 45600, uf: 'DF' },
    { name: 'Mato Grosso do Sul', value: 42300, uf: 'MS' },
    { name: 'Sergipe', value: 38700, uf: 'SE' },
    { name: 'Rondônia', value: 24500, uf: 'RO' },
    { name: 'Tocantins', value: 21200, uf: 'TO' },
    { name: 'Acre', value: 12400, uf: 'AC' },
    { name: 'Amapá', value: 9800, uf: 'AP' },
    { name: 'Roraima', value: 5600, uf: 'RR' },
];

const paginasData = [
    { name: '/CASINO', value: 1310860 },
    { name: '/pagina-inicial', value: 1024016 },
    { name: '/HOMEPAGE', value: 998966 },
    { name: '/BONUS', value: 627324 },
    { name: '/pagina-deposito', value: 518928 },
    { name: '/V.I.P', value: 425100 },
    { name: '/CASSINO-AO-VIVO', value: 398400 },
    { name: '/OTHERS', value: 378012 },
    { name: '/ESPORTES', value: 345200 },
    { name: '/PROMOCOES', value: 298100 },
    { name: '/CONTA/PERFIL', value: 245300 },
    { name: '/SUPORTE', value: 187200 },
    { name: '/TERMOS-E-CONDICOES', value: 154300 },
    { name: '/SEGURANCA', value: 122100 },
    { name: '/COMO-JOGAR', value: 98400 },
    { name: '/FAQ', value: 76500 },
    { name: '/CONTATO', value: 24300 },
];

const leadsData = [
    { id: 'L-9021', name: 'Ricardo Silveira', email: 'r.silveira@outlook.com', status: 'Confirmado', source: 'Google Ads', createdDate: '2026-02-12', value: 12500.00, avatar: 'https://i.pravatar.cc/150?u=9021' },
    { id: 'L-8822', name: 'Ana Maria Braga', email: 'ana.m@gmail.com', status: 'Pendente', source: 'Busca Orgânica', createdDate: '2026-02-12', value: 500.00, avatar: 'https://i.pravatar.cc/150?u=8822' },
    { id: 'L-3321', name: 'Fábio de Melo', email: 'f.melo@ig.com.br', status: 'Confirmado', source: 'Afiliados', createdDate: '2026-02-11', value: 2100.00, avatar: 'https://i.pravatar.cc/150?u=3321' },
    { id: 'L-6652', name: 'Juliana Paes', email: 'j.paes@globo.com', status: 'Confirmado', source: 'Meta Ads', createdDate: '2026-02-11', value: 4800.60, avatar: 'https://i.pravatar.cc/150?u=6652' },
    { id: 'L-9921', name: 'Sérgio Moro', email: 's.moro@gov.br', status: 'Cancelado', source: 'Direto', createdDate: '2026-02-10', value: 0.00, avatar: 'https://i.pravatar.cc/150?u=9921' },
];

export default function DashboardPage() {
    const isMobile = useIsMobile();
    const [selectedFilter, setSelectedFilter] = useState('mensal');

    // Função para simular mudança de dados conforme o filtro
    const getMultipliers = () => {
        switch (selectedFilter) {
            case 'hoje': return { val: 0.05, kpi: 1.02, leads: 10 };
            case 'semanal': return { val: 0.25, kpi: 1.15, leads: 50 };
            case 'trimestral': return { val: 3.0, kpi: 2.5, leads: 500 };
            case 'anual': return { val: 12.0, kpi: 10.0, leads: 2000 };
            default: return { val: 1.0, kpi: 1.0 };
        }
    };

    const multi = getMultipliers();

    // Formatação auxiliar
    const formatValue = (val, isCurrency, isPercent) => {
        if (isPercent) return `${val}%`;
        if (isCurrency) return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        return val.toLocaleString('pt-BR');
    };

    // Dados dinâmicos baseados no filtro
    const dynamicAfilliados = afilliadosData.map(a => ({ ...a, value: a.value * multi.val, leads: Math.floor(a.leads * multi.val) }));
    const dynamicEstados = estadosData.map(e => ({ ...e, value: Math.floor(e.value * multi.val) }));
    const dynamicPaginas = paginasData.map(p => ({ ...p, value: Math.floor(p.value * multi.val) }));
    const dynamicLeads = leadsData.map(l => ({ ...l, value: l.value * multi.val }));
    const dynamicChartData = chartData.map(d => ({ ...d, value: d.value * multi.val }));
    const dynamicKpis = kpiData.map(k => ({
        ...k,
        value: formatValue(k.value * multi.kpi, k.isCurrency, k.isPercent)
    }));

    return (
        <div className={styles.container}>
            <Header selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />

            <div className={styles.dashboardContent}>
                {/* Seção Superior: KPIs Flash */}
                <section className={styles.kpiSection}>
                    <div className={styles.gridHeader}>
                        <h3 className={styles.sectionTitle}>Métricas de Operação ({selectedFilter.toUpperCase()})</h3>
                        <p className={styles.sectionDescription}>Visão estratégica consolidada da performance global</p>
                    </div>
                    <div className={styles.kpiGrid}>
                        {dynamicKpis.map((kpi, index) => (
                            <Card key={index} {...kpi} />
                        ))}
                    </div>
                </section>

                {/* Seção Central: Visão Geral e Tendências */}
                <div className={styles.midGrid}>
                    <Overview totalValue={26794750.12 * multi.val} ftd={2450771 * multi.val} full={24343978 * multi.val} />
                    <div className={styles.chartMain}>
                        <Chart data={dynamicChartData} title="Tendência de Afluxo Financeiro (FTD)" height={380} />
                    </div>
                </div>

                {/* Seção de Performance: Afiliados e Tráfego */}
                <div className={styles.performanceGrid}>
                    <RankingList title="Top Afiliados (Valor)" items={dynamicAfilliados} type="afiliado" />
                    <TrafficSource />
                </div>

                {/* Seção de Rankings Detalhados */}
                <div className={styles.rankingsRow}>
                    <RankingList title="Ranking de Estados (Top 6)" items={dynamicEstados} type="estado" />
                    <RankingList title="Ranking de Páginas (Top 5)" items={dynamicPaginas} type="pagina" />
                </div>

                {/* Seção Final: Tabela de Leads */}
                <section className={styles.leadsSection}>
                    <div className={styles.gridHeader}>
                        <h3 className={styles.sectionTitle}>Detalhamento das Transações de Leads</h3>
                        <p className={styles.sectionDescription}>Rastreamento em tempo real de captação e conversão</p>
                    </div>
                    <LeadsTable data={dynamicLeads} />
                </section>
            </div>
        </div>
    );
}
