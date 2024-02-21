import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';


class App extends Component {
  state = {
    lastname: '',
    firstname: '',
    birthday: '',
    birthplace: '',
    option: '',
    mention: '',
    candidates: [],
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value })

  createAndDownloadPdf = (id) => {
    const selectedCandidate = this.state.candidates.find(candidate => candidate.id === id);

    if (!selectedCandidate) {
        console.error('not found');
        return;
    }

    axios.post('/create-pdf', selectedCandidate)
        .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            const filename = `Diplôme_${selectedCandidate.firstname}_${selectedCandidate.lastname}.pdf`;
            saveAs(pdfBlob, filename);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


editCandidate = (index) => {
  const candidateToEdit = this.state.candidates[index];
  this.setState({
      lastname: candidateToEdit.lastname,
      firstname: candidateToEdit.firstname,
      birthday: candidateToEdit.birthday,
      birthplace: candidateToEdit.birthplace,
      option: candidateToEdit.option,
      mention: candidateToEdit.mention,
      editingIndex: index,
  });
}

addCandidate = () => {
  const { lastname, firstname, birthday, birthplace, option, mention, editingIndex } = this.state;
  const newCandidate = { id: uuidv4(), lastname, firstname, birthday, birthplace, option, mention };

  if (editingIndex !== -1) {
      const updatedCandidates = [...this.state.candidates];
      updatedCandidates.splice(editingIndex, 1);
      this.setState({ candidates: updatedCandidates, editingIndex: -1 });
  }

  this.setState(prevState => ({
      candidates: [...prevState.candidates, newCandidate],
      lastname: '',
      firstname: '',
      birthday: '',
      birthplace: '',
      option: '',
      mention: '',
  }));

  axios.post('/candidates', newCandidate)
      .then(response => {
          console.log('ajouté:', response.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}


handleEdit = () => {
  const { lastname, firstname, birthday, birthplace, option, mention, editingIndex } = this.state;
  const updatedCandidates = [...this.state.candidates];
  updatedCandidates[editingIndex] = { lastname, firstname, birthday, birthplace, option, mention };
  this.setState({
      candidates: updatedCandidates,
      lastname: '',
      firstname: '',
      birthday: '',
      birthplace: '',
      option: '',
      mention: '',
      editingIndex: -1, 
  });
}


  deleteCandidate = (index) => {
    const updatedCandidates = [...this.state.candidates];
    updatedCandidates.splice(index, 1); 
    this.setState({ candidates: updatedCandidates });
}

  render() {
    return (
      <div className="App">
        <div className="logo"></div>
        <h2>Générateur de Diplôme</h2>
        <p><i>Veuillez entrer les informations du candidat:</i></p>
        <div className="formulaire">
        <input type="text" placeholder="Nom" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
           <input type="text" placeholder="Prénom" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
           <input type="date" placeholder="Date de naissance" name="birthday" value={this.state.birthday} onChange={this.handleChange} />
           <input type="text" placeholder="Ville de naissance" name="birthplace" value={this.state.birthplace} onChange={this.handleChange} />
           <select name="option" onChange={this.handleChange}>
              <option value="">Sélectionnez un diplôme</option>
              <option value="Bachelor Developpement Web">Bachelor Developpement Web</option>
              <option value="Bachelor Data IA">Bachelor Data IA</option>
              <option value="Bachelor Webmarketing UX">Bachelor Webmarketing UX</option>
              <option value="Programme Grande Ecole">Programme Grande Ecole</option>
              <option value="Mastère CTO Tech Lead">Mastère CTO Tech Lead</option>
              <option value="Mastère Product Manager">Mastère Product Manager</option>
              <option value="Mastère Marketing Digital UX">Mastère Marketing Digital UX</option>
              <option value="Mastère Cybersécurité">Mastère Cybersécurité</option>
              <option value="Prépa Mastère Digital">Prépa Mastère Digital</option>
            </select>

            <select name="mention" onChange={this.handleChange}>
              <option value="">Sélectionnez une mention</option>
              <option value="Très Bien">Mention Très Bien</option>
              <option value="Bien">Mention Bien</option>
              <option value="Assez Bien">Mention Assez Bien</option>
              <option value="Admis">Mention Admis</option>
            </select>
          <button onClick={this.addCandidate}>Ajouter</button>
          <table className="">
             <thead>
               <tr>
                 <th>Nom</th>
                 <th>Prénom</th>
                 <th>Date de naissance</th>
                 <th>Ville de naissance</th>
                 <th>Diplôme</th>
                 <th>Mention</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {this.state.candidates.map((candidate, index) => (
                 <tr key={index}>
                   <td>{candidate.lastname}</td>
                   <td>{candidate.firstname}</td>
                   <td>{candidate.birthday}</td>
                   <td>{candidate.birthplace}</td>
                   <td>{candidate.option}</td>
                   <td>{candidate.mention}</td>
                   <td>
                     <div className='actions'>
                     <button onClick={() => this.editCandidate(index)}>Éditer</button>
                     <button onClick={() => this.deleteCandidate(index)}>Supprimer</button>
                     <button onClick={() => this.createAndDownloadPdf(candidate.id)}>Télécharger</button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      </div>
    );
  }
}

export default App;
