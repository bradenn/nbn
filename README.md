int main()
{

        int day;
        cout << "Which day of the week is this (1 through 7)?" << endl;
        cin >> day;

        switch(day){
          case 2:
            cout << "The workweek is just beginning. Hang in there!\n";
            break;
          case 3:
            cout << "The workweek is just beginning. Hang in there!\n";
            break;
          case 4:
            cout << "Midweek. The worst is over.\n";
            break;
          case 5:
            cout << "Midweek. The worst is over.\n";
            break;
          case 6:
            cout << "Friday and Weekend! Nice.\n";
            break;
          case 7:
            cout << "Friday and Weekend! Nice.\n";
            break;  
          case 1:
            cout << "Friday and Weekend! Nice.\n";
            break;
          default:
            cout << "That's not a valid number!" << endl;
            break;
        }

        if(day==2 && day==3){ //Monday, Tuesday
                cout << "The workweek is just beginning. Hang in there!\n";
        }else{
                if(day==4 && day==5){ //Wednesday, Thursday
                        cout << "Midweek. The worst is over.\n";
                }else{
                        if(day==6 && day==7 && day==1){ //Friday, Saturday, Sunday
                                cout << "Friday and Weekend! Nice.\n";
                        } else{
                                cout << "That's not a valid number!" << endl;
                        }
                        return 0;
                }
        }

}
