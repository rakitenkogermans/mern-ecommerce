import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

type LoaderProps = {};

const Loader: FC<LoaderProps> = () => {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
};

export { Loader };
