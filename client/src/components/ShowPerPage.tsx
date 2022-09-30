import { FC } from 'react';
import { Dropdown } from 'react-bootstrap';

type ShowPerPageProps = {
    text: string;
    optionsArray: number[] | string[];
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'danger'
        | 'light'
        | 'dark';
    changePerPage: (page: number) => void;
};

const ShowPerPage: FC<ShowPerPageProps> = ({
    text,
    optionsArray,
    variant = 'info',
    changePerPage,
}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant={variant} id="dropdown-basic">
                {text}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {optionsArray.map((item) => (
                    <Dropdown.Item key={item} onClick={changePerPage.bind(null, Number(item))}>
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export { ShowPerPage };
