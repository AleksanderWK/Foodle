import styles from './KitchenPage.module.scss'
import { MealCreator } from './MealCreator'

interface Props {}

export const KitchenPage: React.FC<Props> = ({}: Props) => {
    return <MealCreator />
}
