import { post } from "@/components/articles";
import { useEffect, useState } from "react";
import { create } from "zustand"


interface updateFavoriteProps {
    reloadFavorites: boolean,
    updateFavorites: () => void
}

export const useUpdateFavortie = create<updateFavoriteProps>(set => ({
    reloadFavorites: false,
    updateFavorites: () => set(state => ({ reloadFavorites: !state.reloadFavorites}))
}))

export default function useFavorite () {

    const {reloadFavorites, updateFavorites} = useUpdateFavortie();

    const [favoritePosts, setFavoritePosts] = useState([])

  useEffect(() => {
    const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')!) || [];
    setFavoritePosts(favoritePosts);
  },[reloadFavorites]);

  const isFavorite = (post: post) => {
    return favoritePosts?.some((favorite: post) => favorite.id === post?.id);
  }

  const handleFavorite = async (post: post) => {
    const isFavorited = isFavorite(post);
    const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')!) || [];

    if (isFavorited) {
      const filteredProducts = favoritePosts.filter((favorite: post) => {
        return favorite.id !== post?.id;
      })
      localStorage.setItem('favoritePosts', JSON.stringify(filteredProducts));
    } else {
      favoritePosts.push(post)
      localStorage.setItem('favoritePosts', JSON.stringify(favoritePosts));
    }
    updateFavorites();
  }

  return {
    favoritePosts,
    isFavorite,
    handleFavorite,
  }
}