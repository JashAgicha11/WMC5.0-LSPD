import React, { useEffect, useState } from 'react';
import './Slideshow.css'; // Ensure this file is created
import image1 from './Assets/image1.jpg';
import image2 from './Assets/image2.jpg';
import image3 from './Assets/image3.jpg';
import image4 from './Assets/image4.jpg';
const images = [
    image1,
    image2,
    image3,
    image4,
];
const Slideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow-container h-screen w-screen">
            {
                images.map((image, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentImageIndex ? 'active' : ''} bg-cover`}
                    style={
                        { backgroundImage: `url(${image})`}
                    }
                >
                </div>
                ))
            }
        </div>
    );
};

export default Slideshow;
