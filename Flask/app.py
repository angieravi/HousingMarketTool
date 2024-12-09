from flask import Flask, render_template, request, send_file, jsonify
import geopandas as gpd
import pandas as pd
import folium
import matplotlib.pyplot as plt
import io
import matplotlib
matplotlib.use('Agg')
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/api/data', methods=['GET'])
def get_data():
    # Return state names and categories as JSON
    return jsonify({
        "state_names": list(state_name_to_code.keys()),
        "categories": list(categories.keys())
    })

################################################################################################################
# county-level demographic maps with folium library #

# load in the data
us_data_df = pd.read_csv('US_DATA.csv', low_memory=False)
# load in the shapefile 
shapefile_path = 'tl_2023_us_county/tl_2023_us_county.shp'

gdf_counties = gpd.read_file(shapefile_path)

# # only keeping name, geoid, and geometry from the shapefile df
gdf_counties['GEOIDFQ'] = gdf_counties['GEOIDFQ'].astype(str)
us_data_df['GEO_ID'] = us_data_df['GEO_ID'].astype(str)

# columns grouped by category, only keeping the relevant categories
categories = {
    "Housing Occupancy": [
        'DP1_0148P', 'DP1_0149P', 'DP1_0150P', 'DP1_0151P', 'DP1_0152P',
        'DP1_0153P', 'DP1_0154P', 'DP1_0155P'
    ],
    "Housing Tenure": ['DP1_0159P', 'DP1_0160P'],
    "Race": [
        'DP1_0078P', 'DP1_0079P', 'DP1_0080P', 'DP1_0081P',
        'DP1_0082P', 'DP1_0083P', 'DP1_0084P', 'DP1_0096P'
    ],
    "Age": [
        'DP1_0002P', 'DP1_0003P', 'DP1_0004P', 'DP1_0005P', 'DP1_0006P',
        'DP1_0007P', 'DP1_0008P', 'DP1_0009P', 'DP1_0010P', 'DP1_0011P',
        'DP1_0012P', 'DP1_0013P', 'DP1_0014P', 'DP1_0015P', 'DP1_0016P',
        'DP1_0017P', 'DP1_0018P', 'DP1_0019P', 'DP1_0020P', 'DP1_0021P',
        'DP1_0022P', 'DP1_0023P', 'DP1_0024P'
    ]
}

# simplify column names
descriptions = us_data_df.loc[0]

def simplify_column_name(column_name):
    description = descriptions.get(column_name, column_name)
    if 'Percent!!' in description:
        parts = description.split('!!')
        return f"Percent {parts[-1]}"
    return column_name


#### Get the colors for each county based one of the values
def get_occupancy_color(occupancy_percentage):
    try:
        if pd.isna(occupancy_percentage):
            return 'gray'  # default color for null values
        occupancy_percentage = float(occupancy_percentage)  
        if occupancy_percentage < 50:
            return 'red' 
        elif occupancy_percentage < 75:
            return 'yellow' 
        else:
            return 'green' 
    except ValueError:
        return 'gray'  
    
def get_age_color(age_percentage):
    try:
        if pd.isna(age_percentage):
            return 'gray'  
        age_percentage = float(age_percentage)  
        if age_percentage < 20:
            return 'green'  
        elif age_percentage < 25:
            return 'yellow' 
        else:
            return 'red' 
    except ValueError:
        return 'gray'  

def get_race_color(race_percentage):
    try:
        if pd.isna(race_percentage):
            return 'gray'  
        race_percentage = float(race_percentage)
        if race_percentage > 85:
            return 'red'  
        elif race_percentage > 65:
            return 'yellow'
        else:
            return 'green'  
    except ValueError:
        return 'gray'  

def get_tenure_color(tenure_percentage):
    try:
        if pd.isna(tenure_percentage):
            return 'gray'  
        tenure_percentage = float(tenure_percentage)
        if tenure_percentage < 50:
            return 'red'  
        elif tenure_percentage < 75:
            return 'yellow'  
        else:
            return 'green'  
    except ValueError:
        return 'gray'
    
