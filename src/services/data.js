class Data {

    #signal;
    
    constructor(signal){
        this.#signal = signal;
    }

    async fetch(url) {
        const res = await fetch(url, {signal: this.#signal});
        return res.json();
    }

    response(status, message) {
        return {status, message};
    }

    async getData (urls) {
        try {
            if (!Array.isArray(urls)) throw new Error('Parametro urls, debe ser de tipo array');

            for (let i in urls) { urls[i] = this.fetch(urls[i]); }
            
            return await Promise.all(urls);

        } catch(error) {
            return this.response('error', error);
        }
    }
    
    async _services() {
        const urls = ['https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=793dba4852704c1083ec53961fc6195d'];

        try {
            const data = await this.getData(urls);

            if (data?.status === 'error') throw new Error(data.message);
            
            if (data[0]?.status === 'ok') return data[0].articles;

            throw new Error('Error al obtener data desde la API')
            
        } catch(error) {
            return this.response('error', error.message);
        }
    }

    async _comments() {
        const urls = [
            'https://jsonplaceholder.typicode.com/comments',
            'https://jsonplaceholder.typicode.com/users',
            'https://jsonplaceholder.typicode.com/photos'
        ];
        try {
            
            const data = await this.getData(urls);
            
            if (data?.status === 'error') throw new Error(data.message || 'Error al obtener datos desde la API');

            const comments = data[0], users = data[1], photos = data[2];
            
            users.forEach((user, key) => {
                user.comment = comments.find((comment) => comment.id === user.id);
                user.photo = photos.find((photo) => photo.id === user.id);
            });

            return users;

        } catch (error) {
            return this.response('error', error.message);
        }
    }

    async _sendPost(data) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        return await response.json();        
    }

}
export default Data;