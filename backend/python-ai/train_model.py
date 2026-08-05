import pandas as pd

from sklearn.ensemble import RandomForestClassifier

from sklearn.svm import SVC

from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score

import joblib

# LOAD DATASET

data = pd.read_csv("dataset.csv", sep="\t")
print(data["label"].value_counts())

# FEATURES

X = data[[
    "meanIntensity",
    "edgeDensity",
    "contrast",
    "homogeneity",
    "energy"
]]

# LABEL

y = data["label"]

# TRAIN TEST SPLIT

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# RANDOM FOREST MODEL

rfModel = RandomForestClassifier()

rfModel.fit(X_train, y_train)

# SVM MODEL

svmModel = SVC(probability=True)

svmModel.fit(X_train, y_train)

print("RF Classes:", rfModel.classes_)
print("SVM Classes:", svmModel.classes_)

# PREDICTIONS

rfPred = rfModel.predict(X_test)

svmPred = svmModel.predict(X_test)

# ACCURACY

rfAccuracy = accuracy_score(
    y_test,
    rfPred
)

svmAccuracy = accuracy_score(
    y_test,
    svmPred
)

print("Random Forest Accuracy:",
      rfAccuracy)

print("SVM Accuracy:",
      svmAccuracy)

# SAVE MODELS

joblib.dump(
    rfModel,
    "models/random_forest.pkl"
)

joblib.dump(
    svmModel,
    "models/svm_model.pkl"
)

print("Models saved successfully")