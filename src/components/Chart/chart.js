"use client";

import useIsMobile from '@/hooks/useIsMobile';
import Modal from '@/components/Modal/modal';
import styles from './chart.module.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltipLabel}>{label}</p>
                <p className={styles.tooltipValue}>
                    <span className={styles.valueDot} />
                    {`R$ ${payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                </p>
            </div>
        );
    }
    return null;
};

const ChartModal = ({ isOpen, onClose, title, data }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Dados Detalhados: ${title}`}>
            <div className={styles.modalTableContainer}>
                <table className={styles.modalTable}>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th className={styles.alignRight}>Valor Bruto (R$)</th>
                            <th className={styles.alignRight}>Crescimento VS Ontem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td className={`tabular-nums ${styles.alignRight}`}>
                                    R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className={`tabular-nums ${styles.alignRight}`} style={{ color: '#059669' }}>
                                    +{(Math.random() * 5).toFixed(1)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className={styles.viewAllBtn}>Exportar Gráfico Completo (.CSV)</button>
            </div>
        </Modal>
    );
};

const Chart = ({ data, title, height = 300 }) => {
    const isMobile = useIsMobile();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.chartContainer} onClick={() => setIsModalOpen(true)}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <button className={styles.miniBtn} onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                }}>Ver Detalhes</button>
            </div>
            <div style={{ width: '100%', height: height }}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#AF1C30" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#AF1C30" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="0 0"
                            vertical={false}
                            stroke="#F1F5F9"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                            dy={10}
                            interval={isMobile ? 2 : 0}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                            tickFormatter={(value) => {
                                if (isMobile) return `R$ ${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`;
                                return `R$ ${value >= 1000 ? (value / 1000).toFixed(0) + ' mil' : value}`;
                            }}
                            width={isMobile ? 45 : 60}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#AF1C30"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            activeDot={{ r: 5, stroke: '#FFFFFF', strokeWidth: 2, fill: '#AF1C30' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <ChartModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                data={data}
            />
        </div>
    );
};

export default Chart;
