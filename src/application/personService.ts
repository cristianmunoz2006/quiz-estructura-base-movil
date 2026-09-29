import { NewPerson, Person } from '../domain/person';
import { personRepository } from '../infrastructure/repositories/personRepository';

export const personService = {
  register(data: NewPerson): void {
    const person = {
      name: data.name.trim(),
      document: data.document.trim(),
      phone: data.phone.trim(),
    };

    if (!person.name || !person.document || !person.phone) {
      throw new Error('Todos los campos son obligatorios');
    }

    try {
      personRepository.create(person);
    } catch {
      throw new Error('Ya existe una persona con ese documento');
    }
  },

  list(): Person[] {
    return personRepository.getAll();
  },
};
