import React, {useEffect, useState} from 'react';
import Header from '../components/header/header';
import CarouselComponent from '../components/carousel/carousel';
import CommentComponent from '../components/comments/comments';
import imgSquare from '../../assets/images/square-bg.svg';
import imgCommunity from '../../assets/images/community.png';
import imgService1 from '../../assets/images/what-can-you-build.png';
import imgService2 from '../../assets/images/article-image-5.png';
import imgContact from '../../assets/images/icons/contact.svg';
import './landing.scss';
import Controller from './controller';
import Alert from '../components/alert/alert';

const Landing = () => {
    const abort = new AbortController();
    const signal = abort.signal;

    const controller = new Controller(signal);

    const [post, setPost] = useState({
        title: '',
        body: '',
    });
    
    const [alert, setAlert] = useState({
        fetch: false,
        loading: '',
        loaded: '',
        show: false
    });

    const [msgAlert, setMsgAlert] = useState({
        carousel: 'Cargando informacion de servicios',
        comment: 'Cargando comentarios'
    });

    const [Carousel, updateCarousel] = useState(
        <Alert loading={msgAlert.carousel} />);

    const [Comment, updateComment] = useState(
        <Alert loading={msgAlert.comment} />);

    useEffect(() => {
        (async ()=> {
            const  services = await controller._services(),
                comments = await controller._comments();
            
            updateCarousel(
                services?.status === 'error' ? 
                setMsgAlert({...msgAlert,carousel: services.message }) :
                <CarouselComponent data={services} />
            );

            updateComment(
                comments?.status === 'error' ? 
                setMsgAlert({...msgAlert, comment: comments.message }) :
                <CommentComponent data={comments} /> 
            );
        })();

        return () => abort.abort();
        
    }, []);

    const updatePostValues = (e)=> {
        const updatedPost = {
            ...post,
            ...controller.getInputValue(e.target)
        };
        setPost(updatedPost);
    }

    const submitPost = async (e) => {
        e.preventDefault();

        setAlert({
            loading: 'Enviando Post',
            loaded: false,
            show: true
        });

        const userId = parseInt(Math.random().toString().substring(2,3));
        const res = await controller._sendPost({
            title: post.title,
            body: post.body,
            userId
        });

        let loadEnd= {
            loading: false,
            loaded: '',
            show: true
        }

        if(res?.status === 'error') {
            loadEnd.loaded = 'Error al enviar Post.';
            setAlert({...alert, ...loadEnd});
            return;
        }

        loadEnd.loaded = 'Post enviado!';
        setAlert({...alert, ...loadEnd});
        setPost({title: '', body: ''});
    }

    const closeAlert = () => setAlert({...alert, show: false});

    return (
        <main className='container'>
            <Header />
            <section>

                <div className='presentation'>
                    <div>
                        <div>
                            <img src={imgCommunity} alt='bg-pres' />
                            <h2>
                                A Brand New Way <br /> To See The World
                            </h2>
                            <div>
                                <button className='btn primary'>Our Work</button>
                                <button className='btn outline'>Know More</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='services'>
                    <div>
                        <div>
                            <h2>The Process <br /> About Our Work</h2>
                            <p>Alejandro Laplana leads and adaptable end-to-end development
                                team <br /> consisting of a large portion of captable enterprise 
                                mixed reality solutions.</p>
                            <button className='btn outline'>Know More</button>
                        </div>
                        <img src={imgService1} alt='service' />
                    </div>

                    <div>
                        <img src={imgService2} alt='service' />
                        <div>
                            <h2>We are here to <br /> <span>always help you</span></h2>
                            <p>Shokworks team provide solutions and guidance to every<br /> project, 
                                taking the project vision to high level.</p>
                        </div>
                    </div>
                </div>

                <div className='services-details'>
                    <div>
                        <h1>
                            What is the <br /> 
                            <span>Speciality Of Us?</span>
                        </h1>
                        <div>
                            {Carousel}
                        </div>
                    </div>
                </div>

                <div className='associated'>
                    <div>
                        <h1>Our Partnes & Clients </h1>
                        <div>
                            <div>
                                <div className='card-container'>
                                    <div>
                                        <div><a href='#'>Learn More</a></div>
                                    </div>
                                    <div>
                                        <div><a href='#'>Learn More</a></div>
                                    </div>
                                    <div>
                                        <div><a href='#'>Learn More</a></div>
                                    </div>
                                </div>
                                <div className='card-container'>
                                    <div>
                                        <div><a href='#'>Learn More</a></div>
                                    </div>
                                    <div>
                                        <div><a href='#'>Learn More</a></div>
                                    </div>
                                    <div>
                                        <div><a href='#'>Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='comments'>
                    <div>
                        <div>
                            <h1>What Our <span>Client Says?</span></h1>
                            <div>
                                <div>   
                                    {Comment}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className='report-problem'>
                    <h1>Facing Problem? <br /> 
                        <span>Lets Get In Touch Now</span>
                    </h1>
                    <div>
                        <form onSubmit={submitPost}>
                            <div className='form-control'>
                                <label>Title</label>
                                <input 
                                    type='text'
                                    name='title'
                                    value={post.title}
                                    placeholder='Title'
                                    onChange={updatePostValues}
                                    required
                                />
                            </div>
                            <div className='form-control'>
                                <label>Body</label>
                                <textarea
                                    name='body'
                                    value={post.body}
                                    placeholder='body'
                                    onChange={updatePostValues}
                                    required
                                ></textarea>
                            </div>
                            <button type='submit' className='btn outline'>Our Works</button>
                            
                            {alert.show &&
                                <Alert 
                                    loading={alert.loading}
                                    loaded={alert.loaded}
                                    close={closeAlert}
                                />
                            }

                        </form>
                    </div>
                </div>

                <footer>
                    <div>
                        <div>
                            <div>
                                <ul>
                                    <li>Contact Us</li>
                                    <li>
                                        <object data={imgContact}>contact</object>
                                        +(1) 824-5428
                                    </li>
                                    <li>Miami, United States</li>
                                    <li>yfuentes@shokworks.io</li>
                                </ul>
                                <ul>
                                    <li>Our Company</li>
                                    <li>About</li>
                                    <li>Product</li>
                                    <li>Portafolio</li>
                                    <li>Career</li>
                                    <li>Blog</li>
                                </ul>
                                <ul>
                                    <li>Social Contacts</li>
                                    <li>Facebook</li>
                                    <li>Linked In</li>
                                    <li>Youtube</li>
                                    <li>Vimeo</li>
                                    <li>Skype</li>
                                </ul>
                            </div>

                            <div>
                                <label>Address</label>
                                <p>
                                    Internet Systems Consortium, Inc. 950 Charter Street Redwood City, CA USA.
                                </p>
                                <label>Follow Us</label>
                                <ul>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </footer>
            
            </section>
        </main>
    );
}

export default Landing;