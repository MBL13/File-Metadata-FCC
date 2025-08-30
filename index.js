var express = require('express');
var cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**/
// Configuração do multer
const storage = multer.memoryStorage();  // Armazenamento em memória
const upload = multer({ storage: storage });

// Rota POST para receber o arquivo e retornar os dados
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log("POST /api/fileanalyse - Iniciando o upload do arquivo");

  // Verifica se o arquivo foi enviado
  if (!req.file) {
    console.log("Nenhum arquivo foi enviado.");
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Extrair os dados do arquivo
  const file = req.file;
  const fileMetadata = {
    name: file.originalname,        // Nome original do arquivo
    type: file.mimetype,           // Tipo MIME do arquivo
    size: file.size                // Tamanho do arquivo em bytes
  };

  // Log para mostrar o arquivo recebido e seus detalhes
  console.log("Arquivo recebido:");
  console.log(`Nome do arquivo: ${file.originalname}`);
  console.log(`Tipo MIME: ${file.mimetype}`);
  console.log(`Tamanho do arquivo: ${file.size} bytes`);

  // Retorna as informações do arquivo em formato JSON
  res.json(fileMetadata);
});

/**/


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
