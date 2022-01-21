import {useEffect, useState} from 'react';
import "./carousel.scss";

export default function Carousel ({data}) {

    const [state, setState] = useState({
        left: 0,
        currentPos: undefined
    });

    useEffect(() => {
        let ttl = data.length;
        let middle = ttl/2;
        let calcMiddle = parseInt(middle.toString().substring(0,1));
        let posInit = calcMiddle;
        
        if (ttl % 2 === 0) {
            ttl = ttl-1;
            middle = ttl/2;
            calcMiddle = parseInt(middle.toString().substring(0,1));
            posInit = calcMiddle;
        }
        
        let left = posInit * 320;
        
        left+=calcMargin(middle);
        setState({ 
            ...state, 
            left,
            currentPos: posInit
        });

    }, []);

    const calcMargin = (cant) => cant/0.5*17;

    const move = (dir, currentPos) => {
        if (dir === 'next' && currentPos < data.length-1) currentPos+=1;

        if (dir === 'prev' && currentPos > 0) currentPos-=1;

        if(state.currentPos !== currentPos) {
            let ajustMargin = currentPos === 0 ? 0.5 : currentPos + 0.5;
            let left = currentPos*320;
            left+=calcMargin(ajustMargin);

            setState({ 
                ...state, 
                left, 
                currentPos
            });
        }
    };

    return (
        <div className='__carousel'>
            <div>
                <div className='__card-viewport'>
                    <div className='__cards-container' style={{'--left': `-${state.left}px`}}>
                        {data.map((data, key) => (
                            <div className="__card" key={key}>
                                <div style={{"--bg": `url('${data.urlToImage}')`}}></div>
                                <div>
                                    <h3>{data.title}</h3>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        ))}   
                    </div>   
                </div>
            </div>
            <div>
                <button onClick={e => move('prev', state.currentPos)}></button>
                <button onClick={e => move('next', state.currentPos)}></button>
            </div>
        </div>
    )
}