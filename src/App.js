import { useEffect, useState } from "react";
import "./App.css";
import Movie from "./Movie";
import Filter from "./Filter";
import { motion, AnimatePresence } from "framer-motion";

function App() {
	const [popular, setPopular] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [activeGenre, setActiveGenre] = useState(0);

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGNjOWY0YjAxNTdjNzFlYWFhZTNjN2RmMDY0NmFlMSIsInN1YiI6IjY0ODQxN2IzYzlkYmY5MDEzYTA2NjM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.baLgTvsa3hBzETOTz2q-EQ0k59w0JcO7Me2m7SITXxE",
			},
		};

		const data = await fetch(
			"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
			options
		);
		const movies = await data.json();
		console.log(movies);

		setPopular(movies.results);
		setFiltered(movies.results);
	};

	return (
		<div className="App">
			<Filter
				popular={popular}
				setFiltered={setFiltered}
				activeGenre={activeGenre}
				setActiveGenre={setActiveGenre}
			/>
			<motion.div layout className="popular-movies">
				<AnimatePresence>
					{filtered.map((item) => (
						<Movie key={item.id} movie={item} />
					))}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}

export default App;
