const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const pdfTemplate = require('./documents');

const app = express();
const port = process.env.PORT || 5000;

let candidates = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cette zone va nous servir à créer notre document PDF 
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), { format: 'Letter', orientation: 'landscape' }).toFile('diplome.pdf', (err) => {
        if (err) {
            res.status(500).send('Erreur lors de la création du PDF');
        } else {
            res.status(200).send('PDF créé avec succès');
        }
    });
});

// Alors que cette zone va plus être utiliser pour modifier les infos directement dans notre tableau
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/diplome.pdf`);
});


app.post('/candidates', (req, res) => {
    const newCandidate = req.body;
    candidates.push(newCandidate);
    res.status(201).json(newCandidate);
});


app.put('/candidates/:id', (req, res) => {
    const candidateId = req.params.id;
    const updatedCandidateData = req.body;

    const candidateIndex = candidates.findIndex(candidate => candidate.id === candidateId);
    if (candidateIndex !== -1) {
        candidates[candidateIndex] = updatedCandidateData;
        res.status(200).send('Diplômé mis à jour avec succès');
    } else {
        res.status(404).send('Diplômé non trouvé');
    }
});


app.delete('/candidates/:id', (req, res) => {
    const candidateId = req.params.id;

    const candidateIndex = candidates.findIndex(candidate => candidate.id === candidateId);
    if (candidateIndex !== -1) {
        candidates.splice(candidateIndex, 1);
        res.status(200).send('Candidat supprimé avec succès');
    } else {
        res.status(404).send('Candidat non trouvé');
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
