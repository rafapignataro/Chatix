<br />
<a href="https://chatix.com.br">
  <h1>Chatix</h1>
</a>
<h3>Chat em tempo real | <a href="https://chatix.com.br">View Demo</a></h3>
<a href="https://www.linkedin.com/in/rafael-pignataro/"><img alt="Linkedin" src="https://img.shields.io/badge/-Linkedin-blue" /></a>
</p>

Desenvolvi esse chat em tempo real como uma segunda versão do chat que fiz quando entrei na faculdade. Aprendi muita coisa desde lá e consegui evoluir ele muito bem. Não está finalizado totalmente, mas suas principais funções estão. Dessa forma, deixo o código dísponivel para inspirar e ajudar outras pessoas.

## Tecnologias
- Back-end: Node.js | Express | EJS
- Front-end: HTML | CSS | Javascript
- socket.io para troca de dados em tempo real

## :rocket: Rode no seu computador!

### 1: Clone o repositorio

```sh
git clone https://github.com/rafapignataro/Chatix.git
```

### 2: Instale as dependências
Com o cmd aberto, utilize cd para entrar no repositorio

```sh
cd Chatix
```

No projeto utilize npm install ou yarn install
```sh
npm install
```

### 3: Alterar algumas configurações
- Abra o arquivo "chat" na pasta Views.
- Altere o primeiro parametro da função connect:
  - Para rodar no wifi. Ex: "192.168.1.100:3000".
  - Para rodar local. Ex: "http://locahost:3000".
```sh
const socket = io.connect('https://chatix.com.br', { query: 'name=<%= user %>&avatar=<%= avatar %>'});
```
- Após isso no arquivo "chat", no local de "process.env.IP" coloque seu Ipv4 ou para rodar local, retire esse parametro

```sh
server.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log('server on...')
});
```
- Altere ele para as configurações do seu banco.

### 4: Rode o projeto
Para rodar, ainda no cmd, no diretório do projeto, digite:

```sh
npm start
```

#### 5 Agora é só acessá-lo via web: 
- http://localhost:3000 caso rode local
- http://SEU-IPV4:3000 caso seja na rede
