import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import joblib
import numpy as np

# Load data from Excel
df = pd.read_excel('your_dataset.xlsx')

# Separate features and target
X = df.iloc[:, :-1]  # All columns except the last one
y = df.iloc[:, -1]   # Last column (price)

# Identify categorical and numeric columns
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numeric_cols = X.select_dtypes(include=['number']).columns.tolist()

# Preprocessing for numeric data: Scaling
numeric_transformer = StandardScaler()

# Preprocessing for categorical data: One-hot encoding
categorical_transformer = OneHotEncoder(handle_unknown='ignore', sparse=False)

# Combine transformers into a preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])

# Create the pipeline with preprocessing and model training
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('model', xgb.XGBRegressor(objective='reg:squarederror', eval_metric='rmse'))
])

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
pipeline.fit(X_train, y_train)

# Save the trained model
joblib.dump(pipeline, 'xgboost_model.pkl')

# Load the model from file
loaded_pipeline = joblib.load('xgboost_model.pkl')

# Example input for prediction (replace with actual values)
example_input = np.array([[1.5, 2.3, 3.1, 4.7, 5.6, 6.2, 7.1, 8.4, 9.0, 10.2, 11.3, 12.1]])

# Make a prediction
prediction = loaded_pipeline.predict(example_input)
print(f'Prediction: {prediction}')

# Extract feature importances
model = loaded_pipeline.named_steps['model']
# Get feature names after one-hot encoding
feature_names = (numeric_cols + list(loaded_pipeline.named_steps['preprocessor'].transformers_[1][1].get_feature_names_out()))
for feature_name, importance in zip(feature_names, model.feature_importances_):
    print(f'Feature: {feature_name}, Importance: {importance}')