def process_county_data(state_code):
    filtered_counties = gdf_counties[gdf_counties['STATEFP'] == state_code]
    if filtered_counties.empty:
        return None

    filtered_counties = filtered_counties[['NAME', 'GEOIDFQ', 'geometry']].rename(columns={'NAME': 'County'})

    merged_data = filtered_counties.merge(us_data_df, left_on='GEOIDFQ', right_on='GEO_ID', how='left')
    merged_data = merged_data.loc[:, ~merged_data.columns.duplicated()]  # removes any duplicated data

    # color columns applied to data
    merged_data['occupancy_color'] = merged_data['DP1_0148P'].apply(get_occupancy_color)
    merged_data['age_color'] = merged_data['DP1_0023P'].apply(get_age_color)
    merged_data['race_color'] = merged_data['DP1_0078P'].apply(get_race_color)
    merged_data['tenure_color'] = merged_data['DP1_0159P'].apply(get_tenure_color)

    return merged_data

# add a layer to the map for the selected category
def add_layer(data, category_name, color_column):
    columns = categories[category_name]
    layer = folium.FeatureGroup(name=category_name)
    tooltip = folium.GeoJsonTooltip(
        fields=["County"] + columns,
        aliases=["County:"] + [simplify_column_name(col) for col in columns],
    )
    folium.GeoJson(
        data=data,
        tooltip=tooltip,
        style_function=lambda feature: {
            'fillColor': feature['properties'][color_column],  
            'color': 'black',
            'weight': 0.5,
            'fillOpacity': 0.6,
        }
    ).add_to(layer)
    return layer

@app.route('/map', methods=['POST'])
def generate_map():
    data = request.get_json()
    state_name = data.get('state_name')
    category_name = data.get('category')

    if not state_name or not category_name:
        return "State name and category are required.", 400

    # convert state name to state code
    state_code = state_name_to_code.get(state_name)
    if not state_code:
        return f"Invalid state name: {state_name}", 400

    # process the data with the fcn above
    merged_data = process_county_data(state_code)
    if merged_data is None:
        return f"No data found for state {state_name}.", 404

    # colo mapping
    color_mapping = {
        "Housing Occupancy": "occupancy_color",
        "Age": "age_color",
        "Race": "race_color",
        "Housing Tenure": "tenure_color"
    }
    color_column = color_mapping.get(category_name)
    if not color_column:
        return f"Invalid category: {category_name}", 400

    # dynamically create map, centering on the the state
    center_coords = [
        merged_data.geometry.centroid.y.mean(),
        merged_data.geometry.centroid.x.mean(),
    ]
    m = folium.Map(location=center_coords, zoom_start=6)
    m.add_child(add_layer(merged_data, category_name, color_column))
    folium.LayerControl().add_to(m)

    # returns the map's HTML for rendering in the browser
    return m._repr_html_() 

################################################################################################################
state_name_to_code = { # mapping of state names to their codes
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56"
}

# map of state names to abbreviations
state_name_to_abbr = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
    "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
    "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
    "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
    "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
    "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
    "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
    "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM",
    "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
    "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA",
    "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
    "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
    "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
    "Wisconsin": "WI", "Wyoming": "WY"
}

################################################################################################################
# unemployment data line graph generation #
unemployment_df = pd.read_csv('Unemployment_cleaned.csv') 

### DO NOT GET RID OF THIS REMEMBER IT NEEDS TO BE HERE
states = sorted(
    unemployment_df['Area_Name']
    .str.split(', ')
    .str[-1]
    .map(lambda x: state_name_to_abbr.get(x, x))  # convert abbreviation to full name
    .unique()
)

