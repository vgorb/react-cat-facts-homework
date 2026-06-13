import './App.css';
import CatFactsLoader from './components/CatFactsLoader';

function App() {
    return (
        <main className="app">
            <h1>Cat Facts App</h1>
            <p>Нажми на кнопку, чтобы загрузить данные из API.</p>

            <CatFactsLoader />
        </main>
    );
}

export default App;