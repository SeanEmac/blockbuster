import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier


def make_predictions(unlabeled, classifier):
  # drop the id and class
  unlabeled_ids = unlabeled['id']
  unlabeled = unlabeled.drop('id', axis=1)
  unlabeled = unlabeled.drop('class', axis=1)
  
  # use the classifier to make new predictions
  predictions = classifier.predict(unlabeled)

  # 1 confirmed fraud
  # 2 confirmed not fraud
  # 3 predicted fraud
  # 4 predicted not fraud
  convertedPreds = []
  for p in predictions:
    if p == "1":
      convertedPreds.append("3")
    else:
      convertedPreds.append("4")

  # Print the results to a new CSV
  results=pd.DataFrame(data={"id":unlabeled_ids,"class":convertedPreds})
  results.to_csv(path_or_buf="data/unlabeled_predictions.csv",index=False,sep=',')
  print('Predictions have been made agains unlabeled data')


def combine_results():
  classes = pd.read_csv('data/elliptic_txs_classes.csv', sep=',')
  labeled = classes[classes['class'] != 'unknown']
  labeled = labeled.rename(columns={"txId": "id"})

  unlabeled = pd.read_csv('data/unlabeled_predictions.csv', sep=',')

  combined = pd.DataFrame(data={"id":labeled['id'],"class":labeled['class']})
  combined = combined.append(unlabeled, ignore_index = True)

  combined.to_csv(path_or_buf="data/combined_predictions.csv",index=False,sep=',')
  print('Predictions and known transactions have been combined')


def classify_unknown():
  # Read in the class csv and visualise it
  classes = pd.read_csv('data/elliptic_txs_classes.csv', sep=',')

  # Read in the features and give the columns names
  features = pd.read_csv('data/elliptic_txs_features.csv', sep=',', header=None)
  features.columns = ['id', 'time step'] + [f'tran_feature_{i}' for i in range(93)] + [f'agg_feature_{i}' for i in range(72)]
  """
    Column 0 is the anonymised ID
    Column 1 is the time step in 2 week batches
    Column 2 -> 95 are features of the transaction itself such as in/out degree, amount, fee
    column 96 -> 166 are aggregated features about transactions one hop before / after the transaction. 
  """

  """
    Due to intellectual property issues, we cannot provide an exact description
    of all the features in the dataset.
  """

  """
    The first 94 features represent local information about the transaction – including the time step,
    number of inputs/outputs, transaction fee, output volume and aggregated figures such as
    average BTC received (spent) by the inputs/outputs and average number of incoming (outgoing)
    transactions associated with the inputs/outputs
  """

  """
    The remaining 72 features are aggregated features, obtained using transaction information
    one-hop backward/forward from the center node - giving the maximum, minimum, standard deviation
    and correlation coefficients of the neighbour transactions for the same information data
    (number of inputs/outputs, transaction fee, etc.).
  """

  # Merge the features and their class, join on id and txId
  features = pd.merge(features, classes, left_on='id', right_on='txId', how='left').drop('txId', axis=1)

  # separate the data that has labels
  labeled = features[features['class'] != 'unknown']

  labeled = labeled.drop('id', axis=1)
  X = labeled.drop('class', axis=1)
  y = labeled['class']

  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
  classifier = RandomForestClassifier(n_estimators=40, random_state=0)
  classifier.fit(X_train, y_train)
  y_pred = classifier.predict(X_test)

  print('Finsihed training on the labeled data')
  print('Accuracy: ')
  print(accuracy_score(y_test, y_pred))
  print('Confusion matrix: ')
  print(confusion_matrix(y_test,y_pred))
  print()

  # Now predict on the unlabeled data
  unlabeled = features[features['class'] == 'unknown']
  make_predictions(unlabeled, classifier)

  # We have the unlabeled and labeled data separated and predicted
  # Now we can join them back togehter.
  combine_results()


def plot_counts(df, labels, colors, title, y_lab):
  plt.bar(labels, df['class'].value_counts(), align='center', color=colors)
  plt.title(title)
  plt.ylabel(y_lab)
  plt.show()


def visualise():
  classes = pd.read_csv('data/elliptic_txs_classes.csv', sep=',')
  plot_counts(classes, ('Unknown', 'Licit', 'Illicit'), ('cgr'),
    'Original Elliptic class counts', 'Count')

  combined_classes = pd.read_csv('data/combined_predictions.csv', sep=',')
  counts = combined_classes['class'].value_counts()

  fig, ax = plt.subplots()
  labels = ('Licit', 'Illicit')
  known = [counts[2], counts[1]]
  predicted = [counts[4], counts[3]]
  ax.bar(labels, known, label='Known', color=['green', 'red'])
  ax.bar(labels, predicted, bottom=known, label='Predicted', color=['lightgreen', 'coral'])
  
  ax.set_ylabel('Count')
  ax.set_title('Combined counts')
  ax.legend(('Confirmed Licit', 'Predicted Licit'))

  plt.show()

if __name__ == "__main__":
  classify_unknown()
  visualise()