def plot_unemployment_rate_vs_national(state, county):
    county_area_name = f"{county}, {state}"
    county_data = unemployment_df[unemployment_df['Area_Name'] == county_area_name]
    national_data = unemployment_df[unemployment_df['Area_Name'] == 'United States']

    if county_data.empty:
        raise ValueError(f"No data found for {county} in {state}.")
    if national_data.empty:
        raise ValueError("No data found for the United States.")

    # get the unemployment rate from the counties
    county_unemployment_rates = county_data.filter(like='Unemployment_rate_').iloc[0]
    years = [col.split('_')[-1] for col in county_unemployment_rates.index]

    # get national unemployment rate
    national_unemployment_rates = national_data.filter(like='Unemployment_rate_').iloc[0]

    plt.figure(figsize=(12, 6))

    # plot county unemployment rate
    plt.plot(
        years,
        county_unemployment_rates.values,
        marker='o',
        linestyle='-',
        color='teal',
        linewidth=2,
        markersize=8,
        label=f"{county}, {state}"
    )

    # plot national
    plt.plot(
        years,
        national_unemployment_rates.values,
        marker='o',
        linestyle='--',
        color='orange',
        linewidth=2,
        markersize=8,
        label="United States"
    )

    # plot format
    plt.title(f"Unemployment Rate Over Time: {county}, {state} vs. United States", fontsize=16, fontweight='bold', color='darkgreen')
    plt.xlabel("Year", fontsize=14)
    plt.ylabel("Unemployment Rate (%)", fontsize=14)
    plt.xticks(rotation=45, fontsize=12)
    plt.yticks(fontsize=12)
    plt.grid(color='lightgray', linestyle='--', linewidth=0.5)
    plt.legend(fontsize=12)
    plt.tight_layout()

    # acts like a file stored in memory!
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    return img

################################################################################################################
# zillow housing market typical home value #
data_with_national = pd.read_csv("data_with_national.csv") # combined this ina jupyter notebook, combined the national against it

# get the states
states = data_with_national["StateName"].dropna().unique()


def plot_housing_market_vs_national(state, county):
    # filter for the selected county's data
    county_data = data_with_national[
        (data_with_national["StateName"] == state) & 
        (data_with_national["RegionName"] == county)
    ]

    national_data = data_with_national[data_with_national["RegionName"] == "United States"]

    # if its missing throw this error
    if county_data.empty:
        raise ValueError(f"No data found for {county} in {state}.")
    if national_data.empty:
        raise ValueError("No data found for the United States.")

    # get the dates
    date_columns = [col for col in data_with_national.columns if '-' in col and col[:4].isdigit()]

    # get the time series data for county
    county_time_series = county_data[date_columns].T
    county_time_series.columns = ["Value"]
    county_time_series.index = pd.to_datetime(date_columns)
    county_time_series.index.name = "Date"

    # get time series national
    national_time_series = national_data[date_columns].T
    national_time_series.columns = ["National Average"]
    national_time_series.index = pd.to_datetime(date_columns)
    national_time_series.index.name = "Date"

    plt.figure(figsize=(12, 6))
    
    # plot county data
    plt.plot(
        county_time_series.index, 
        county_time_series["Value"], 
        marker='o', 
        linestyle='-', 
        color='teal', 
        linewidth=2, 
        markersize=8, 
        label=f"{county}, {state}"
    )
    
    # plot national 
    plt.plot(
        national_time_series.index, 
        national_time_series["National Average"], 
        marker='o', 
        linestyle='--', 
        color='orange', 
        linewidth=2, 
        markersize=8, 
        label="United States"
    )

    # formatting
    plt.title(f"Typical Home Value Over Time: {county}, {state} vs. United States", fontsize=16, fontweight='bold', color='darkgreen')
    plt.xlabel("Year", fontsize=14)
    plt.ylabel("Housing Value ($)", fontsize=14)
    plt.xticks(rotation=45, fontsize=12)
    plt.yticks(fontsize=12)
    plt.grid(color='lightgray', linestyle='--', linewidth=0.5)
    plt.legend(fontsize=12)
    plt.tight_layout()

    # bytesIO
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    return img

################################################################################################################
# zellow renter typical value #

zori_combined = pd.read_csv("zori_combined.csv")
states = zori_combined["StateName"].dropna().unique()

