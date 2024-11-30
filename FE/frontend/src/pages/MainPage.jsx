import React, { useState, useEffect } from 'react';
import { fetchPeople } from '../apis/api';
import Card from '../components/Card';
import '../assets/css/MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [people, setPeople] = useState([]);
    const [query, setQuery] = useState(''); // 검색어 상태 추가
    const [filteredPeople, setFilteredPeople] = useState([]); // 필터링된 인물 데이터
    const navigate = useNavigate();

    useEffect(() => {
        const getPeople = async () => {
            try {
                const data = await fetchPeople();
                setPeople(data);
                setFilteredPeople(data); // 초기 데이터 설정
            } catch (error) {
                console.error("Failed to fetch people data:", error);
            }
        };
        getPeople();
    }, []);

    // 검색어 변경 시 필터링
    useEffect(() => {
        if (!query) {
            setFilteredPeople(people); // 검색어가 없으면 전체 데이터
        } else {
            const lowerCaseQuery = query.toLowerCase();
            setFilteredPeople(
                people.filter(
                    (person) =>
                        person.name.toLowerCase().includes(lowerCaseQuery) ||
                        person.description.toLowerCase().includes(lowerCaseQuery)
                )
            );
        }
    }, [query, people]);

    return (
        <div className="main-page">
            <div className="subtitle">인물 선택</div>
            
            {/* 검색 입력 필드 */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="card-container">
                {filteredPeople.map((person) => (
                    <Card
                        key={person.person_id}
                        name={person.name}
                        image={person.people_image}
                        description={person.description}
                        personId={person.person_id}
                        onClick={() => navigate(`/people/${person.person_id}/events`)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default MainPage;
