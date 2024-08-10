from pymongo import *

client1 = MongoClient("mongodb+srv://harshpanchal0910:edmJPEiESrbswYYh@lspd.ffxzjfm.mongodb.net/?retryWrites=true&w=majority&appName=LSPD")
db1 = client1['LSPD']

collection = db1.create_collection("Most_Wanted")
collection2= db1.create_collection("Tip")
collection3 = db1.create_collection("Announcements")
collection4 = db1.create_collection("Job")  