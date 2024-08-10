// import React, { useState, useEffect } from 'react';

// const FetchAnnouncements = () => {
//     const [announcements, setAnnouncements] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/announcements/list');
//                 if (response.ok) {
//                     const data = await response.json();
//                     setAnnouncements(data);
//                 } else {
//                     console.error('Failed to fetch announcements');
//                 }
//             } catch (error) {
//                 console.error('Error fetching announcements:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);