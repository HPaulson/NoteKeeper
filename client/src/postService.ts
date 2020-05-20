import axios from 'axios'

const url = 'http://localhost:6969/api/posts/'

class postService {
    
    static async getPosts() {
                const resolve = await axios.get(url)
                const data = resolve.data
                console.log(data.data)
                return data.data.map((data) => ({
                    ...data,
                    createdAt: new Date(data.createdAt)
                }))
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
