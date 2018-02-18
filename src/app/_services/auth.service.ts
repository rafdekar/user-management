import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "./../_models/user";
import 'rxjs/add/operator/take';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    constructor(private db: AngularFirestore, private router: Router) { }

    logout() {
        this.router.navigate(['login']);
    }

    login(username: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let user = this.db.collection<User>('users', ref => ref
                .where('username', '==', username)
                .where('password', '==', password))
                .valueChanges()
                .take(1);

            user.subscribe(user => {
                if (user.length > 0) {
                    console.log(user[0])
                    localStorage.setItem("user", user[0].username)
                    resolve("Logging successful!");
                } else {
                    reject("Wrong credentials!");
                }
            })
        })
    }

    register(newUser: User): Promise<string> {
        return new Promise((resolve, reject) => {
            let user = this.db.collection<User>('users', ref => ref
                .where('username', '==', newUser.username))
                .valueChanges()
                .take(1);

            user.subscribe(user => {
                if (user.length > 0) {
                    reject("This username already exists!");
                } else {
                    newUser.skills = [];
                    this.db.collection<User>('users').add({...newUser})
                        .then(val => resolve("Registering successful!"))
                        .catch(reason => reject(reason));
                }
            })
        })
    }
}