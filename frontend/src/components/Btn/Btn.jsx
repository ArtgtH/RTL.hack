import { Link } from 'react-router-dom'
import styles from './Btn.module.scss'

const Btn = (props) => {
    const {
        type = "tonal",
        children,
        onClick,
        className,
        to = "",
        width,
    } = props;
    return (
        <Link
            to={to}
            className={`${className} ${styles.btn} ${styles[type]}`}
            onClick={onClick}
            style={{ width: width }}
        >
            {children}
        </Link>
    );
};

export default Btn;
