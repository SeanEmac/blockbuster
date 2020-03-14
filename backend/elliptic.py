import pandas as pd
import numpy as np

from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

classes = pd.read_csv('data/elliptic_txs_classes.csv', sep=',')
features = pd.read_csv('data/elliptic_txs_features.csv', sep=',', header=None)

classes = classes.drop(columns=['txId'])
features.insert(167, 167, classes['class'])

dataset = features.drop(features.columns[0], axis=1)

X = dataset.iloc[:, 0:166].values
y = dataset.iloc[:, 166].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

from sklearn.ensemble import RandomForestClassifier

classifier = RandomForestClassifier(n_estimators=40, random_state=0)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)

print(confusion_matrix(y_test,y_pred))
print(classification_report(y_test,y_pred))
print(accuracy_score(y_test, y_pred))
