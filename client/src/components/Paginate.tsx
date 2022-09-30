import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

const createArray = (length: number) => [...Array(length)].map((_, index) => index + 1);

type PaginateProps = { page: number; pages: number; changePage: (page: number) => void };

const Paginate: FC<PaginateProps> = ({ page, pages, changePage }) => {
    return (
        <Pagination>
            <Pagination.First disabled={page === 1} onClick={changePage.bind(null, 1)} />
            <Pagination.Prev disabled={page === 1} onClick={changePage.bind(null, page - 1)} />
            {createArray(pages).map((number) => (
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={changePage.bind(null, number)}
                >
                    {number}
                </Pagination.Item>
            ))}
            <Pagination.Next disabled={page === pages} onClick={changePage.bind(null, page + 1)} />
            <Pagination.Last disabled={page === pages} onClick={changePage.bind(null, pages)} />
        </Pagination>
    );
};

export { Paginate };
