
# Scheduler Application/Take Preference Surveys

This repository contains my project submission in **Microsoft Engage Mentorship 2021**.
This project is solely built during the period of mentorship conducted by Microsoft to 
provide mentorship enrich freshmen with various software development techniques. 

*It is an Application where Teachers can take Preference Surveys from students and allot
preferences to students based on their choice and factors like GPA. It can act as a 
scheduler for a teacher as it can create tables of students assigned to different choices.
This Application is equipped with a chat system as well for interaction of teachers and 
students*

Video Demo : https://www.youtube.com/watch?v=qTsqKGm4IJc

Live Demo : https://working-model-1.vercel.app/


## Problem Statement

Build a functional prototype of a platform that gives students an array of digital academic and social tools to stay engaged with their studies, peers and broader university community during pandemic.




## Basic Idea and Intuition

In COVID 19 pandemic , it has become cruicial for many people to work remotely
from their home. Mostly Schools, Colleges and Companies started operating their
works remotely. So, it becomes essential for them to stay connected and accomplish 
their tasks in the best possible manner remotely as well.

This application gives a platform for students and teachers to interact with each other 
through a Chat system. It also gives power to the teachers to take Preference Surveys
from their students and gives a potential option for students to take their own choice
if they deserve.

**Examples of Preference Surveys** that can be taken by the Teacher or Staff in Authority :

1. **Choose your Open Elective (Machine Learning/Cyber Security)** :

A Preference form named Open Elective can be formed by the teacher and distributed 
among all the students to fill in their choices whether they want to study Machine 
Leaning or Cyber Security as an open elective in their 8th semester. Students can 
fill in their choices and based on their own choice and their CGPA, they would be 
alloted their choice.

2. **Choose set of days You Wanna Visit to attend in person classes (Odd Working Days/Even Working Days)** : 

As COVID times are receding, schools and institutions are reopeing. The students are 
visiting their schools/instititions on 50% attendence criterion as suggested by the 
Govt. of India which means half of the students have to attend classes in-person on 
odd working days (Mon/Wed/Fri) and the other half on even working days
(Tue/Thu/Sat). 

It creates a dilemma among teachers whether to distribute students among 2 
houses randomly and make attendence sheets for odd working days or even working days, or
it would be better to form a survey and ask students themselves whether they wish to attend
classes in-person on odd-days or even-days based on their schedule.

Now after grabbing the preferences of the students, teacher can allot each student in one of the two set of days 
based on the student's preference and the CGPA of the student (in case of competition when 
number of students alloted in one of the houses becomes greater than max number of students 
to be alloted(50% of total strength) in each set of days).  

3. **Choose your House (Red House/Green House)**:

As in schools/institutions students are divided in two house for various kinds of activities.
In such a case, instead of randomly dividing the students in two houses, they can be given a 
choice. Teachers can create a new form named Choose Your House with options Red/Green.
Students can fill in their choices in the newly created form by the teacher and based 
on their own choice and their CGPA, they would be alloted their choice.
## Features of the Application

1. **Group Chat Features** :

* Teachers can create new Group Chats (For e.g Math Class). As the teacher is the creater of the chat, only he is able to delete this chat and add students in the chat.
* Students can create new Group Chats as well. (For e.g Doubt discussions) and can discuss among themselves. 

2. **Student's Desk** :

* Fill in their preference to the form created by the teacher.
* Select the form to be filled from a dropdown and submit preference.

3. **Teacher's Desk** :

* Create a new form.
* Select a form created in the past to see the responses of the students' preferences
* Get a graphical and visual representation of the choices made by the students and get insights into which choices are most preferred by the students.
* Allot each student to one of the choice based on the students' own choice and his/her CGPA to be the deciding factor.
* Create Tables of students (**Scheduling for teachers**) assigned to each preference. Make the work easier for the teacher. 


## Screenshots

Login Screen

![Login Screen]()

Sign Up Screen

![Sign Screen]()

Chat Screen UI 

![Chat Screen]()

Teacher's Desk

![Teacher's Desk]()

Student's Desk

![Student's Desk]()


## Installation

Clone App


```bash
  git clone https://github.com/spyder10/Microsoft-Engage-Project.git
  cd Microsoft-Engage-Project
  npm Install
```

Vercel setup for running serverless functions through vercel (inside folder ./api)

```bash
  npm i -g vercel
  vercel dev
```


    
## Technologies Used

Programming Languages : HTML5, CSS5, Javascript, Bootstrap

Framework : ReactJS

API : ChatEngine.io

Database : Firebase Firestore, Firebase Realtime Database

User Authentification : Firebase Auth, Yup

Version Control : GIT

## Agile Methodology

Agile Methodology was used for building this project. The following practices were adopted:


* Made Proper Planning
* Kept Product Backlog
* Maintained a SPRINT Burndown and a Product Burndown.
* Work was proceeded in a different branch using git version control and thereafter merged to ruling branch.

| Week | Task | 
|------|:----:|
| 1    | Designed the basic layout,code structure and vercel setup for serverless functions |   
| 2    | Chat Screen, Firebase setup for user Authentification and database   |    
| 3    | Teacher's and Student's Desk   |    
 

## Future Scope

* Multiple Preference options can be added.
* Can be extended to use in **JOSAA and NEET College Counselling** remotely where candidates are alloted colleges based on their preferences and their score in the competition test with a Chat System as well for doubt clarification and announcement of News by Counselling Authorities and students. 
