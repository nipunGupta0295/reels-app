import React from 'react'

function VideoIo(props) {
    const handleMute = (e) =>{
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    return (
        <>
        <video className="video-styles" controls src={props.source} onClick={handleMute} muted="muted" type="video/mp4"></video>
        </>
    )
}

export default VideoIo
