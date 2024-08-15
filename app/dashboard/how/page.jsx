import React from 'react';

const YouTubeEmbed = () => {
    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
                src="https://www.youtube.com/embed/HxIF2h5MPw4"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '70%',
                    height: '70%',
                    border: 0,
                    marginTop: '35px',

                    marginLeft: '150px'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
            />
        </div>
    );
};

export default YouTubeEmbed;
