import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventDetail } from '../apis/api';
import '../assets/css/Detail.css';

const Detail = () => {
    const { eventId } = useParams();
    const [eventDetail, setEventDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEventDetail = async () => {
            try {
                const data = await fetchEventDetail(eventId);
                setEventDetail(data);
            } catch (error) {
                console.error("Failed to fetch event detail:", error);
            } finally {
                setLoading(false);
            }
        };
        getEventDetail();
    }, [eventId]);

    if (loading) {
        return (
            <div className="detail-page">
                <p className="loading">Loading...</p>
            </div>
        );
    }

    if (!eventDetail) {
        return (
            <div className="detail-page">
                <p className="loading">Event not found.</p>
            </div>
        );
    }

    return (
        <div className="detail-page">
            <div className="detail-header">
                <h1 className="detail-title">{eventDetail.title}</h1>
            </div>
            <div className="detail-image-container">
                <img
                    src={eventDetail.event_image}
                    alt={eventDetail.title}
                    className="detail-image"
                />
            </div>
            <div className="detail-content">
                <p className="detail-description">{eventDetail.description}</p>
                <p className="detail-date">날짜: {eventDetail.date}</p>
            </div>
        </div>
    );
};

export default Detail;