#!/bin/bash
#Runs the server on localhost:5000 
export FLASK_APP=app.py
export FLASK_DEBUG=1
flask run #--host=0.0.0.0 #uncomment this parameter to run the server on the local network
