import { createContext, useContext, useState } from 'react';
import { ReleaseProps } from '../@types/hooks';

interface ReleaseContextState {
  favoritesReleases: ReleaseProps[];
  addToFavorites: (release: ReleaseProps) => void;
}

const ReleaseContext = createContext<ReleaseContextState>({
  favoritesReleases: [],
  addToFavorites: () => {},
});

export const useFavorites = () => {
  const context = useContext(ReleaseContext);

  if (context === undefined) {
    throw new Error('useRelease must be used within a ReleaseProvider');
  }

  return context;
};

export const ReleaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoritesReleases, setFavoritesReleases] = useState<ReleaseProps[]>(
    [],
  );

  const addToFavorites = (release: ReleaseProps) => {
    const newFavoriteReleases = [...favoritesReleases, release];
    setFavoritesReleases(newFavoriteReleases);
  };

  const contextValue = {
    favoritesReleases,
    addToFavorites,
  };

  return (
    <ReleaseContext.Provider value={contextValue}>
      {children}
    </ReleaseContext.Provider>
  );
};

