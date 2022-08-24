import { FC } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type StarProps = { selected: boolean; half: boolean; color?: string; size?: number };

const Star: FC<StarProps> = ({ selected, half, color = '#fcc000', size = 18 }) => {
    if (half) {
        return (
            <>
                <FaStarHalfAlt size={size} color={color} />
            </>
        );
    }
    return (
        <>
            {selected ? (
                <FaStar size={size} color={color} />
            ) : (
                <FaRegStar size={size} color={color} />
            )}
        </>
    );
};

export { Star };
