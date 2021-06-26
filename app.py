from flask import Flask, request
from flask_pymongo import PyMongo
import requests
import config
# import flask_login

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/yelp-db"
mongo = PyMongo(app)
db = mongo.db.yelp

@app.route('/')
def main_page():
    return 'Welcome to Yelp!'

@app.route('/sign-in', methods = ['GET'])
def sign_in():
    user = request.form.get('username')
    password = request.form.get('password')
    credentials = db.find({"username": user, "password": password})
    if ({"username": credentials["username"]} == user) and ({"password": credentials["password"]}):
        return 'true' #go to home page with hello user
    else:
        return 'false' #go to sorry try again

@app.route('/register', methods = ['GET'])
def register():
    first_name = request.form.get('first-name')
    last_name = request.form.get('last-name')
    email = request.form.get('email')
    birthday = request.form.get('birthday')
    hometown = request.form.get('hometown')
    username = request.form.get('username')
    password = request.form.get('password')
    db.insert({"name": {"firstname": first_name, "lastname": last_name}, 
                "email": email, "birthday": birthday, 
                "hometown": hometown, "username": username, "password": password})
    return #go to home page with hello user

@app.route('/profile', methods = ['POST'])
def profile():
    # current_email = getUserIdFromEmail(flask_login.current_user.id)
    # db.find({"username": current_email})
    return 

@app.route('/restaurants', methods = ['GET','POST'])
def restaurants():
    if request.method == 'GET':
        restaurant = request.form.get('cuisine')
        location = request.form.get('location')
        radius = request.form.get('radius')
        categories = request.form.get('categories')
        sort_by = request.form.get('sort-by')
        price = request.form.get('price')
        open_now = request.form.get('open-now')

        url = "https://api.yelp.com/v3/businesses/search?term=" + str(restaurant) + "&location=" + str(location) + "&radius=" + str(radius) + "&categories=" + str(categories) + "&sort_by=" + str(sort_by) + " &price=" + str(price) + "&open_now=" + str(open_now)

        headers = {
        'Authorization': 'Bearer ' + config.api_key
        }

        response = requests.request("GET", url, headers=headers)

        print(response.text)

        #return the name, address, phone number, maybe the image, maybe the map location

        return
    else:
        return

@app.route('/favorites', methods = ['GET','POST'])
def favorites():
    if request.method == 'GET':
        favorite = request.form.get('favorite')
    return

if __name__ == "__main__": 
    app.run(port=5000, debug=True)