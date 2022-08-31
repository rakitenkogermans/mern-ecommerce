import { FC, ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type MessageProps = {
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'danger'
        | 'light'
        | 'dark';
    children: ReactNode;
};

const Message: FC<MessageProps> = ({ variant = 'info', children }) => {
    return <Alert variant={variant}>{children}</Alert>;
};

export { Message };
