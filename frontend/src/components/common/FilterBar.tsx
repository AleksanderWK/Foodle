import styles from './FilterBar.module.scss'
import { Pill } from './Pill'
import { SearchFilter } from './SearchField'

interface Props {
    filters: SearchFilter[]
    onFilterToggle: (filter: SearchFilter) => void
    currentFilters: SearchFilter[]
}

export const FilterBar: React.FC<Props> = ({
    filters,
    onFilterToggle,
    currentFilters,
}: Props) => {
    return (
        <div className={styles.barContainer}>
            {filters.map((filter) => (
                <Pill
                    onClick={() => onFilterToggle(filter)}
                    title={filter}
                    key={filter}
                    toggled={currentFilters.indexOf(filter) != -1}
                />
            ))}
        </div>
    )
}
