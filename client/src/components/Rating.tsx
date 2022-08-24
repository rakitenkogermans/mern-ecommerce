import { FC } from 'react';
import { Star } from './Star';

const createArray = (length: number) => [...Array(length)];

type RatingProps = { value: number; text: string; totalStars: number };

const Rating: FC<RatingProps> = ({ value, text, totalStars }) => {
    return (
        <div className="rating d-flex align-items-center">
            {createArray(totalStars).map((_, i) => {
                const isHalf = value - 0.5 === i;
                return <Star key={i} selected={value > i} half={isHalf} />;
            })}
            <span className="ms-auto">{text && text}</span>
        </div>
    );
};

export { Rating };
