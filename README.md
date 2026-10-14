# Sistema de Gestión de Proyectos de Software

API REST con Node.js, Express y Sequelize/MySQL.

## Requisitos

- Node.js y npm
- MySQL

## Instalación y ejecución

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   git clone https://github.com/Ale-ipf/solucion-primer-parcial-tlp2-caballero-alejandro.git
   cd solucion-primer-parcial-tlp2-caballero-alejandro
   npm install
   ```
2. Copiar `.env.example` a `.env` y configurar la conexión a MySQL y `JWT_SECRET`.
3. Crear en MySQL la base de datos indicada por `DB_NAME`.
4. Iniciar el servidor:
   - Desarrollo: `npm run dev`
   - Producción: `npm start`

El servidor escucha en el puerto configurado en `PORT`.

## Endpoints

Las rutas protegidas requieren iniciar sesión. El token se envía mediante la cookie `token`.

| Método | Ruta | Acceso |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Público |
| `POST` | `/api/auth/login` | Público |
| `POST` | `/api/auth/logout` | Usuario autenticado |
| `GET` | `/api/users` | Administrator |
| `DELETE` | `/api/users/:id` | Administrator |
| `POST` | `/api/projects` | Usuario autenticado |
| `GET` | `/api/projects` | Administrator |
| `GET` | `/api/projects/my-projects` | Usuario autenticado |
| `PUT` | `/api/projects/:id` | Líder del proyecto |
| `DELETE` | `/api/projects/:id` | Líder del proyecto |
| `POST` | `/api/technologies` | Administrator |
| `GET` | `/api/technologies` | Usuario autenticado |
| `DELETE` | `/api/technologies/:id` | Administrator |