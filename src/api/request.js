/* eslint-disable prettier/prettier */
import axios from 'axios';
export class Requests {
    constructor() {}

    getUsers() {
        return axios({
                method: 'get',
                url: 'https://api.engage-sop.com/v1/users/read',

            })
            .then((result) => {
                var response = result.data;
                return response;

            }).catch(this.HandleError);

    }
    getSessions() {
        return axios({
                method: 'get',
                url: 'https://api.engage-sop.com/v1/sessions/read',

            })
            .then((result) => {
                var response = result.data.data;
                return response;

            }).catch(this.HandleError);

    }

    updateUser(user) {
        return axios({
                method: 'post',
                url: 'https://api.engage-sop.com/v1/users/update',
                data: user


            })
            .then((result) => {
                var response = result.data
                return response;

            }).catch(this.HandleError);

    }
    loginUser(user_email, user_auth_code) {
        const url = 'https://api.engage-sop.com/v1/users/auth/' + user_email + '/' + user_auth_code;

        return axios({
                method: 'get',
                url: url,
            })
            .then((result) => {
                alert(JSON.stringify(result))

                var response = result.data;
                return response;

            }).catch(this.HandleError);
    }

    HandleError(request) {
        // alert(JSON.stringify(request))
    }
}

export let requests = new Requests();