def plot_renter_market_vs_national(state, county):
    county_data = zori_combined[
        (zori_combined["StateName"] == state) & 
        (zori_combined["RegionName"] == county)
    ]

    national_data = zori_combined[zori_combined["RegionName"] == "United States"]

    if county_data.empty:
        raise ValueError(f"No data found for {county} in {state}.")
    if national_data.empty:
        raise ValueError("No data found for the United States.")

    date_columns = [col for col in zori_combined.columns if '-' in col and col[:4].isdigit()]

    county_time_series = county_data[date_columns].T
    county_time_series.columns = ["Value"]
    county_time_series.index = pd.to_datetime(date_columns)
    county_time_series.index.name = "Date"

    national_time_series = national_data[date_columns].T
    national_time_series.columns = ["National Average"]
    national_time_series.index = pd.to_datetime(date_columns)
    national_time_series.index.name = "Date"

    plt.figure(figsize=(12, 6))
    plt.plot(
        county_time_series.index, county_time_series["Value"],
        marker='o', linestyle='-', color='teal', linewidth=2, markersize=8,
        label=f"{county}, {state}"
    )
    plt.plot(
        national_time_series.index, national_time_series["National Average"],
        marker='o', linestyle='--', color='orange', linewidth=2, markersize=8,
        label="United States"
    )
    plt.title(f"Renter Market Over Time: {county}, {state} vs. United States", fontsize=16)
    plt.xlabel("Date", fontsize=14)
    plt.ylabel("Rent Rate ($)", fontsize=14)
    plt.xticks(rotation=45, fontsize=12)
    plt.yticks(fontsize=12)
    plt.grid(color='lightgray', linestyle='--', linewidth=0.5)
    plt.legend(fontsize=12)
    plt.tight_layout()

    # Save plot to BytesIO
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    return img

################################################################################################################
# all the api routes to call #

# THIS IS TO FIX THE DROPDOWNS DO NOT GET RID OF
abbr_to_state_name = {abbr: name for name, abbr in state_name_to_abbr.items()}

@app.route('/api/renter_market_graph', methods=['POST'])
def renter_market_graph():
    state = request.json.get('state')
    county = request.json.get('county')

    if not state or not county:
        return "State and County are required.", 400

    try:
        img = plot_renter_market_vs_national(state, county)
        return send_file(img, mimetype='image/png')
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@app.route('/api/housing_market_graph', methods=['POST'])
def housing_market_graph():
    state = request.json.get('state')
    county = request.json.get('county')
    img = plot_housing_market_vs_national(state, county)
    return send_file(img, mimetype='image/png')


@app.route('/api/housing_data', methods=['GET'])
def get_housing_states():
    # Extract unique state abbreviations
    state_abbreviations = zori_combined["StateName"].dropna().unique()

    # Convert abbreviations to full names
    state_data = [
        {"abbr": abbr, "full_name": abbr_to_state_name.get(abbr, abbr)}
        for abbr in state_abbreviations
    ]

    return jsonify({"states": state_data})


@app.route('/api/renter_data', methods=['GET'])
def get_renter_states():
    state_abbreviations = zori_combined["StateName"].dropna().unique()

    state_data = [
        {"abbr": abbr, "full_name": abbr_to_state_name.get(abbr, abbr)}
        for abbr in state_abbreviations
    ]

    return jsonify({"states": state_data})


@app.route('/api/line_graph', methods=['POST'])
def line_graph():
    data = request.get_json()
    if not data:
        return "NOT WORKING.", 400

    state = data.get('state')
    county = data.get('county')

    if not state or not county:
        return "State and County must be provided.", 400

    state_abbreviation = state_name_to_abbr.get(state)
    if not state_abbreviation:
        return f"State '{state}' is not recognized.", 400

    try:
        # graph img
        img = plot_unemployment_rate_vs_national(state_abbreviation, county)
        return send_file(img, mimetype='image/png')
    except ValueError as e:
        return str(e), 404



# this is just to test, not required for site 
@app.route('/')
def home():
    state_fps = sorted(gdf_counties['STATEFP'].unique())
    states = sorted(
        unemployment_df['Area_Name']
        .str.split(', ')   
        .str[-1]               
        .unique()            
    )

    print("States FOR DROPDOWN:", states)

    return render_template(
        'home.html',
        state_fps=state_fps,
        states=states,       
        categories=categories.keys()  #shared categories
    )


################################################################### RUN
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')