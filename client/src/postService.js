import axios from 'axios'

const url = 'http://localhost:80/api/posts/'

class postService {
    
    static getPosts() {
        return new Promise(async (res, rej) => {
            try {
                const resolve = await axios.get(url)
                const data = resolve.data
                console.log(data.data)
                res(data.data.map((data) => ({
                    ...data,
                    createdAt: new Date(data.createdAt)
                })))
            }
            catch (e) {
                rej(e)
            }
        })
    }

    static makePost(text) {
        return axios.post(url, {
            text
        })
        }
    
    static deletePost(id) {
        return axios.delete(url + id, {
        })
    }

    static editPost(id, text) {
        return axios.post(url + '/edit/' + id, {
            text
        })
        }
}

export default postService
