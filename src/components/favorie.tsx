import { Heart } from "lucide-react";
import { MouseEvent } from "react";
import { AiFillHeart } from "react-icons/ai";

interface FavoriteProps {
    handleFavorite: () => void;
    isFavorite: boolean;
}

const Favorite = ({
    handleFavorite,
    isFavorite
}: FavoriteProps) => {

    const handleClickFavorite = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFavorite();
    }

    return (
        <div onClick={handleClickFavorite} className="absolute z-[4] top-3 right-3 w-8 h-8 flex flex-col items-center justify-center inner-shadow-xl cursor-pointer hover:scale-125 transition duration-150">
            <Heart 
            className="absolute unsit-0 z-[6] text-black"/>
            {isFavorite && <AiFillHeart 
            className="absolute unsit-0 z-[5] text-2xl text-back" />}
        </div>
    )
}

export default Favorite