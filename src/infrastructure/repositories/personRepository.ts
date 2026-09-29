import { db } from '../database/database';
import { NewPerson, Person } from '../../domain/person';

export const personRepository = {
  create(person: NewPerson): void {
    db.runSync(
      'INSERT INTO persons (name, document, phone) VALUES (?, ?, ?)',
      person.name,
      person.document,
      person.phone
    );
  },

  getAll(): Person[] {
    return db.getAllSync<Person>('SELECT id, name, document, phone FROM persons ORDER BY id DESC');
  },
};
