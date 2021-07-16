from flask import Flask, request, jsonify, json
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
import requests
import config
# import flask_login

app = Flask(__name__)
cors = CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/yelp-db"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
# db = mongo.db.yelp


current_user = ""

@app.route('/')
def main_page():
    return 'Welcome to Yelp!'

@app.route('/sign-in', methods = ['POST'])
def sign_in():
    users = mongo.db.users
    user = request.json['username']
    password = request.json['password']
    print(request.json['username'])
    print(request.json['password'])
    all_users = users.find()
    # for i in all_users:
    #     print(i["_id"])
    username = users.find_one({"username": user})
    credentials = users.find_one({"username": user, "password": password})
    # print(str(username))
    # print(credentials['username'])
    if username == None:
        # print('true')
        return 'make account' #account doesn't exist
    elif username and credentials == None:
        return 'False' #wrong password
    elif credentials['username'] == user and credentials['password'] == password:
        # print('true')
        global current_user 
        current_user = credentials['_id']
        print(current_user)
        return 'True' #account exists
    

@app.route('/register', methods = ['POST'])
def register():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    birthday = request.json['birthday']
    hometown = request.json['hometown']
    username = request.json['username']
    password = request.json['password']

    # print(request.json['first_name'])
    # print(request.json['last_name'])
    print(request.json['email'])
    # print(request.json['birthday'])
    # print(request.json['hometown'])
    # print(request.json['username'])
    # print(request.json['password'])
    users = mongo.db.users
    
    temp = users.find_one({'email': email})
    print(temp)

    if temp != None:
        print('suh')
        return 'already registered'
    elif temp == None: 
        print('yay')
        
        users.insert({
            "name": {"firstname": first_name, "lastname": last_name}, 
            "email": email, 
            "birthday": birthday, 
            "hometown": hometown, 
            "username": username, 
            "password": password
            })

        # get_user_id = users.find_one({
        #     "name": {"firstname": first_name, "lastname": last_name}, 
        #     "email": email, 
        #     "birthday": birthday, 
        #     "hometown": hometown, 
        #     "username": username, 
        #     "password": password
        #     })
        global current_user 
        current_user = temp['_id']
        print(current_user)
        return 'register' #go to home page with hello user

@app.route('/profile', methods = ['GET'])
def profile():
    # current_email = getUserIdFromEmail(flask_login.current_user.id)
    # db.find({"username": current_email})
    restaurants = mongo.db.user_restaurants
    user_favs = restaurants.find({"user_id": current_user})
    ret = []
    #test
    for restaurant in user_favs:
        # print(restaurant)
        ret.append(
            [
                restaurant['res_id'],
                restaurant['res_name'],
                restaurant['res_address'],
                restaurant['res_phone'],
                restaurant['res_coordinates']
            ])
    # print(jsonify(restaurants = ret))
    return jsonify(restaurants = ret)
    
    return 

@app.route('/restaurants', methods = ['POST'])
def restaurants():
    if request.method == 'POST':
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


@app.route('/favorites', methods = ['POST'])
def favorites():
    if request.method == 'POST':
        favorite = request.json['favorite']
        print(favorite)
        #add current user_id
        restaurants = mongo.db.user_restaurants
        restaurants.insert({
            'user_id': current_user,
            'res_id': favorite[0],
            'res_name': favorite[1],
            'res_address': favorite[2],
            'res_phone': favorite[3],
            'res_coordinates': favorite[4]
            })
        # print(restaurants)
        res = restaurants.find()
        for i in res:
            print(i)
        # print(restaurants.find())
    return 'favorited'

@app.route('/explore', methods = ['GET'])
def explore():
    users = mongo.db.users
    return 'explore'

@app.route('/logout', methods = ['POST'])
def logout():
    global current_user
    current_user = ""
    return 'logout'

if __name__ == "__main__": 
    app.run(port=5000)