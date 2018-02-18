import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../_models';
import { Skill } from '../_models/skill';

@Injectable()
export class UserService {
    
    constructor( private db: AngularFirestore ) {}

    getUsers() {
        return this.db.collection<User>('users').valueChanges();
    }

    getUser(username: string) {
        return this.db.collection<User>('users', ref => ref.where('username', '==', username)).valueChanges();
    }

    getSkills(username: string) {
        return this.db.collection<Skill>('skills', ref => ref.where('username', '==', username)).valueChanges();
    }

    addSkill(newSkill: Skill) {
        this.db.collection('skills').add({...newSkill});
    }

    updateSkill(newSkill: Skill) {
        this.db.collection('skills', ref => ref.where('username', '==', newSkill.username).where('name', '==', newSkill.name)).snapshotChanges().subscribe(skill => {
            this.db.doc('skills/' + skill[0].payload.doc.id).update(newSkill);
        })
    }
}