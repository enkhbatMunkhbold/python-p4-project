# Phase 4 Movie Tickets

## Description

**Movie Ticket** app helps users to buy the movie tickets of their chosen movie and selecting time and number of tickets. To do so a user should login or signup first and the tickets that bought will be saved in the logged user's profile. If user wants to buy more tickets, then he/she can click on **Home** button and when gets in Home page the user can buy ticket or tickets of a movie he/she wants to buy. 

## Table Of Contents 

- [Work Environment](#work-environment)

- [Home](#home)

- [Restaurants List](#restaurants-list)

- [Create a New Restaurant](#create-a-new-restaurant)

- [Demo](#demo)
  

## Work Environment  

The **Movie Ticket** app is built in React, which is a JavaScript library, at the front-end and Flask (Python) on the back-end. 
The client side of the application works using local url addresses:
- Home: - <http://localhost:3000/>  
- Restaurants List: - <http://localhost:3000/restaurants>
- Create New Restaurant: -<http://localhost:3000/restaurants/new>
- Selected Restaurant: -<http://localhost:3000/restaurants/:id> 

## Home 

When a user goes into **Restaurant Finder** app it opens up Home page of the app first. A user can see the search input field with button and the default restaurant card below the search field. When user inputs the word into the search field and clicks the **search** button, the list of the restaurants appears in the place, where the default placeholder card used to show up. User can go to details page in every individual restaurant by clicking **Learn more...** button or even *favorite* them.  

## Restaurants List  

In this page a user can see the whole list of the local restaurants, by scrolling the list up and down. If user wants to find out more details about a restaurant, then he/she can click on **Learn more...** button on the bottom left side of the each restaurant card, which takes a user into the details page of every individual restaurant card.

## Create a New Restaurant

If user wants to add a **New Restaurant** into the list, he/she can to to the Create New Restaurant page, by clicking on **Create** word on the top right side of the application. Then, user goes to the page, where he/she can fill out the form for all necessary information to create a restaurant card.  

## Demo  

Here is a GIF of the app to demonstrate how **Restaurant Finder** app works.

![project-demo](https://github.com/enkhbatMunkhbold/phase-2-project/assets/33409864/cc401550-b840-45e7-ada5-1d961d18ffe6)
