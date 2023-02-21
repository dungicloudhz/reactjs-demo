import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';

import * as searchServices from '~/services/searchService';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { Wrapper as PopperWrapper } from '~/Components/Propper';
import AccountItem from '~/Components/AccountItem/AccountItem';
import 'tippy.js/dist/tippy.css';
import { SearchIcon } from '~/Components/Icons';
import { useDebounce } from '~/hooks';
import { Link } from 'react-router-dom';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    return (
        <div>
            <HeadlessTippy
                // appendTo={() => document.body}
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((item, index) => (
                                <Link to={'/' + item.nickname} key={index}>
                                    <AccountItem key={item.id} data={item} />
                                </Link>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                content="Tìm kiếm"
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
                    {/* Loading */}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        {/* Search */}
                        <SearchIcon className={cx('search-btn')} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
