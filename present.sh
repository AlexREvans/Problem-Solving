#!/bin/bash
cd src
chromium-browser "http://localhost:8000/presentation" &
python -m SimpleHTTPServer

