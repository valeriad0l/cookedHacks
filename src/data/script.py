import pandas as pd
import requests
import time

# Load dataset
df = pd.read_csv("STM_Montreal_Public_Places.csv")

# Google Maps Geocoding API Key (Replace with your own key)
API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json"

# Function to get latitude and longitude from address
def get_coordinates(address):
    params = {"address": address, "key": API_KEY}
    response = requests.get(GEOCODING_URL, params=params)
    data = response.json()
    
    if data["status"] == "OK":
        location = data["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]
    else:
        print(f"Error fetching coordinates for {address}: {data['status']}")
        return None, None

# Update latitude and longitude for each row
for index, row in df.iterrows():
    address = row["ADDRESSE"] + ", Montreal, Canada"
    lat, lon = get_coordinates(address)
    
    if lat is not None and lon is not None:
        df.at[index, "Latitude"] = lat
        df.at[index, "Longitude"] = lon
    
    # Pause to avoid exceeding API limits
    time.sleep(1)

# Save updated dataset
df.to_csv("STM_Montreal_Public_Places_Updated.csv", index=False)
print("Dataset updated successfully!")
