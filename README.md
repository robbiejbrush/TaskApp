# Task App

### Live App 
https://taskapprbrush.netlify.app

### Description 
A full-stack task management application that helps users organize, track, and prioritize their projects with an intuitive UI and real-time updates.

### Demo 
https://drive.google.com/file/d/1htLXvlKHdKHddtgVe76pNjfI_vGSd992/view?usp=sharing

### Screenshots
https://drive.google.com/drive/folders/13q1WaCDnJC93Qlvz7pyU0HouEJ-BfL1z?usp=sharing

### Database Schema
https://drive.google.com/file/d/1XSY6pHWDotbABGMOmzCU9pGrZ6elxuTL/view?usp=sharing

### Features

    -User authentication (Google OAuth login)
    -Create, join, and delete projects
    -Create, edit, and delete tasks
    -Task status tracking (To Do and Completed)
    -Task due dates
    -Responsive UI

### Technologies 

    Frontend- React, CSS 
    Backend- Node.js + Express
    Database- MySQL

    Frontend Deploy: Netlify
    Backend Deploy: Heroku + JawsDB

### Architecture

    -Client communicates with REST API
    -Authentication handled using JWT
    -Backend manages business logic and database operations
    -Data persisted in MySQL

### API Endpoints
    
    POST /api/auth

    GET /api/projects/userId
    GET /api/projects/projectId/users
    POST /api/projects/create
    POST /api/projects/join
    DELETE /api/projects/projectId
    DELETE /api/projects/projectId/leave/userId

    GET /api/tasks/projectId
    POST /api/tasks/create
    PUT /api/tasks/updateStatus/taskId
    PUT /api/tasks/edit/taskId
    DELETE /api/tasks/taskId

### Challenges

    -Implementing secure authentication with JWT
    -Managing state across pages effectively
    -Building responsive CSS for all screen dimensions
    -Deploying both the Frontend and Backend

### Author
Robbie Brush
