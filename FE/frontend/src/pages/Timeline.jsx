import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTimeline, fetchPeople } from '../apis/api';
import '../assets/css/Timeline.css';

const Timeline = () => {
    const { personId } = useParams();
    const [timeline, setTimeline] = useState([]);
    const [personName, setPersonName] = useState('');
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
            } catch (error) {
                console.error("Failed to fetch timeline data:", error);
            }
        };

        getPersonName();
        getTimeline();
    }, [personId]);

    return (
        <div className="timeline-page">
            <div className="person-header">
                <h1>{personName}</h1>
            </div>
            <div className="subtitle">타임라인</div>
            <ul className="timeline-list">
                {timeline.map((event) => (
                    <li
                        key={event.event_id}
                        className="timeline-item"
                        onClick={() => navigate(`/events/${event.event_id}`)}
                    >
                        <h3>{event.title}</h3>
                        <p>{event.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeline;
