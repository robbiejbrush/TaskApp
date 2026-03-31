# Task App

Live App: https://taskapprbrush.netlify.app

Description: A full-stack task management application that helps users organize, track, and prioritize their projects with an intuitive UI and real-time updates.

Starting Guide: On launch, login through your Google account. You can then create or join a project, then begin creating and finishing tasks for that project.

Demo: https://drive.google.com/file/d/1htLXvlKHdKHddtgVe76pNjfI_vGSd992/view?usp=sharing

Screenshots: https://drive.google.com/drive/folders/13q1WaCDnJC93Qlvz7pyU0HouEJ-BfL1z?usp=sharing

Database Schema: https://drive.google.com/file/d/1a6dJCds4_kTzbI1H6OTDAq4oUnltWsbI/view?usp=sharing

Features: 

    -User authentication (Google OAuth login)
    -Create, join, and delete projects
    -Create, edit, and delete tasks
    -Task status tracking (To Do and Completed)
    -Task due dates
    -Responsive UI

Technologies: 

    FrontEnd- React, CSS 
    Backend- Node.js + Express
    Database- MySQL

Architecture: 

    -Client communicates with REST API
    -Authentication handled using JWT
    -Backend manages business logic and database operations
    -Data persisted in MySQL

Usage: 

    -Login through Google
    -Create projects with a name
    -Create tasks with a title, description, and due date
    -Update tasks and their status as you progress

API Endpoints:
    
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

Challenges: 

    -Implementing secure authentication with JWT
    -Managing state across pages effectively
    -Building responsive CSS for all screen dimensions
    -Deploying both the Frontend and Backend

Author: Robbie Brush