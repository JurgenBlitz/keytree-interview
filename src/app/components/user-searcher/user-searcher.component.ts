import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiManager } from '../../../services/axios/github-api';
import axios from 'axios';


@Component({
  selector: 'app-user-searcher',
  templateUrl: './user-searcher.component.html',
  styleUrls: ['./user-searcher.component.scss']
})
export class UserSearcherComponent implements OnInit {

  // Variables for form control
  userForm: FormGroup;
  userNameControl: AbstractControl;
  user: any;
  userRepos = [];
  userOrgs = [];
  loading: boolean;
  imageLoaded: boolean;

  // Variables for calls
  public BASE_URL = 'https://api.github.com';
  public errorMessage: string;
  public errorMessageLine2: string;

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.loading = false;
    this.imageLoaded = false;
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    // Pattern located at repo /shinnn/github-username-regex
    const gitHubUsernameregExp: RegExp = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(gitHubUsernameregExp)]]
    });
    this.userNameControl = this.userForm.get('userName');
  }

  public findUser() {
    delete this.user;
    delete this.userRepos;
    this.loading = true;

    if (this.userForm.valid) {
      const targetUser = this.userNameControl.value;
      this.getUserData(targetUser).then((data) => {
        this.user = data.user;
        if (data.orgs.length > 0) {
          this.userOrgs.push(data.orgs);
        }
        this.formatUserDate(this.user.updated_at);
        this.loading = false;

      }, (err) => {
        if (err.message.includes('404')) {
          this.errorMessage = 'No user found with the provided tag';
          this.errorMessageLine2 = 'Check your input or try again with a different username';
        } else {
          this.errorMessage = 'Oops!';
          this.errorMessageLine2 = 'Something went wrong. Please try again';
        }
        this.loading = false;
      });
    }
  }

  public seeUserRepos() {
    if (this.user) {
      this.getRepos(this.user.login).then((data) => {
        this.userRepos = data;
        console.log(this.userRepos);
      });
    }
  }

  // Date comes from API as an ISO string- this method formats it to dd/mm/yyy
  public formatUserDate(date: string) {
    const dateToFormat = new Date(date);
    const year = (dateToFormat.getFullYear()).toString();
    let month = (dateToFormat.getMonth() + 1).toString();
    let day = (dateToFormat.getDate()).toString();

    if (day.length < 2) {
      day = '0' + day;
    }
    if (month.length < 2) {
      month = '0' + month;
    }

    this.user.updated_at = day + '-' + month + '-' + year;
  }

  public getRepos(username) {
    const url = `${this.BASE_URL}/users/${username}/repos?per_page=250`;
    return axios.get(url).then(response => response.data);
  }

  public getUserData(username) {
    return axios
      .all([
        axios.get(`${this.BASE_URL}/users/${username}`),
        axios.get(`${this.BASE_URL}/users/${username}/orgs`)
      ])
      .then(([user, orgs]) => ({
        user: user.data,
        orgs: orgs.data
      }));
  }
}
