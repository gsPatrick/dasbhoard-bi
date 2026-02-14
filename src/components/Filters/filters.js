"use client";

import { useState } from 'react';
import { Filter, Calendar, ChevronDown, Download } from 'lucide-react';
import styles from './filters.module.css';

const Filters = ({ onFilterChange }) => {
    const [activeRange, setActiveRange] = useState('30d');
    const [isOpen, setIsOpen] = useState(false);

    const ranges = [
        { id: '7d', label: '7 DIAS' },
        { id: '30d', label: '30 DIAS' },
        { id: '90d', label: '90 DIAS' },
        { id: 'custom', label: 'PERSONALIZADO' },
    ];

    const handleRangeChange = (rangeId) => {
        setActiveRange(rangeId);
        if (onFilterChange) onFilterChange(rangeId);
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.left}>
                <div className={styles.rangeTabs}>
                    {ranges.map((range) => (
                        <button
                            key={range.id}
                            className={`${styles.rangeTab} ${activeRange === range.id ? styles.active : ''}`}
                            onClick={() => handleRangeChange(range.id)}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.right}>
                <button className={styles.advancedFilter} onClick={() => setIsOpen(!isOpen)}>
                    <Filter size={16} />
                    <span>Filtros Avançados</span>
                    <ChevronDown size={14} className={isOpen ? styles.rotate : ''} />
                </button>

                <button className={styles.exportButton}>
                    <Download size={16} />
                    <span>Exportar PDF</span>
                </button>
            </div>
        </div>
    );
};

export default Filters;
