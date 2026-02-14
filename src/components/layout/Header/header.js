"use client";

import { Search, Bell, User, Calendar, Menu, Filter, X } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
import Modal from '@/components/Modal/modal';
import styles from './header.module.css';

const Header = ({ selectedFilter, onFilterChange }) => {
    const isMobile = useIsMobile();
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const FilterContent = () => (
        <div className={styles.filterModalContent}>
            <p className={styles.filterDescription}>Selecione o período para análise dos dados:</p>
            <div className={styles.filterGrid}>
                {['hoje', 'semanal', 'mensal', 'trimestral', 'anual', 'personalizado'].map((filter) => (
                    <button
                        key={filter}
                        className={`${styles.filterOption} ${selectedFilter === filter ? styles.activeFilter : ''}`}
                        onClick={() => {
                            onFilterChange(filter);
                            setIsFilterModalOpen(false);
                        }}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <header className={styles.header}>
            <div className={styles.topRow}>
                <div className={styles.leftSection}>
                    {isMobile && <Menu size={20} className={styles.mobileMenu} />}
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>V</div>
                        {!isMobile && <span className={styles.logoText}>VMageste</span>}
                    </div>
                </div>

                {!isMobile && (
                    <div className={styles.searchContainer}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Pesquisar leads, transações ou afiliados..."
                            className={styles.searchInput}
                        />
                    </div>
                )}

                <div className={styles.rightSection}>
                    {isMobile && (
                        <button className={styles.iconButton} onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search size={20} />
                        </button>
                    )}

                    {!isMobile ? (
                        <div className={styles.datePicker}>
                            <Calendar size={18} />
                            <select
                                className={styles.dateSelector}
                                value={selectedFilter}
                                onChange={(e) => onFilterChange(e.target.value)}
                            >
                                <option value="hoje">Hoje</option>
                                <option value="semanal">Semanal</option>
                                <option value="mensal">Mensal</option>
                                <option value="trimestral">Trimestral</option>
                                <option value="anual">Anual</option>
                                <option value="personalizado">Personalizado</option>
                            </select>
                        </div>
                    ) : (
                        <button className={styles.iconButton} onClick={() => setIsFilterModalOpen(true)}>
                            <Filter size={20} />
                        </button>
                    )}

                    <button className={styles.iconButton}>
                        <Bell size={20} />
                        <span className={styles.notificationDot} />
                    </button>

                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>
                            <User size={18} />
                        </div>
                        {!isMobile && (
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>Console Executivo</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isMobile && isSearchOpen && (
                <div className={styles.mobileSearchOverlay}>
                    <div className={styles.mobileSearchContainer}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className={styles.searchInput}
                            autoFocus
                        />
                        <button onClick={() => setIsSearchOpen(false)} className={styles.closeSearch}>
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            <Modal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                title="Filtrar Período"
            >
                <FilterContent />
            </Modal>
        </header>
    );
};

export default Header;
