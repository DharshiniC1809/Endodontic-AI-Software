import pandas as pd
import random

data = []

# HIGH SUCCESS

for i in range(70):

    data.append({

        "meanIntensity":
            round(random.uniform(175, 185), 2),

        "edgeDensity":
            round(random.uniform(0.08, 0.12), 2),

        "contrast":
            round(random.uniform(2.5, 4.0), 2),

        "homogeneity":
            round(random.uniform(0.78, 0.86), 2),

        "energy":
            round(random.uniform(0.14, 0.18), 2),

        "label":
            "HIGH"
    })

# MODERATE SUCCESS

for i in range(70):

    data.append({

        "meanIntensity":
            round(random.uniform(160, 172), 2),

        "edgeDensity":
            round(random.uniform(0.15, 0.22), 2),

        "contrast":
            round(random.uniform(4.5, 6.8), 2),

        "homogeneity":
            round(random.uniform(0.65, 0.75), 2),

        "energy":
            round(random.uniform(0.09, 0.13), 2),

        "label":
            "MODERATE"
    })

# LOW SUCCESS

for i in range(70):

    data.append({

        "meanIntensity":
            round(random.uniform(140, 152), 2),

        "edgeDensity":
            round(random.uniform(0.26, 0.34), 2),

        "contrast":
            round(random.uniform(8.5, 11.5), 2),

        "homogeneity":
            round(random.uniform(0.45, 0.58), 2),

        "energy":
            round(random.uniform(0.03, 0.08), 2),

        "label":
            "LOW"
    })

# CREATE DATAFRAME

df = pd.DataFrame(data)

# SHUFFLE DATA

df = df.sample(frac=1).reset_index(drop=True)

# SAVE CSV

df.to_csv(
    "dataset.csv",
    index=False
)

print("dataset.csv generated successfully")