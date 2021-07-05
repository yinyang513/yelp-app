from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import requests
import config
import json
# import flask_login

app = Flask(__name__)
cors = CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/yelp-db"
mongo = PyMongo(app)
db = mongo.db.yelp

@app.route('/')
def main_page():
    return 'Welcome to Yelp!'

@app.route('/sign-in', methods = ['POST'])
def sign_in():
    user = request.json['username']
    password = request.json['password']
    print(request.json['username'])
    print(request.json['password'])
    credentials = db.find_one({"username": user, "password": password})
    print(credentials)
    if (credentials == None):
        # print('true')
        return 'make account' #go to home page with hello user
    elif credentials['username'] == user and credentials['password'] == password:
        # print('true')
        return 'True' #go to sorry try again
    else:
        return 'False'

@app.route('/register', methods = ['POST'])
def register():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    birthday = request.json['birthday']
    hometown = request.json['hometown']
    username = request.json['username']
    password = request.json['password']

    print(request.json['first_name'])
    print(request.json['last_name'])
    print(request.json['email'])
    print(request.json['birthday'])
    print(request.json['hometown'])
    print(request.json['username'])
    print(request.json['password'])

    temp = db.find_one({'email': email})
    print(temp)

    if temp == email:
        return 'already registered'
    else: 
        db.insert({"name": {"firstname": first_name, "lastname": last_name}, 
                    "email": email, "birthday": birthday, 
                    "hometown": hometown, "username": username, "password": password})
        return 'register' #go to home page with hello user

@app.route('/profile', methods = ['POST'])
def profile():
    # current_email = getUserIdFromEmail(flask_login.current_user.id)
    # db.find({"username": current_email})
    return 

@app.route('/restaurants', methods = ['POST'])
def restaurants():
    if request.method == 'POST':
        ret = []
        restaurant = request.json['restaurant']
        location = request.json['location']
        radius = request.json['radius']
        categories = request.json['categories']
        sort_by = request.json['sort_by']
        price = request.json['price']
        open_now = request.json['open_now']

        # print(request.json['sort_by'])
        # print(request.json['price'])
        # print(request.json['open_now'])

        url = "https://api.yelp.com/v3/businesses/search?term=" + str(restaurant) + "&location=" + str(location) + "&radius=" + str(radius) + "&categories=" + str(categories) + "&sort_by=" + str(sort_by) + "&price=" + str(price) + "&open_now=" + str(open_now)

        headers = {'Authorization': 'Bearer ' + config.api_key}
        response = requests.request("GET", url, headers=headers)

        # print(json.loads(response.text))

        # for restaurant in json.loads(response.text)["businesses"]:

        #     db.insert({'name': restaurant['name'], 'image': restaurant['image_url'], 
        #             'address': restaurant['location']['display_address'], 'phone': restaurant['display_phone'], 
        #             'location': restaurant['coordinates']})

        # restaurants = db.find()
        # print(restaurants)
            
            # ret.append((restaurant['name'],restaurant['image_url'],restaurant['location']['display_address'],restaurant['display_phone'],restaurant['coordinates']))

            # print(restaurant['name'])
            # print(restaurant['image_url'])
            # print(restaurant['location']['display_address'])
            # print(restaurant['display_phone'])
            # print(restaurant['coordinates'])
            # print()

        #return the name, address, phone number, maybe the image, maybe the map location

        return json.loads(response.text)
    # else:
    #     allRestaurants = db.find()
    #     ret = []
    #     for restaurant in allRestaurants: 
    #         ret.append(
    #             {
    #                 'name': restaurant['name']
    #                 # 'image': restaurant['image_url'], 
    #                 # 'address': restaurant['location']['display_address'], 
    #                 # 'phone': restaurant['display_phone'], 
    #                 # 'location': restaurant['coordinates']
    #             })
    #     return jsonify(tweets=ret)


@app.route('/favorites', methods = ['GET','POST'])
def favorites():
    if request.method == 'GET':
        favorite = request.form.get('favorite')
    return

if __name__ == "__main__": 
    app.run(port=5000, debug=True)