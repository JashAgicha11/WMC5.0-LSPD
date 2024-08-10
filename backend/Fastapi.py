import os
from dotenv import load_dotenv, dotenv_values
from pymongo import *
from fastapi import *
from fastapi import Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.responses import RedirectResponse
from starlette.middleware.base import BaseHTTPMiddleware
from typing import *
from schema import *
# import subprocess
import jwt
from bson import ObjectId
# from jwt import PyJWT
from datetime import *
import shutil
from typing import Optional
from passlib.context import CryptContext
import face_recognition
import cv2
import numpy as np
app = FastAPI()
current_dir = os.path.dirname(os.path.realpath(__file__))
images_dir = os.path.join(current_dir, "images")
app.mount("/images", StaticFiles(directory=images_dir), name="images")
load_dotenv()
origins = [
    "http://localhost:3000",
    "http://localhost:3000/login",
    "https://your-frontend-site.onrender.com",
    "https://lspd-project-git-main-gangster0910s-projects.vercel.app",
    "https://lspd-project.vercel.app",
    "http://localhost:3000/signup",
    "http://localhost:3000/home",
    "http://localhost:5173",
    ]    
    
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

link = os.getenv("DataBase_Link")
client1 = MongoClient(link)
db1 = client1['LSPD']
Secret_key = os.getenv("SECRET_KEY")
algorithm = os.getenv("Alogrithm")
access_token_expire_time = int(os.getenv("Access_Token_Expire_Time"))
pwd_context = CryptContext(schemes=["bcrypt"], deprecated= "auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=access_token_expire_time)
    
    encoded_jwt = jwt.encode(to_encode, Secret_key, algorithm=algorithm)
    print(encoded_jwt)
    return encoded_jwt
def decode_Access_token(token: str):
        payload = jwt.decode(token, Secret_key, algorithms=[algorithm])    
        username: str = payload.get("username")
        role: str = payload.get("role")
        
        if username is None or role is None:
            raise HTTPException(status_code=401, detail="Invalid token data")
        
        token_data = {
            "username": username,
            "role": role
        }
        print(token_data)
        return token_data

def create_cookie(token:str):
    response = JSONResponse(content= "Thank You! Succesfully Completed ")
    response.set_cookie(key="session",value=token,httponly=True,secure=True, samesite='none',max_age=3600)
    return response


def face_Recog(img1_path: str, img2_path: str) -> bool:
    # Load the known and unknown images
    known_image = face_recognition.load_image_file(img1_path)
    known_face_encoding = face_recognition.face_encodings(known_image)[0]

    unknown_image = face_recognition.load_image_file(img2_path)
    face_locations = face_recognition.face_locations(unknown_image)
    face_encodings = face_recognition.face_encodings(unknown_image, face_locations)

    # Check if we found any faces in the unknown image
    if not face_encodings:
        return False

    # Compare each face encoding with the known face encoding
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces([known_face_encoding], face_encoding)
        if True in matches:
            return True

    return False

@app.post("/face/check")
async def check_face_match(img1: UploadFile = File(...), img2: UploadFile = File(...)) -> Dict[str, str]:
    file_location = f"temp_{img1.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(img1.file, buffer)

    file_location1 = f"temp_{img2.filename}"
    with open(file_location1, "wb") as buffer:
        shutil.copyfileobj(img2.file, buffer)
    
    match = face_Recog(file_location, file_location1)

    # Clean up temporary files
    os.remove(file_location)
    os.remove(file_location1)

    # Return the response based on face match result
    if match:
        return {"status": "Face matches"}
    else:
        return {"status": "Face does not match"}
    

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# @app.get("/packages")
# async def get_packages():
#     result = subprocess.run(["pip", "freeze"], capture_output=True, text=True)
#     return {"packages": result.stdout}
@app.post('/checkAuthentication')
async def check(request: Request):
    session = request.cookies.get('session')
    print(session)
    if session:
        return JSONResponse(status_code=200, content={"message": "Authenticated"})
    else:
        return JSONResponse(status_code=307, content={"message": "Cookie Not Found"})

@app.post('/check/admin')
async def check(request: Request):
    try:
        session = request.cookies.get('session')
        
        if session is None:
            return JSONResponse(status_code=status.HTTP_307_TEMPORARY_REDIRECT, content={"message": "Cookie Not Found"})
        print(session)
        payload = jwt.decode(session, Secret_key, algorithms=[algorithm])
        role : str = payload.get("role")
        print(role)
        if role == "admin":
            return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Authenticated"}) 
        else:
            return JSONResponse(status_code=status.HTTP_307_TEMPORARY_REDIRECT,content={"message": "Not an Admin!!"})   
    except HTTPException as e:
        return JSONResponse(status_code=e.status_code, content={"message": e.detail})
@app.post("/user")
async def create_user(user : User):
    try:
        user_dict = user.model_dump()
        user_dict["password"] = get_password_hash(user_dict["password"])
        db1.get_collection('User').insert_one(user_dict)
        return "Succesfully"
    except:
        raise HTTPException(400)
@app.post("/admin")
async def create_admin(name:str = Form(...),email:str = Form(...),password:str = Form(...), file: UploadFile = File(...)):
    try:
        file_location = os.path.join(images_dir, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        password = get_password_hash(password)   
        user_dict ={
            "name":name,
            "email":email,
            "password":password,
            "role":"admin",
            "img":file.filename
        }
        db1.get_collection('Admin').insert_one(user_dict)
        return "Succesfully"
    except:
        raise HTTPException(400)
@app.post("/users/login")
async def get_user(user: User_login):
    try:
        user1 = db1.get_collection('User').find_one({"email": user.email}, {"_id": 0})
        if user1:
            if not verify_password(user.password, user1.get("password", "")):
                raise HTTPException(status_code=401, detail="Incorrect Username or Password")
            expire_timedelta = timedelta(minutes=access_token_expire_time)
            user_token = create_access_token(user1, expire_timedelta)
            return create_cookie(user_token)

        user2 = db1.get_collection('Admin').find_one({"email": user.email}, {"_id": 0})
        if user2:
            if not verify_password(user.password, user2.get("password", "")):
                raise HTTPException(status_code=401, detail="Incorrect Username or Password")
            expire_timedelta = timedelta(minutes=access_token_expire_time)
            user_token = create_access_token(user2, expire_timedelta)
            return create_cookie(user_token)

        raise HTTPException(status_code=401, detail="Incorrect Username or Password")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
@app.post("/admin/login",response_model=List[admin])
async def get_admin(admin:User_login):
    try:
        user1 = db1.get_collection('Admin').find_one({"email":admin.email},{"_id":0})
    except:
        raise HTTPException(401, "Inncorect Username ot Password")
    if not verify_password(admin.password, user1["password"]):
        raise HTTPException(401, "Inncorrect Username or Password")
    expire_timedelta = timedelta(minutes=access_token_expire_time)
    user_token = create_access_token(user1,expire_timedelta)
    return create_cookie(user_token)  
   
@app.post("/list")
async def get_list(role:User_list):
    user_list = db1.get_collection('Admin').find({"role":role.role})
    return[admin(**i) for i in user_list ]

@app.post("/most_wanted_person")
async def add_most_Wanted_person(name : str= Form(...),
    description : str= Form(...),
    duration:str= Form(...),
    age:int= Form(...),
    dob: str= Form(...),
    city: str= Form(...),
    rank:int= Form(...),
    commited:str= Form(...),
    sex:str= Form(...),
    height:float= Form(...),file: UploadFile = File(...)):
    file_location = os.path.join(images_dir, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    most_wanted_per ={
        "img" : file.filename,
        "description":description,
        "name" : name,
        "duration":duration,
        "age":age,
        "dob": dob,
        "city": city,
        "rank":rank,
        "commited":commited,
        "sex":sex,
        "height":height    
    }
    result = db1.get_collection('Most_Wanted').insert_one(most_wanted_per)
    most_wanted_per['_id'] = str(result.inserted_id)
    return most_wanted_per

@app.get("/most_wanted_list")
async def get_most_Wanted_list():
    most_wanted_list = db1.get_collection('Most_Wanted').find()
    return [Most_Wanted(**i) for i in most_wanted_list]

@app.post("/tips")
async def add_tip(tip: Tip):
    tip_add = tip.model_dump()
    db1.get_collection('Tip').insert_one(tip_add)
    return tip

@app.get("/tips/list")
async def get_all_tips():
    tip = db1.get_collection('Tip').find()
    return [Tip(**i) for i in tip]

@app.post("/announcements")
async def add_announcement(title: str = Form(...),content: str = Form(...), by: str = Form(...),file: UploadFile = File(...)):
    file_location = os.path.join(images_dir, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    announce_add = {
        "title":title,
        "content" : content,
        "by":by,
        "img": file.filename
    }
    result = db1.get_collection('Announcements').insert_one(announce_add)
    announce_add['_id'] = str(result.inserted_id)
    return announce_add
 
@app.get("/announcements/list", response_model=List[Announcements])
async def get_announcements():
    announcements_cursor = db1.get_collection('Announcements').find()
    announcements = []
    for announce in announcements_cursor:
        announce["_id"] = str(announce["_id"])  # Convert ObjectId to string
        announcements.append(Announcements(**announce))
    return announcements

@app.post("/Jobs")
async def add_job(job : Job):
    job_add = job.model_dump()
    db1.get_collection('Job').insert_one(job_add)
    return job

@app.get("/Jobs/list")
async def get_job_listing():
    job = db1.get_collection('Job').find()
    return[Job(**i) for i in job] 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    