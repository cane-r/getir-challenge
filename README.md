To run this application,just set MONGO_URL env variable and execute run.sh in your machine(**assuming you have git,npm etc installed**)<br /><br /> 
If you are a windows user,still you can adapt run.sh file to a .bat file.Nevertheless on windows,you can run by executing git and npm commands<br /><br /> 
Developed on Intel(R) Core(TM) i7-10750H CPU @ 2.60GHz 16GiB Ubuntu 20.04.1 machine<br /><br /> 
Deployed to aws ec2 instance here http://3.70.14.188:8081/records/v1 . You can GET/POST to this url<br /><br /> 
To run tests,just execute **npm run test** or **npm test**<br /><br /> 
This app has two env modes,dev and prod.You can run as dev/prod as **npm run dev/prod** and view dev/prod dependencies in **package.json** file ,as specified in run.sh file<br /><br /> 
