nodemon start

int largestItem(Vector<string> vect){

  int largest = 0;

  for(int i = 0; i < vect.length(); i++){
    if(vect.at(i).size() > largest) largest = vect.at(i).size();
  }

  return largest;

}

cout << '| ' << food;
for(int i = 0; i < largestItem(vectorName); i++) cout << " ";
cout << '|/n' << endl;
