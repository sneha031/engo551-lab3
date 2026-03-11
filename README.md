# ENGO 551 Lab 3

## Overview
This project is a web mapping application for visualizing building permits in Calgary. The users can select a start and end date, and the application uses Open Calgary Building Permints GeoJSON API to query out the results and display them on the interactive Leaflet map.

## Features of Site
- **Interactive Calgary Map:** Leaflet map of Calgary using OpenStreet map

- **Date Range Search:** filters out permits by start and end date inputs

- **Permit Markers:** permits are displayed as pink map markers

- **Marker Popups:** clicking a permit marker shows issueddate, workclassgroup, contractorname, communityname, and originaladdress

- **Marker Clustering:** dense results are clustered and a number shows to reduce clutter when zoomed out 

- **Overlapping Marker:** overlapping permits at the same location can spider out and the permits can be clicked on easily

- **Refresh on New Search:** searching a new date range clears old results and displays the new set


## Project Structure
- `application.py` — Flask backend 
- `index.html` — main page layout 
- `main.js` — Leaflet which shows: map, search, markers, popups, and clustering
- `styles.css` — styling for layout, background, markers, and cluster appearance

## Instructions for Running the Site
Follow the instructions below for running the application

### 1. Install depndencies
run this in the terminal:

pip install flask requests 


### 2. Set Open Calgary API (Keep this private and only display on yout terminal)
You must set these variables before running the web application: 

SODA_KEY_ID
SODA_KEY_SECRET

run this in the terminal (following previous step):
$env:SODA_KEY_ID="YOUR_KEY_ID"
$env:SODA_KEY_SECRET="YOUR_KEY_SECRET"

### 3. Run the flask application 
run this in the termial (following previous step):

python application.py

### 4. Open the site in your browser 
Go the the site:

http://127.0.0.1:5000/