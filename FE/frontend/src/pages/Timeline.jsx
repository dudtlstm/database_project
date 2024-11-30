import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTimeline, fetchPeople } from '../apis/api';
import '../assets/css/Timeline.css';

const Timeline = () => {
    const { personId } = useParams();
    const [timeline, setTimeline] = useState([]);
    const [personName, setPersonName] = useState('');
    const [query, setQuery] = useState(''); // 검색어 상태 추가
    const [filteredTimeline, setFilteredTimeline] = useState([]); // 필터링된 결과
    const navigate = useNavigate();

    useEffect(() => {
        const getPersonName = async () => {
            try {
                const peopleData = await fetchPeople();
                const person = peopleData.find((p) => p.person_id === parseInt(personId, 10));
                if (person) {
                    setPersonName(person.name);
                }
            } catch (error) {
                console.error("Failed to fetch person name:", error);
            }
        };

        const getTimeline = async () => {
            try {
                const data = await fetchTimeline(personId);
                setTimeline(data);
                setFilteredTimeline(data); // 초기 데이터 설정
            } catch (error) {
                console.error("Failed to fetch timeline data:", error);
            }
        };

        getPersonName();
        getTimeline();
    }, [personId]);

    // 검색어 변경 시 필터링
    useEffect(() => {
        if (!query) {
            setFilteredTimeline(timeline); // 검색어가 없으면 전체 데이터
        } else {
            const lowerCaseQuery = query.toLowerCase();
            setFilteredTimeline(
                timeline.filter(
                    (event) =>
                        event.title.toLowerCase().includes(lowerCaseQuery) ||
                        event.description.toLowerCase().includes(lowerCaseQuery)
                )
            );
        }
    }, [query, timeline]);

    return (
        <div className="timeline-page">
            <div className="person-header">
                <h1>{personName}</h1>
            </div>
            <div className="subtitle">타임라인</div>
            
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

            <ul className="timeline-list">
                {filteredTimeline.map((event) => (
                    <li
                        key={event.event_id}
                        className="timeline-item"
                        onClick={() => navigate(`/events/${event.event_id}`)}
                    >
                        <h3 className="event-title">{event.title}</h3>
                        <p className="event-date">{event.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeline;
