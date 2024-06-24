import classNames from "classnames/bind";
import css from './Popper.module.scss'

const cx = classNames.bind(css)

function Wrapper( {children, className} ) {
    return <div className={cx('wrapper', className)}>
        {children}
    </div>
}
export default Wrapper;