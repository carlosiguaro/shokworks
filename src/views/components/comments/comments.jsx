import {useEffect, useState} from 'react';
import "./comments.scss";

export default function Comments ({data}) {

    const [state, setState] = useState({
        position: 0,
        info: data[0]
    });

    const showComment = ({dir, currentPos}) => {
         let position = dir === 'prev' && currentPos === 0 ? data.length-1 :
            dir === 'next' && currentPos === data.length-1 ? 0 :
            dir === 'prev' ? currentPos-1 : currentPos+1;

        setState({
            ...state,
            position,
            info: {
                ...data[position]
            }
        })

    };

    return (
        <div className="__comments">
            <div>
                <div>
                    <div style={{"--bg": `url('${state.info.photo.url}')`}}></div>
                    <div>
                        <p>{state.info.comment.body}</p>
                        <label>{state.info.name}</label>
                        <label>CEO, Zexbay-Fine</label>
                    </div>
                    <div>
                        <button 
                            onClick={e => showComment({dir: 'prev', currentPos: state.position})}>
                        </button>
                        <button 
                            onClick={e => showComment({dir: 'next', currentPos: state.position})}>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}