from flask import Flask, request, jsonify, json
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
import requests
import config

app = Flask(__name__)
cors = CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/yelp-db"
app.config['JWT_SECRET_KEY'] = 'secret'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

current_user = None

@app.route('/')
def main_page():
    return 'Welcome to Yelp!'

@app.route('/sign-in', methods = ['POST'])
def sign_in():
    users = mongo.db.users
    user = request.json['username']
    password = request.get_json()['password']
    
    username = users.find_one({"username": user})
    print(username['_id'])
    all_users = users.find()
    if username == None:
        # print('true')
        return 'make account' #account doesn't exist
    else:
        # return the db user id as well 
        if bcrypt.check_password_hash(username['password'], password):
            access_token = create_access_token(identity = {
                'user_id': str(username['_id']),
                'firstname': username['name']['firstname'],
                'lastname': username['name']['lastname'],
                'email': username['email']
            })
            return jsonify({'user_id': str(username['_id']),'access_token': access_token})
        else:
            return "try again"

@app.route('/register', methods = ['POST'])
def register():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    birthday = request.json['birthday']
    hometown = request.json['hometown']
    username = request.json['username']
    password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')

    users = mongo.db.users
    
    temp = users.find_one({'email': email})
    print(temp)

    if temp != None:
        # print('suh')
        return 'already registered'
    elif temp == None: 
        # print('yay')
        
        get_id = users.insert({
            "name": {"firstname": first_name, "lastname": last_name}, 
            "email": email, 
            "birthday": birthday, 
            "hometown": hometown, 
            "username": username, 
            "password": password
            })
        # print(get_id)
        access_token = create_access_token(identity = {
                'user_id': get_id,
                'firstname': first_name,
                'lastname': last_name,
                'email': email
            })

        global current_user
        current_user = get_id
        return jsonify({'user_id': get_id,'access_token': access_token}) #go to home page with hello user

@app.route('/profile/:id', methods = ['GET'])
def profile():
    user = request.args.get('username')
    # print(username)
    print('hi ' + str(user))
    print(current_user)
    restaurants = mongo.db.user_restaurants
    user_favs = restaurants.find({"user_id": str(current_user)})
    ret = []
    #test
    for restaurant in user_favs:
        print(restaurant)
        ret.append(
            {
                'res_id': restaurant['res_id'],
                'res_name': restaurant['res_name'],
                'res_address': restaurant['res_address'],
                'res_phone': restaurant['res_phone'],
                'res_coordinates': restaurant['res_coordinates']
            })
    return jsonify(restaurants = ret)

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

        url = "https://api.yelp.com/v3/businesses/search?term=" + str(restaurant) + "&location=" + str(location) + "&radius=" + str(radius) + "&categories=" + str(categories) + "&sort_by=" + str(sort_by) + "&price=" + str(price) + "&open_now=" + str(open_now)

        headers = {'Authorization': 'Bearer ' + config.api_key}
        response = requests.request("GET", url, headers=headers)

        return json.loads(response.text)

@app.route('/favorites', methods = ['POST'])
def favorites():
    if request.method == 'POST':
        favorite = request.json['favorite']
        # print(favorite)
        #add current user_id
        restaurants = mongo.db.user_restaurants
        restaurants.insert({
            'user_id': current_user,
            'res_id': favorite['res_id'],
            'res_name': favorite['res_name'],
            'res_address': favorite['res_address'],
            'res_phone': favorite['res_phone'],
            'res_coordinates': favorite['res_coordinates']
        })
        res = restaurants.find()

    return 'favorited'

@app.route('/explore', methods = ['GET'])
def explore():
    ret = []
    users = mongo.db.users
    all_users = users.find()
    for user in all_users:
        ret.append({
            'user_id': str(user['_id']),
            'firstname': user['name']['firstname'],
            'lastname': user['name']['lastname'],
            'username': user['username']
        })
    print(ret)
    return jsonify(users = ret)

@app.route('/sign-out', methods = ['POST'])
def logout():
    empty_token = request.json['token']
    global current_user
    current_user = empty_token
    return 'sign out'

@app.route('/set-user', methods = ['POST'])
def setUser():
    user = request.json['user']
    global current_user
    current_user = user
    print(current_user)
    return 'token saved'

if __name__ == "__main__": 
    app.run(port=5000)