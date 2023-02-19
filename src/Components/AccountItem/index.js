import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Image src={data.avatar} className={cx('avatar')} alt={data.nickname} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    <FontAwesomeIcon className={cx('check')} icon={data.tick && faCheckCircle} />
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </div>
    );
}

export default AccountItem;
