import React, { useState, useEffect } from 'react';
import { fetchPeople } from '../apis/api';
import Card from '../components/Card';
import '../assets/css/MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [people, setPeople] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getPeople = async () => {
        try {
            const data = await fetchPeople();
            setPeople(data);
        } catch (error) {
            console.error("Failed to fetch people data:", error);
        }
        };
        getPeople();
    }, []);

    return (
        <div className="main-page">
        <div className="subtitle">인물 선택</div>
        <div className="card-container">
            {people.map((person) => (
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
