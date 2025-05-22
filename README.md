# Projeto Mottu - Sistema de Gerenciamento de Motos Elétricas
## Descrição do Projeto
O projeto Mottu é um sistema completo para gerenciamento de motos elétricas, desenvolvido com uma arquitetura de duas camadas:

1. Backend (Java Spring Boot) : API RESTful para gerenciamento de dados, incluindo motos, localizações e usuários.
2. Frontend (Next.js) : Interface web responsiva para interação com o sistema.
O sistema permite o cadastro e gerenciamento de motos elétricas, controle de localizações, monitoramento de disponibilidade e perfis de usuários.

## Funcionalidades Principais
- Cadastro e autenticação de usuários
- Cadastro e gerenciamento de motos
- Registro e controle de localizações
- Visualização de disponibilidade de motos
- Perfil de usuário personalizável

## Tecnologias Utilizadas

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

### Frontend
- Next.js
- React
- TypeScript
- CSS Modules
- React Icons

## Equipe de Desenvolvimento
- Afonso Correia Pereira - RM557863
- Adel Mouhaidly - RM557705 
- Tiago Augusto Desiderato - RM558485 

## Repositório GitHub
- https://github.com/afonsocp/ProjetoMottuJava

## Instruções para Execução

### Requisitos
- Java 11 ou superior
- Node.js 18 ou superior
- npm ou yarn
- MySQL (ou outro banco de dados configurado)

### Backend (Spring Boot)
1. Navegue até a pasta do projeto backend:
```
cd "c:\Users\Afonso\Desktop\Java Completo - Copia\projeto.sprint"
```

2. Compile o projeto com Maven:
```
mvnw clean install
```

3. Execute a aplicação:
```
mvnw spring-boot:run
```

O servidor backend estará disponível em: http://localhost:8080

### Frontend (Next.js)
1. Navegue até a pasta do projeto frontend:
```
cd "c:\Users\Afonso\Desktop\Java Completo - Copia\JavaFront\mottu"
```

2. Instale as dependências:
```
npm install
``` 

3. Execute o servidor de desenvolvimento:
``` 
npm run dev
``` 

O aplicativo frontend estará disponível em: http://localhost:3000

## Estrutura do Projeto

### Backend
- src/main/java/com/motoeletrica/controller : Controladores REST
- src/main/java/com/motoeletrica/model : Entidades JPA
- src/main/java/com/motoeletrica/service : Camada de serviço
- src/main/java/com/motoeletrica/dto : Objetos de transferência de dados

### Frontend
- src/components : Componentes reutilizáveis
- src/pages : Páginas da aplicação
- src/pages/styles : Estilos CSS modulares
- public : Recursos estáticos

## Fluxo de Uso
1. Acesse a página inicial e faça login ou cadastre-se
2. Navegue pelo menu lateral para acessar as funcionalidades
3. Cadastre motos e localizações
4. Visualize a disponibilidade das motos
5. Gerencie seu perfil de usuário

## Observações
- O sistema utiliza armazenamento local (localStorage) para algumas funcionalidades no frontend
- A API backend deve estar em execução para o funcionamento completo do sistema
- As credenciais padrão são armazenadas localmente durante o desenvolvimento
