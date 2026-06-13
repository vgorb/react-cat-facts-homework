import { useState } from 'react';
import axios from 'axios';
import { getCatFacts } from '../api/catFactsApi';
import CatFactCard from './CatFactCard';
import ErrorMessage from './ErrorMessage';

function CatFactsLoader() {
    const [facts, setFacts] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadFacts = async () => {
        setIsLoading(true);
        setError('');
        setFacts([]);

        try {
            const data = await getCatFacts();

            setFacts(data.data ?? []);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                const serverMessage = err.response?.data?.message;

                setError(
                    status
                        ? `Ошибка ${status}: ${serverMessage ?? 'Не удалось получить данные от API'}`
                        : 'Ошибка сети: API недоступен'
                );
            } else {
                setError('Произошла неизвестная ошибка');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="cat-facts-section">
            <button onClick={handleLoadFacts} disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Загрузить факты о котах'}
            </button>

            {error && <ErrorMessage message={error} />}

            <div className="facts-list">
                {facts.map((item) => (
                    <CatFactCard key={item.fact} fact={item.fact} />
                ))}
            </div>
        </section>
    );
}

export default CatFactsLoader;