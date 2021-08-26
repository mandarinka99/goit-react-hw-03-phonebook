import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import ContactsList from "./contactsList/ContactsList";
import Container from "./container/Container";
import CreateContactForm from "./createContactForm/CreateContactForm";
import FilterContacts from "./filterContacts/FilterContacts";


class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  };

  onHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (number, name) => {
    const find = this.state.contacts.find(contact =>
        contact.name.toLowerCase() === name.toLowerCase())
    if (find) return alert(`${name} is already in contacts`)
    const contactsArr = this.state.contacts;
    contactsArr.push({
      id: uuidv4(),
      name,
      number
    });
    this.setState({ 
      contacts: contactsArr,
    });
  };

  deleteContact = (id) => {
    const newContactsList = this.state.contacts.filter(contact =>
      contact.id !== id)
      this.setState({ 
        contacts: newContactsList,
      });
  }


  render() {
    let newFilter = this.state.contacts
    if (this.state.filter) {
      newFilter = this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))
     }

    console.log(this.state.filter)
    return (
      <Container>
        <h1>Phonebook</h1>
        <CreateContactForm 
          onSubmit={this.onSubmit} 
        />
        <h2>Contacts</h2>
        <FilterContacts onHandleChange={this.onHandleChange}/>
        <ContactsList 
          contacts={newFilter}
          deleteContact ={this.deleteContact}
        />
      </Container>
    );
  }
}
export default App;
