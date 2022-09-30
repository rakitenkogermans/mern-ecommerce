import { FC } from 'react';
import { Helmet } from 'react-helmet';

type MetaProps = { title?: string; description?: string; keywords?: string };

const Meta: FC<MetaProps> = ({
    title = 'Welcome To ProShop',
    description = 'We sell the best products for cheap',
    keywords = 'electronics, buy electronics, cheap electroincs',
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    );
};

export { Meta };
