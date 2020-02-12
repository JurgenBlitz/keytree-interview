
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';


// Documentation is at https://developer.github.com/v3/
const BASE_URL = 'https://api.github.com';

@Injectable({
  providedIn: 'root'
})

export class ApiManager {
  constructor() { }

  getRepos(username) {
    const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
    return axios.get(url).then(response => response.data);
  }

  getUserData(username) {
    return axios
      .all([
        axios.get(`${BASE_URL}/users/${username}`),
        axios.get(`${BASE_URL}/users/${username}/orgs`)
      ])
      .then(([user, orgs]) => ({
        user: user.data,
        orgs: orgs.data
      }));
  }

}
