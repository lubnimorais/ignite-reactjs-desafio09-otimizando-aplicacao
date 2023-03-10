import { lazy } from "react";
import { List, ListRowRenderer, AutoSizer } from 'react-virtualized';
 
// import { MovieCard } from "./MovieCard";

const MovieCard = lazy(async () => {
  return import("./MovieCard");
});

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <MovieCard key={movies[index].imdbID} 
          title={movies[index].Title} 
          poster={movies[index].Poster} 
          runtime={movies[index].Runtime} 
          rating={movies[index].Ratings[0].Value} />
      </div>
    )
  }

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          <AutoSizer>
            {({ width, height }) => (
              <List
              width={width}
              height={height}
              rowHeight={30}
              overscanRowCount={5}
              rowCount={movies.length}
              rowRenderer={rowRenderer}
            />
            )}
          </AutoSizer>

          {/* {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))} */}
        </div>
      </main>
    </div>
  )
}