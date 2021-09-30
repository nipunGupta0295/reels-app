import React, {useEffect, useState} from 'react'
import vid1 from './vid1.mp4';
import vid2 from './vid2.mp4';
import vid3 from './vid3.mp4';
import vid4 from './vid4.mp4';
import Video from './Video'
function Ioa() {
    const [sources, setSources] = useState([{url: vid1}, {url: vid2}, {url: vid3}, {url: vid4}]);
    const [count, setCount] = useState(0);
    const callback = (entries) =>{
        console.log(entries.length);
        entries.forEach(element =>{
            //console.log(element);
            entries.forEach((element) =>{
                console.log(element);
                let ele = element.target.childNodes[0];
                ele.play().then(() =>{
                    if(!ele.paused && ele.isIntersecting){
                        ele.pause();
                    }
                })       
            })
        })
    }
    const observer = new IntersectionObserver(callback, {
        threshold: 0.9
    })

    useEffect(() =>{
        console.log('Effect');
         let elements = document.querySelectorAll('.videos')
         elements.forEach(el=>{
             observer.observe(el)
         })

    })

    const countHandle = () =>{
        setCount(count+1);
    }
    return (
        <div className = 'video-container'>
            <button onClick={countHandle}>+</button>
            <div className='videos'>
                <Video source={sources[0].url} />
            </div>
            <div className='videos'>
                <Video source={sources[1].url} />
            </div>
            <div className='videos'>
                <Video source={sources[2].url} />
            </div>
            <div className='videos'>
                <Video source={sources[3].url} />
            </div>
            
        </div>
    )
}

export default Ioa
