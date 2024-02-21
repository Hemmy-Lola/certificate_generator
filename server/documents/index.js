module.exports = ({ lastname, firstname, birthday, birthplace, option, mention }) => {
    const today = new Date();
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Certificate</title>
      <style>
        @font-face {
          font-family: "Dystopian Black";
          src: url("https://db.onlinewebfonts.com/t/20af36ba0a52c9a46fe2963f400bd77c.eot");
          src: url("https://db.onlinewebfonts.com/t/20af36ba0a52c9a46fe2963f400bd77c.eot?#iefix")format("embedded-opentype"),
          url("https://db.onlinewebfonts.com/t/20af36ba0a52c9a46fe2963f400bd77c.woff2")format("woff2"),
          url("https://db.onlinewebfonts.com/t/20af36ba0a52c9a46fe2963f400bd77c.woff")format("woff"),
          url("https://db.onlinewebfonts.com/t/20af36ba0a52c9a46fe2963f400bd77c.ttf")format("truetype"),
          url("https://db.onlinewebfonts.com/t/20af36ba0a52c9a46fe2963f400bd77c.svg#Dystopian Black")format("svg");
        }
    
        @font-face {
          font-family: "Open Sans";
          src: url("https://db.onlinewebfonts.com/t/629a55a7e793da068dc580d184cc0e31.eot");
          src: url("https://db.onlinewebfonts.com/t/629a55a7e793da068dc580d184cc0e31.eot?#iefix")format("embedded-opentype"),
          url("https://db.onlinewebfonts.com/t/629a55a7e793da068dc580d184cc0e31.woff2")format("woff2"),
          url("https://db.onlinewebfonts.com/t/629a55a7e793da068dc580d184cc0e31.woff")format("woff"),
          url("https://db.onlinewebfonts.com/t/629a55a7e793da068dc580d184cc0e31.ttf")format("truetype"),
          url("https://db.onlinewebfonts.com/t/629a55a7e793da068dc580d184cc0e31.svg#Open Sans")format("svg");
        }
    
        *{
            margin: 15px;
        }
        .container {
            position: relative;
            text-align: center; 
            align-items: center;
          }
      
          .certificate {
            position: relative;
            z-index: 1; 
          }
      
          .logo {
            margin: 15px;
            width: 160px;
            height: 69px;
            background-image: url('logo_hetic.svg');
          }
        
        h1 {
          font-size: 150px;
          font-family: "Dystopian Black";
          color: #14F5AA;
        }

        h2{
            font-family:30px;
            color: #181818;
            font-family: "Open Sans";
        }
    
        p {
          font-size: 25px;
          font-family: "Open Sans";
          color: #181818;
        }

        strong{
            font-family: "Dystopian Black";
            color: #181818;
        }
        
        >
      </style>
    </head>
    <body>
      <div class="container">
      <div class="logo"></div>
        <div class="certificate">
          <h2><i>Comité des Heticiens</i></h2>
          <h1>CERTIFICATE</h1>
          <p>Le comité national des développeurs d'Hetic à l'honneur après délibération d'attribuer à <strong>${lastname} ${firstname}</strong>, né(e) le <strong>${birthday}</strong> à <strong>${birthplace}</strong>, le diplôme de <strong>${option}</strong> avec la mention <strong>${mention}</strong>.</p>
          <p>Fait à Paris</p>
          <p>Le ${today.toLocaleDateString('fr-FR')} </p>
          <div class="president_signature">
          <p>Signature de la Présidente</p>
          <div class="signature">
           <div>
          </div>
          <div class="diplome_signature">
          <p>Signature du/de la Diplômé(e)</p>
          </div>
        </div>
      </div>
    </body>
    </html>
 `
}