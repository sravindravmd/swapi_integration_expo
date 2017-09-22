/**
 * Created by ravindras on 18/09/17.
 */

const BASE_URL = 'https://swapi.co/api/'

class Services {

    getStatus(response) {

        if ((response.status >= 200 && response.status <= 300) || response.status === 0) {
            return Promise.resolve(response)

            }
            return Promise.reject(response);
        }

    parseJson(response) {
        return response.json();
    };

    login(username) {
           return fetch(`${BASE_URL}people/?search=${username}`,
                       {
                            method: 'GET',
                            headers: {
                                "Content-type": "application/json"
                            }
                        })
               .then(this.getStatus)
               .then(this.parseJson);
    }
    search(text) {
        return fetch(`${BASE_URL}planets/?search=${text}`,
            {
                method: 'GET',
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(this.getStatus)
            .then(this.parseJson);
    }
}

export default service = new Services();
