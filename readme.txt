# project title

    * Stackoverflow developer survey results visualisation (MIN-VISH Project)


# names of all team members

    * Rafael Horvat

    * Simon Meyer


# source of data (URL)

    * https://www.kaggle.com/stackoverflow/so-survey-2017/data


# source of code (URL), if Java/JavaScript libraries, D3 examples, ... are used

    * Github repo: https://github.com/iPurpl3x/vish-project

    * JavaScript libraries (installed using npm : http://npmjs.com/) :
        d3 (v4.12.0),
        d3-geo (v1.9.0),
        es6-event-emitter (v1.10.2),
        material-ui (v0.19.4),
        moment (v2.19.4),
        prop-types (v15.6.0),
        react (v16.2.0),
        react-dom (v16.2.0),
        react-scripts (v1.0.17),
        topojson-client (v3.0.0)

    * D3 examples :
        https://bl.ocks.org/caravinden/eb0e5a2b38c8815919290fa838c6b63b
        https://bl.ocks.org/ayala-usma/d2f3b89c84e4ed66e22d02affcdcab73
        https://bl.ocks.org/mbostock/5479367295dfe8f21002fc71d6500392
        https://bl.ocks.org/mbostock/4063269

    * React examples:
        https://medium.com/@zimrick/how-to-create-pure-react-svg-maps-with-topojson-and-d3-geo-e4a6b6848a98


# brief description of usage: file to be opened in browser or console, user interaction

    * Run a python web server in root directory (python3 -m http.server 8080)

    * Click on a bubble on the world map to load the data for the selected country

    * Click on the (X) next to the selected country to get the global data

    * Click the compare button to get a second instance to compare two different countries

    * Hover over the charts/bars/bubbles to get detailed information

    * Use the Up/Down-Arrows to change the position of the attribute containers

    * Click on the speech bubble to see the questions from the survey for each attribute


# brief list of implemented visualization techniques

    * world map

    * bar chart

    * stacked bar chart

    * clock combined with color gradient

    * bubble chart

    * hover

    * flexible attribute containers

    * comparison
